let express = require('express');
let app = express();

let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

let mongoose = require('mongoose');
mongoose.connect(
    "mongodb://admin:node123@ds059284.mlab.com:59284/cursonode",
    {useNewUrlParser: true}

);

let ToDo = require("./models/todo");

app.get('/', function(req, res){
    res.send('Hello world travis'); // envia texto
});

app.get('/todo', function(req, res){
    ToDo
        .find()
        .exec((err, todos) =>{
            if(!err){
                res.json({
                    success: true,
                    message: "ToDos buscados com sucesso",
                    todos
                }); // responde com um objeto json
            } else{
                res.json({success: false, message: err.message, todos: [] });
            }
        })
});

app.post('/todo', async(req, res) => {
    try{
        let title = req.body.title;

        let newTodo = new ToDo({
            title: title
        });

        let savedTodo = await newTodo.save();

        res.json({ success: true, message: "sucesso!!!", todo: savedTodo});
    }catch(err){
        res.json({ success: false, message: err.message});
    }
});


let port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Example app listening on port' +port);
});

module.exports = app;