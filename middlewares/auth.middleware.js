const jwt = require('jsonwebtoken');

module.exports = async function (req,res,next){
    try {
        const {accessToken} = req.cookies;
        if(!accessToken){
            throw new Error('Access token not found');
        }
        const userData =  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!userData){
            throw new Error('Invalid access token');
        }
        req.user = userData;
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
    }
} 