const { response } = require('../helpers/response')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const {
  RegisterValidation,
  LoginValidation,
  VerifyValidation,
  forgotPassVal,
  changePassVal
} = require('../helpers/validation')
const {
  registerModel,
  loginModel,
  updateUser,
  deleteOTP,
  checkOTP,
  insertOTP
} = require('../models/auth')
const { sendEmail } = require('../helpers/sendEmail')
const { createToken } = require('../helpers/createToken')
const jwt = require('jsonwebtoken')
// const encryptor = require('simple-encryptor')(`${process.env.ENCRYPT_KEY}`)

module.exports = {
  Register: async (req, res) => {
    try {
      const data = req.body
      const validation = RegisterValidation(data)

      if (validation.error === undefined) {
        // data.store = req.body.store || "";
        // data.telp = req.body.telp || "";
        data.password = hashSync(req.body.password, genSaltSync(1))
        const checkEmail = await loginModel(data.email)
        if (checkEmail.length === 0) {
          const result = await registerModel(data)
          delete result.password
          return response(res, true, 'Register Success', result, 201)
        }
        return response(res, false, 'Email has been registered!', [], 400)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  Login: async (req, res) => {
    try {
      const data = req.body
      const validation = await LoginValidation(data)

      if (validation.error === undefined) {
        const emailCheck = await loginModel(data.email)
        if (emailCheck.length !== 0) {
          if (compareSync(data.password, emailCheck[0].password)) {
            delete emailCheck[0].password
            const token = createToken(emailCheck, process.env.TOKEN_KEY, '24h')
            const refreshToken = createToken(
              emailCheck,
              process.env.REFRESHTOKEN_KEY,
              '48h'
            )
            emailCheck[0].token = token
            emailCheck[0].refreshToken = refreshToken
            return response(res, true, 'Login Success', emailCheck[0], 200)
          }
          return response(res, false, 'Password Wrong', [], 400)
        }
        return response(res, false, 'Email is not registered!', [], 400)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  RefreshToken: async (req, res) => {
    const refreshToken =
      req.body.refreshToken ||
      req.query.refreshToken ||
      req.headers['refresh-token']
    try {
      if (refreshToken) {
        const payload = jwt.verify(refreshToken, process.env.REFRESHTOKEN_KEY, {
          expiresIn: '48h'
        })
        console.log(payload)
        const token = createToken(payload.result, process.env.TOKEN_KEY, '24h')
        const RefreshToken = createToken(
          payload.result,
          process.env.REFRESHTOKEN_KEY,
          '48h'
        )
        const data = {
          token: token,
          refreshToken: RefreshToken
        }
        return response(res, true, 'Refresh Token Success', data, 200)
      }
      return response(res, false, 'Token not found', [], 400)
    } catch (error) {
      console.log(error)
      if (error.message === 'invalid signature') {
        return response(res, false, `${error.message}`, [], 400)
      }
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  Verification: async (req, res) => {
    try {
      const data = req.body
      const validation = VerifyValidation(data)

      if (validation.error === undefined) {
        const codeCheck = await checkOTP(data.email)
        const emailCheck = await loginModel(data.email)
        if (emailCheck.length !== 0) {
          if (codeCheck.length !== 0) {
            if (
              data.code === codeCheck[0].code &&
              data.email === codeCheck[0].email
            ) {
              await deleteOTP(data.email)
              return response(res, true, 'Verification Success', [], 200)
            }
            return response(res, false, 'Code is wrong', [], 400)
          }
          return response(res, false, 'Email is not Registered!', [], 400)
        }
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  ForgotPassword: async (req, res) => {
    try {
      const data = req.body
      const validation = forgotPassVal(data)
      if (validation.error === undefined) {
        const getUser = await loginModel(data.email)
        if (getUser.length === 1) {
          //   const encrypted = encryptor.encrypt(getUser[0].email);
          data.code = require('crypto').randomBytes(3).toString('hex')
          const otp = {
            email: getUser[0].email,
            code: data.code
          }
          insertOTP(otp)
          sendEmail('OTP Code', { ...otp, name: getUser[0].name })
          return response(
            res,
            true,
            'Please check your email to change password',
            [],
            200
          )
        }
        return response(res, false, 'Email is not registered!', [], 400)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  ChangePassword: async (req, res) => {
    try {
      // const data = {
      //   email: req.body.email,
      //   password: hashSync(req.body.password, genSaltSync(1)),
      // };
      const data = req.body
      const validation = await changePassVal(data)

      if (validation.error === undefined) {
        data.password = hashSync(req.body.password, genSaltSync(1))
        const result = await updateUser(data, data.email)
        console.log(result)
        return response(res, true, 'Password successfully changed!', [], 200)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
