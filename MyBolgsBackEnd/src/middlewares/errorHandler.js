const errorHandler = (err, req, res, next) => {
  /**
   * @param {Error & { statusCode?: number; message?: string; name?: string; code?: number; errors?: Record<string, any> }} err
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  console.error(err.stack);
  
  // 默认错误状态码和消息
  let statusCode = err.statusCode || 500;
  let message = err.message || '服务器内部错误';
  
  // mongoose错误处理
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(error => error.message).join(', ');
  }
  
  // mongoose唯一索引错误
  if (err.code === 11000) {
    statusCode = 400;
    message = '数据重复';
  }
  
  // mongoose ObjectId错误
  if (err.name === 'CastError') {
    statusCode = 404;
    message = '资源不存在';
  }
  
  res.status(statusCode).json({
    success: false,
    error: message
  });
};

export default errorHandler;