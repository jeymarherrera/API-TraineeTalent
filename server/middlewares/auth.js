const jwt = require("jsonwebtoken");
const decode = require("jsonwebtoken/decode");
const {JWT} = require("../../config/config");

const verificarToken = async(req, res, next) =>{
    try {
        const token = req.get("X-AUTH-TOKEN");
        const decoded = jwt.verify(token, JWT.SEED);
        console.error(`El token contiene: ${JSON.stringify(decoded)}`);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res
        .status(401)
        .send(error.message);
    }
}

module.exports = {verificarToken};