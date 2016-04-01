/*
*	Importing required modules in app.js
*/
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	log4js = require('log4js'),
    route = require('./server/config/router'),
    loadAddress = require('./server/helpers/loadAddress'),
	app = express();

var server = require('./server')(app);
var log = log4js.getLogger("app");

/*
*	Built-in middleware express.static for making files such as images/css/js accessable
*/
	app.use(express.static('client/'));
	app.use(express.static('node_modules'));
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

/*
*   Middleware to set request header. Added manually. Next method is called to jump into next middleware function
*/
		app.use(function(req, res, next){
		  res.set('X-Powered-By', 'Store Locator Application');
		  next();
		});

app.use(function (req, res, next) {
    if (req.headers['content-type'] == "text/plain;charset=UTF-8") {
        req.body = JSON.parse(req.body);
        req.query = JSON.parse(req.query);
        req.params = JSON.parse(req.params);
    }
    next();
});

//Render landing page
app.get('/', function(req, res, next){
    loadAddress.load(req, res);
    next();
}, function(req, res){
    res.sendFile(__dirname + '/server/views/landingPage.html');
});

app.use('/api', route);


/*
*	Error Handler. Development error handler.
*/
if (app.get('env') === 'development') {
		  app.use(function(err, req, res, next) {
		  	log.error("unexpected error occur ", err);
		  	console.log(err);
			res.status(err.status || 500);
			res.json({errorMsg: "Currently we are experiencing technical difficulties. Please try after some time."});
		  });
}

