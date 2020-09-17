module.exports = {
  response: (res, status, data, statusCode, pagination) => {
    const result = {
      data: data || null,
      success: status || false,
      status: statusCode,
      pagination: pagination,
    };

    return res.status(result.status).json({
      success: result.success,
      data: data,
      pagination: pagination,
    });
  },
};
