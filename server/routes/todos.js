const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

router.use(express.json());

let todos = [{data:'clean room', id: v4(), isCompleted: false}, {data:'water the plants', id: v4(), isCompleted: true}];

router.get('/clearcompleted', (req, res) => {
    todos = todos.filter(todo => !todo.isCompleted);
    res.send(todos);
});

router
    .route('/')
    .get((req, res) => {
        res.send(todos);
    })
    .post((req, res) => {
        const {data} = req.body;
        let newTodo = {data: data, id: v4(), isCompleted: false};
        todos.push(newTodo);
        res.send(newTodo);
    });

router
    .route('/:todoId')
    .get((req, res) => {
        res.send(req.foundTodo);
    })
    .put((req, res) => {
        const {data, isCompleted} = req.body;

        if (data) {
            req.foundTodo.data = data;
        }

        if (isCompleted !== undefined) {
            req.foundTodo.isCompleted = isCompleted;
        }

        res.send(todos);
    })
    .delete((req, res) => {
        let indexToRemove;
        for (let i=0; i<todos.length; i++) {
            if (todos[i].id === req.foundTodo.id) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove !== undefined) todos.splice(indexToRemove, 1);
        else console.log(`Not found todo to delete with id ${req.foundTodo.id}`)
        res.send(todos);
    });

router.param('todoId', (req, res, next, todoId) => {
    // Get the todo from the database and attach it to the request
    const todo = todos.find(element => element.id === todoId);
    if (todo === undefined) {
        console.log(`Not found todo with id ${todoId}`);
        return res.status(404).send({message:'Not found todo.'});
    }
    req.foundTodo = todo;
    next(); 
});

module.exports = router;