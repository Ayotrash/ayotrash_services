const bcrypt     = require('bcrypt')
const sgMail     = require('@sendgrid/mail')
const jwt        = require('jsonwebtoken')
const mongoose   = require('mongoose')
const shortid    = require('shortid')

const {
  Users
} = require('./models')

sgMail.setApiKey(process.env.sendgridAPIKey)

const { 
  success_OK, 
  success_created,
  success_accepted,
  server_error_not_implemented, 
  client_error_not_allowed, 
  client_error_not_found ,
  client_error_not_acceptable,
  client_error_bad_request
} = require('../../helpers/responsers')

exports.registerUser = async body => {
  const UsersModel = await mongoose.model('users', Users)

  const REGISTER_USER = payload => {
    let promise = new Promise(function(resolve, reject) {
      const checkValidation = () => {
        switch (true) {
          case !payload.firstname:
            reject(client_error_not_allowed('First Name is required.'))
            break;
          case !payload.lastname:
            reject(client_error_not_allowed('Last Name is required.'))
            break;
          case !payload.email:
            reject(client_error_not_allowed('Email or Username is required.'))
            break;
          case !payload.password:
            reject(client_error_not_allowed('Password is required.'))
            break;
          case !payload.phonenumber:
            reject(client_error_not_allowed('Phone Number is required.'))
            break;
          case !payload.places:
            reject(client_error_not_allowed("User's Address is required."))
            break;
          case !payload.device_info:
            reject(client_error_not_allowed('Device Info is required.'))
            break;
          default:
            async function checkAccount() {
              let isEmailExist = await UsersModel.findOne({ "email": payload.email })
              let isPhonenumberExist = await UsersModel.findOne({ "phonenumber": payload.phonenumber })

              if(isEmailExist) {
                return reject(server_error_not_implemented("Your account already exist in the app, please try to login."))
              } else if(isPhonenumberExist) {
                return reject(server_error_not_implemented("Your account already exist in the app, please try to login."))
              } else {
                resolve(payload)
              }
            }

            checkAccount()
            break;
        }
      }
      return checkValidation()
    })

    return promise
  }

  const insertDatatoDB = async payload => {
    let hashingPassword = await bcrypt.hashSync(payload.password, 10)

    const newUser = new UsersModel({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      phonenumber: payload.phonenumber,
      password: hashingPassword,
      referral_code: shortid.generate(),
      device_info: payload.device_info,
      places: payload.places,
      uuid: "12345"
    })

    const sendVerificationEmail = async () => {
      console.log('✓ Sending email to: ', payload.email)
      console.log(process.env.secret_key)

      const privateKey = process.env.secretKey
      const senderEmail = process.env.senderEmail

      let jwtToken = await jwt.sign(
        { email: payload.email },
        privateKey,
        { expiresIn: "1d" }
      )

      const msg = await {
        to: payload.email,
        from:  `"Welcome to Ayotrash" <${senderEmail}>`,
        subject: 'Ayotrash Email Verification',
        text: 'Confirmation your Ayotrash email.',
        html: `<a href="https://us-central1-ayotrash.cloudfunctions.net/ayotrashAPI/v1/confirmation_email/${jwtToken}">Confirmation Your Email</a>`,
      }

      sgMail.send(msg)
    }

    let userId = newUser.save().then(response => {
      return response.id
    })
    .catch(err => console.log(err))

    sendVerificationEmail()
    return userId
  }

  return REGISTER_USER(body)
    .then(async response => {
      let insertedData = await insertDatatoDB(response)
      return insertedData
    })
    .then(response => {
      return success_created('User created successfully.', { id: response })
    })
    .catch(error => {
      return error
    })
}