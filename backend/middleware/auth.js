const user = require("../model/user");

// this middleware make sures the user have authorized session, except some
const session_validator = async (req, res, next) => {
  console.log("Session ids ==>", req.session.passport);
  // bypassing some routes, the session validation check
  if (req.url == "/backend/login"
    || req.url == "/backend/logout"
    || req.url == "/backend/registration") return next();

  // making sure all session have varified passport object, with users details
  if (req.session.passport && req.session.passport.user && req.session.passport.user.id) {
    next();
  } else {
    // if not varified, sending unauthorized status
    return res.status(401).json({
      msg: "Unauthorized!"
    });
  }
};

module.exports = session_validator;