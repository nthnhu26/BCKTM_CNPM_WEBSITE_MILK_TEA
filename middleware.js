// middleware.js
function saveReturnUrl(req, res, next) {
  if (req.query.returnUrl) {
    req.session.returnUrl = req.query.returnUrl;
  }
  next();
}

module.exports = { saveReturnUrl };
