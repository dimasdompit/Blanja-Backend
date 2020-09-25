module.exports = {
  response: (res, status, message, data, statusCode, pagination) => {
    const result = {
      success: status || false,
      message: message || '',
      data: data || null,
      status: statusCode,
      pagination: pagination
    }

    return res.status(result.status).json({
      success: result.success,
      message: message,
      data: data,
      pagination: pagination
    })
  }
}
