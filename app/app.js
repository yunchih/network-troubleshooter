

// set up ======================================================================
var express  = require('express');
var app      = express(); 							
var mongoose = require('mongoose'); 			
var port  	 = process.env.PORT || 8080; 	

var morgan = require('morgan'); 
var bodyParser = require('body-parser'); 

// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static('app/public'));		
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);