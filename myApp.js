let express = require('express');
let app = express();
require('dotenv').config();

const HTML_PATH = __dirname + '/views/index.html';
const PUBLIC_PATH = __dirname + '/public';
const ECHO_PATH = '/:word/echo';

const bodyParser = require('body-parser');

// mount body parser middleware function
app.use(bodyParser.urlencoded({extended: false}))

// get query param input from client and post using provided hmtl form
app.route('/name').get((req, res) => {
  res.json({"name": `${req.query.first} ${req.query.last}`})
}).post((req, res) => {
  res.json({"name": `${req.body.first} ${req.body.last}`})
})

// echo server with client input from params
app.get(ECHO_PATH, (req, res) => {
  res.json({"echo": req.params.word});
})

// time server with middleware function
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});
})

// middleware function example
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
})

// load a file
app.get('/', (req, res) => {
  res.sendFile(HTML_PATH);
});

// statically load css file in public folder
app.use('/public', express.static(PUBLIC_PATH));

// using env variables as a configuration
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({"message": "HELLO JSON"})
  } else {
    res.json({"message": "Hello json"})
  }
})




















 module.exports = app;
