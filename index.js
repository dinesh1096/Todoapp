const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect('mongodb+srv://dinesh:dinesh123@cluster0.1ume6.mongodb.net/Data',{useNewUrlParser: true} , {useUnifiedTopology: true})


const schema = new mongoose.Schema({
text: String,
date: {type: String,
    default: new Date().toString().substring(0, 21)}
})

const todo = mongoose.model("todo" , schema )

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  todo.find({}).sort({_id:  -1}).exec(function (err,todos){
res.render('index' , { todos: todos})
  })
})

app.post('/' , (req,res) => {
  const recived = new todo({
  text: req.body.text
  })
  recived.save()
  res.redirect('/')
})

app.listen(process.env.port || 3000, () => {
    console.log('go to http://localhost:3000/')
})
