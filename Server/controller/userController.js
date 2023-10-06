const userModel =require('../model/userModel')
const bcrypt = require ('bcrypt')
const {createUserToken, verifyToken, decoderJWT} = require('../middlewares/jwt')
const { json } = require('express')
const mongoose  = require('mongoose')


const login= async (req,res)=>{
    try{
        // console.log('inside login')
        const {email,password} = req.body
        const user= await userModel.findOne({email});
        if(!user){
            res.status(404).json('user not found')
        }
        const pass=await bcrypt.compare(password,user.password);
        const token = await createUserToken(user)
        console.log(pass);
        if(pass){
            console.log(typeof(token));
            // const myToken=JSON.parse(token)
            res.status(200).json({token,user})
        }else{
            res.status(401).json('password doesnt match')
        }

    }catch(err){
        console.log(err);
        res.status(404).json('something went wrong')
    }
}
const register= async (req,res)=>{
    try{

        const {email,firstName,lastName,password} = req.body;
        let name = firstName+' '+lastName;
        const user= await userModel.findOne({email});
        console.log(user);
        if(!user){
            const spassword = await bcrypt.hash(password,10)

            console.log(spassword,"hash");
            const newUser = new userModel({name,email,password:spassword})
            await newUser.save();
            res.status(200).json({ success: true, redirect: "/", newUser })
        }else{
            res.status(409).json({message:'user already exist'})
        }

    }catch(err){
        console.log(err);
        res.status(400).json('something went wrong')
    }
}

const getUser= async (req,res)=>{
    try {
        const {auth} = req.query
        // console.log('inside getuser',auth)
        if(auth){
            const result = await decoderJWT(auth)
            // const user = await userModel.findOne({ _id : result.id })
            // console.log(result,'<==result here');
            res.status(200).json(result)
        }else{
            res.status(401).json('unauthorised')
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json('something went wrong')
    }
}

module.exports={
    login,
    register,
    getUser
}