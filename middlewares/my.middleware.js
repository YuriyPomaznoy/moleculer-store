module.exports = function(req, res, next) {
  res.locals.myname = "Юрец";
  next();
}