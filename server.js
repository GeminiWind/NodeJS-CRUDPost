var express = require("express");
var chalk = require("chalk");
var app = express();
var dotenv = require("dotenv").config();
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var lusca = require("lusca");
var expressValidator =  require("express-validator");
var methodOverride = require('method-override');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var passport = require("passport");
var mongoose = require("mongoose");
var logger = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.Promise = require('bluebird');
// Connect to the beerlocker MongoDB
mongoose.connect(process.env.MONGODB_URL);


app.set('port', process.env.PORT || 8080);
app.set('domain', process.env.DOMAIN || 'localhost');
app.set('env', process.env.NODE_ENV || "development");
app.set("view engine","pug");
app.set("views","./resource/views");

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URL,
    autoReconnect: true,
    clear_interval: 3600
  })
}));
app.use((req, res, next) => {
  //if route is api || csrf not work with enctype =>ignore
  if (req.path.indexOf("api") !== -1 || req.path === '/profile/pic') {
    next();
  } else {
  //use CSRF token to protect app
    lusca.csrf()(req, res, next);
  }
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

//router
require('./routes/web.js')(app,passport,io);
require('./routes/api.js')(app,io);

io.on('connection', function (socket) { 
  socket.on("chat", function(data) {
    console.log(data.content + data.author);
  });
});

http.listen(app.get('port'), app.get('domain'), () => {
    console.log('%s App is running at http://%s:%d in %s mode', 
          chalk.green('✓'),
          app.get('domain'),
          app.get('port'),
          app.get('env')); 
    console.log('   -> Press CTRL+C to stop\n');
});

module.exports = app;