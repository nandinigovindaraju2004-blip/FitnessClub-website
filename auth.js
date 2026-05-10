const Fitness = require('../Modals/fitness');
const jwt = require('jsonwebtoken');


const auth = async (req,res,next) =>{
    try{
        const token = req.cookies.cookie_token;
        

        if(!token){
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token,process.env.JWT_SecretKey);
        
        req.fitness = await Fitness.findById(decode.fitness_id).select('-password');

        next();


    }catch(err){
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = auth;