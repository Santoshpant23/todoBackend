const express = require('express');
const port = 3001;
const zod = require('zod');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors())

mongoose.connect("mongodb+srv://pantsantosh:bzCzDVSfTSBiutWz@cluster0.g3kc3lr.mongodb.net/todoapp")

const Schema = mongoose.model('User', {title: String, description: String, isDone: Boolean});

app.use(express.json());


app.put('/done', async (req, res) => {
    const id = req.headers.id;
    console.log(id);
    const todo = await Schema.findOne({_id: id});
    console.log(todo);
    todo.isDone = !todo.isDone; // Toggle the value of isDone
    console.log(todo);
    await todo.save(); // Save the updated todo
    console.log(todo);
    res.json({
        msg: "Success"
    });
});

app.get('/gettodos', async (req, res)=>{
    const response = await Schema.find({});
    // console.log(response);
    res.json(response);

})

app.put('/deletetodo', async (req,res)=>{
    const id = req.body.id;
    const todo = await Schema.deleteOne({_id: id});


    res.json({
        msg: "Success"
    })

})

app.post('/addtodo', (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const isDone = false;

    const todo = new Schema({title:title, description: description, isDone: isDone});
    todo.save();

    res.status(200).json({
        message: "Success"
    })
})

app.listen(port, (req,res)=>{
    console.log("deployed");
})


