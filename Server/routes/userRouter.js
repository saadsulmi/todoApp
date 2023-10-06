const express = require('express')
const userRoute = express();
const userController = require('../controller/userController')


userRoute.post('/login',userController.login)
userRoute.post('/createAccount',userController.register);

userRoute.get('/userData',userController.getUser);



module.exports = userRoute