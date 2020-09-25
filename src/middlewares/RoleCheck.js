module.exports = {
  checkRole: (req, res, next) => {
    try {
      const data = req.decoded.result[0].role
      const result = data === 1
      if (result) {
        next()
      } else {
        return res.status(401).json({
          message: 'Access Denied!'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
