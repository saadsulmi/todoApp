const mongoose =require('mongoose');

const todoSchema = mongoose.Schema({
    todo : {
        type: Array
    },
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    completedTask:{
        type : Array
    }

})

const todos = mongoose.model('todos',todoSchema)

module.exports = todos;