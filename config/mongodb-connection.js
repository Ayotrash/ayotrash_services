const mongoose = require('mongoose')

function mongoConnection(env) {
  if (env == 'development') {
    mongoose.connect(process.env.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('MongoDB Development was connected.')
  } else {
    console.log('No production available yet!')
  }
}

module.exports = mongoConnection