const jwt = require( "jsonwebtoken" );
const tokenError = require( "../errorControl/tokenError" );
const debug = require( "debug" )( "3db: isUserConnected" );


const isUserConnected = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader.split(" ")[1] !== "Bearer") {
    return next()
  }
  
  const token = authHeader.split(" ")[1];
  
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        const err = new tokenError("invalid or expired token");
        return next(err);
      }
      console.log(decoded)
      return decoded;
    }
  );
  
  req.decodedId = decoded.id;
  debug("USER IS CONNECTED PASSED")
  next();
  
}

module.exports = isUserConnected;
