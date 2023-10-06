const jwt = require('jsonwebtoken');
const secret = '2c5c9b7929f292913419d2c24cfab5c13ba23e18c32e8bcf2dc5c11b19403390f49665f3f9ce87f32003ed32cc262d1baa2c645573dc7d9cd100ebb1edfabc97'

const createUserToken=(user)=>{
    try{
        const payload={
            id:user._id,
            name: user.name
        };
        const token = jwt.sign(payload,secret)
        return token
    }catch(err){
        console.log(err);
    }
}

const verifyToken = async (req,res,next)=>{
    try {
        let token = req.header("auth-token");
        console.log(token,'hererererere');
        if(!token){
            token = req.headers.auth-token
            console.log(token,'verifying token')
        }
        if(token){
            const verified = await jwt.verify(token,secret);
            if(verified){
                next()
            }else{
                res.status(401).json('user not authorised');
            }
        }
    } catch (error) {
        res.status(400).json('something went wrong');
    }
}

const decoderJWT = async (token)=>{
    try {
        if(token){
            const verified = jwt.verify(token,secret);
            return verified
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    createUserToken,
    verifyToken,
    decoderJWT
}