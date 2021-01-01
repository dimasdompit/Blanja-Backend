require('dotenv').config()
const nodemailer = require('nodemailer')
const mustache = require('mustache')
const fs = require('fs')

module.exports = {
  sendEmail: (type, data) => {
    const templateEmail = fs.readFileSync('./src/helpers/template.html', {
      encoding: 'utf-8'
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
      }
    })

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: data.email,
      subject: type,
      html: mustache.render(templateEmail, data)
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error)
      console.log(`OTP Code has been sent to ${info.accepted[0]}`)
    })
  }
}
