const userDatamapper = require( "../../datamappers/userDatamapper" );
const badInputError = require( "../errorControl/badInputError" );
const debug = require( "debug" )( "3db:checkUserAvailability" );

async function checkAvailability(req, res, next) {
  
  debug("checkAvailability")
  const { email, pseudo } = req.body;
  
  
    const emailCheck = await userDatamapper.getAll({ email });
    const pseudoCheck = await userDatamapper.getAll({ pseudo });
    
    if (emailCheck.length > 0) {
      return new badInputError("Email already exist");
    }
    if (pseudoCheck.length > 0) {
      return new badInputError("Pseudo already exist");
    }
    
    next();
 
  
}
return module.exports = checkAvailability;
