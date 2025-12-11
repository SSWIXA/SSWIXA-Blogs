const notFound = (req, res, next) => {
  const error = new Error(`找不到资源: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFound;