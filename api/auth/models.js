const mongoose = require('mongoose')

exports.Users = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  password: { type: String, required: true },
  photo_URL: { type: String, default: null },
  bod: { type: Date, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Not set'], default: 'Not set' },
  places: [
    mongoose.Schema.Types.Mixed
  ],
  credit_cards: [
    mongoose.Schema.Types.Mixed
  ],
  settings: {
    language:  { type: String, default: 'id' },
    is_email_notification: { type: Boolean, default: true },
    is_push_notification:  { type: Boolean, default: true }
  },
  role:  { type: String, enum: ['Superadmin', 'Supervisor', 'Regular User', 'Dustman'], required: true },
  points: { type: Number, default: 20 },
  referral_code: { type: String, required: true },
  is_verified_email: { type: Boolean, default: false },
  is_verified_phonenumber: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  uuid: mongoose.Schema.Types.Mixed
})

exports.Auth = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  device_info: {
    device_id: { type: String },
    info: mongoose.Schema.Types.Mixed
  },
  login_ip_location: { type: String },
  is_loggedin: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})