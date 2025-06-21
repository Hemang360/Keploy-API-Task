const router = require('express').Router();
let Todo = require('../models/todo.js');

router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const title = req.body.title;
    const completed = req.body.completed || false;

    const newTodo = new Todo({
        title,
        completed
    });

    newTodo.save()
        .then((todo) => res.json(todo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Todo deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json('Error: Todo not found');
            }
            todo.title = req.body.title || todo.title;
            todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

            todo.save()
                .then(() => res.json('Todo updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 