const express= require('express');
const todoRoute= express();
const todoController = require('../controller/todoController');
const { verifyToken } = require('../middlewares/jwt');

todoRoute.use(verifyToken);

// todoRoute.post('/addTodo',verifyToken,todoController.AddTodo);

todoRoute.get('/fetchtask',todoController.fetchTask);

todoRoute.post('/insertTask',todoController.addTask);

todoRoute.post('/completed',todoController.taskCompleted);

todoRoute.post('/fetchCompleted',todoController.getCompleted);

todoRoute.post('/removeTask',todoController.deleteTask);


module.exports = todoRoute