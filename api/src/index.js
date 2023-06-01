// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// const db = require('mysql.js');

// defining the Express app
const app = express();

let currentId = 0;
let todos = [];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// GET /
app.get('/', async (req, res) => {
    let todos = await db.getItems();
    res.send(todos);
});

// POST /
app.post('/', async (req, res) => {
    let newTodo = req.body;
    newTodo.id = currentId++;
    //todos.push(newTodo)
    await db.storeItem(newTodo);
    res.status(201).send(newTodo)
});

// GET /id
app.get('/id/:id', async (req, res) => {
    //let todo = todos.find(t => t.id == req.params.id);
    let todo = getItem(id);
    if (!todo) {
        res.sendStatus(404)
    } else {
        res.send(todo);
    }
});

// PATCH /id
app.patch('/id/:id', async (req, res) => {
    let todo = todos.find(t => t.id == req.params.id);
    if (!todo) {
        res.sendStatus(404)
    } else {
        todo.description = req.body.description ?? todo.description;
        todo.completed = req.body.completed ?? todo.completed;
        res.send(todo);
    }
});

// DELETE /id
app.delete('/id/:id', async (req, res) => {
    let todo = todos.find(t => t.id == req.params.id);
    if (!todo) {
        res.sendStatus(404)
    } else {
        todos = todos.filter(t => t.id != req.params.id)
        res.sendStatus(204)
    }
});

// check if we can initialize the db
db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
