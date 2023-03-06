const user = require("../model/user");

// this middleware make sures the user have authorized session, except some
const session_validator = async (req, res, next) => {
  console.log("Session ids ==>", req.session.passport);
  // bypassing some routes, the session validation check
  // console.log((req.url).match(/\/api\/user\/[a-zA-Z0-9]*/));
  // console.log((req.url).match(/\/api\/user\/[a-zA-Z0-9]{24}|own|\/files\/.*/));
  const expection = (
    req.url == "/api/auth/login"
    || req.url == "/"
    || (req.method == "GET" && req.url == "/api/tweet")
    || (req.method == "GET" && req.url == (req.url).match(/\/api\/tweet\/[a-zA-Z0-9]{24}/))
    || req.url == "/api/auth/register"
    || (req.url).match(/\/api\/user\/[a-zA-Z0-9]{24}|own|\/files\/.*/)
  );
  console.log("URL regex check:", expection);
  if (expection) return next();

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