const mongoose = require('mongoose');



const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/letstodo').then((res)=>{
           console.log('mongoose connected succefully');
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
}