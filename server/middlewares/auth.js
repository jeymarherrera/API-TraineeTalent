const jwt = require("jsonwebtoken");
const { JWT } = require("../../config/config");

const verifyToken = async (req, res, next) => {
    try {
        //const token = req.headers["x-access-token"]
        const token = req.get("X-AUTH-TOKEN");

        if (!token) {
            return res.status(401).send("Token no proporcionado");
        }

        try {
            const decoded = jwt.verify(token, JWT.SEED);
            req.userId = decoded.userId;
            req.role = decoded.role || null;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).send("Token expirado");
            } else if (error.name === "JsonWebTokenError") {
                if (error.message === "jwt malformed") {
                    return res.status(401).send("Token inválido: formato incorrecto");
                } else if (error.message === "invalid signature") {
                    return res.status(401).send("Token inválido: firma inválida");
                } else {
                    return res.status(401).send("Token inválido");
                }
            } else {
                return res.status(401).send("Error al verificar el token");
            }
        }
    } catch (error) {
        return res.status(401).send("Error al procesar el token");
    }
};

module.exports = { verifyToken };
