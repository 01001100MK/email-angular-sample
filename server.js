// modules =================================================
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// get all data of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/app')); // set the static files location /app/views will be /views for users

var port = process.env.PORT || 8080; // set our port

// Require all of the routes in the applicaiton
require("./app/routes")(app);

// START THE SERVER
// =============================================================================
// Start the server
var server = app.listen(port, function() {
  console.log("Node app is running at localhost:" + port);
});

// Export the server so it can be used by the tests
module.exports = server;
