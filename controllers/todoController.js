var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({extended: false})

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })

let todoSchema = new mongoose.Schema({
  item: String
})

let Todo = mongoose.model('Todo', todoSchema)

/*var itemOne = Todo({item: 'buy sth'}).save(function(err) {
  if(err) throw err;
  console.log('item saved')
})
*/
var data = [{item:'get milk'}, {item: 'walk dog'}, {item:'change the world'}]

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, data) {
      if(err) throw err
      res.render('todo', { todos: data })
    })

  })

  app.post('/todo', urlencodedParser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err) {
      if(err) throw err
      res.json(data)
    })
  })

  app.delete('/todo/:item', function(req, res) {
    /*data = data.filter(function(todo) {
      return todo.item.replace(/ /g,"-")!=req.params.item
    })*/
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err) {
      if(err) throw err
      res.json(data)
    })
  })
}
