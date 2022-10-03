require('dotenv').config()
const jwt = require('jsonwebtoken')

const fetchauthuser = async (req, res, next) => {
    // get the user from jwt token and  add id from to req object
    const token = req.header('auth-token') // yeh token header sy leka arhy hen - jb req bhejenga uth-token ky nam sy bhejenga
    // agr token nh hy
    if (!token) {
        res.status(401).send({ error: 'please authenticate a user using valid token' })
    }
    try {
        const verifyToken = jwt.verify(token, "muhammaddaniyalsaleemcsitmerndeveloper")
        req.user = verifyToken
        // console.log(req.user);
        next()
    } catch (error) {
        res.status(401).send({ error: 'please authenticate a user using valid token' })
    }
}

module.exports = fetchauthuser;