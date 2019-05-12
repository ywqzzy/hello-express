var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.get('/:id', function(req, res) {
  //res.send('this is index')
  var responseObject = {
    name:"zzywq",
    id:req.params.id
  }
  //也可以放数组
  //res.send(responseObject)
  res.json(responseObject)
})

app.post('/', function(req, res) {
  console.dir(req.body)
  res.send(req.body.name)
})
//post delete
app.listen(3000)
console.log("listening")
