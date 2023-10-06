const express = require('express');
const app= express()
const cors = require('cors')
const userRoute = require('./routes/userRouter')
const todoRoute = require('./routes/todoRoute');
const {connectDB} = require('./config/mongoDB');

const PORT =3000


app.use(cors())
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}))

connectDB();

app.use('/api',userRoute)
app.use('/api/todo',todoRoute)

app.listen(PORT,()=>{
    console.log(`server connected succesfully on ${PORT}`);
})