const { decoderJWT } = require('../middlewares/jwt');
const todoModel = require('../model/todoModel')
const userModel = require('../model/userModel')


const fetchTask = async ( req,res) =>{
    try{
        // console.log(req.header('auth-token'));
        // const token =req.header('auth-token')
        // const result = await decoderJWT(token);
        const {id} = req.query;
       if(id){
        const user = await userModel.findOne({ _id : id });
        const todo= await todoModel.findOne({userid:user.id})||{todo:['no more task']}
        res.status(200).json(todo.todo)
       }
       }
    catch (error) {

        console.log(error);
       
    }
}

const addTask = async (req,res) =>{
    try{
        console.log('bomma');
        const {todo} = req.body
        const result = await decoderJWT(req.header("auth-token"));
        const user = await userModel.findOne({ _id : result.id });
        const list= await todoModel.findOne({userid:user.id})
        if(!list){
            const newTodo = new todoModel({todo,userid:user._id})
            await newTodo.save();
            res.status(200).json(newTodo.todo)

        }else{
            const pass =list.todo.includes(todo)
            if(pass){
                res.status(409).json({message:'task already exist'})
            }else{

                const newtodo= await todoModel.findOneAndUpdate(
                    { userid: user._id },
                    { $push: { todo } },
                    { new: true })
                   
                    res.status(200).json(newtodo.todo)
            }
        }
       }
    catch (error) {
        console.log(error);
        res.status(400).json({message:'something went wrong'})       
    }
}


const taskCompleted = async (req,res) =>{
    try {
        console.log(req.body);
        const {todo,user} = req.body
        const mytodos = await todoModel.findOne({ userid: user.id });
        if(mytodos.todo.includes(todo)){
            const newTodo = await todoModel.findOneAndUpdate(
                { userid: user.id }, 
                {
                    $pull: { todo: todo }, 
                    $push: { completedTask: todo } 
                },
                { new: true } )
                res.status(200).json(newTodo.todo)
        }
    } catch (error) {
     console.log(error);   
    }
}

const getCompleted = async (req,res) =>{
    try {
        const val = req.body
        const todo = await todoModel.findOne({userid:val.userid})
        res.status(200).json(todo.completedTask||['no tasks in comleted list'])
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req,res) =>{
    try {
        const {id,val} = req.body

        const newTodo = await todoModel.findOneAndUpdate(
            { userid: id }, 
            {
                $pull: { completedTask: val } 
            },
            { new: true } )
        res.status(200).json(newTodo.completedTask)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    fetchTask,
    addTask,
    taskCompleted,
    getCompleted,
    deleteTask
}