var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
var multer = require('multer')

var createFolder = function(folder) {
  try{
    fs.accessSync(folder)
  }catch(e) {
    fs.mkdirSync(folder)
  }
}
var uploadFolder = './upload'
createFolder(uploadFolder)

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({storage: storage})

var app = express()
var urlencodedParser = bodyParser.urlencoded({extended:false})
var jsonParser = bodyParser.json()
//app.use(bodyParser.urlencoded({extended:false}))


/*app.get('/:id', function(req, res) {
  //res.send('this is index')
  var responseObject = {
    name:"zzywq",
    id:req.params.id
  }
  //也可以放数组
  //res.send(responseObject)
  res.json(responseObject)
})*/


app.get('/form', function(req, res) {
  var form = fs.readFileSync('./form.html', {encoding: "utf8"})
  res.send(form)
})

app.post('/', urlencodedParser, function(req, res) {
  console.dir(req.body)
  res.send(req.body.name)
})

app.post('/upload', upload.single('logo'), function(req, res) {
  console.dir(req.file)
  res.send({'ret_code':200})
})



//post delete
app.listen(3000)
console.log("listening")
