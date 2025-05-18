const jwt = require('jsonwebtoken');


const generateToken = (userid , res)=>{
    const token = jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn: '7d'
    });
    res.cookie("token", token, {
        maxage: 356 * 24 * 60 * 60 * 1000, // 356 days
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'development   ', // Set to true in production
    }
    )
    return token;

}
module.exports = {
    generateToken
}