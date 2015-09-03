var path = require('path');
var publicFileRoot = path.join(__dirname, './public');

module.exports = function(app) {

	//
	// view -------------------------------------------------------------
	//

	app.all('/manifest.appcache', function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/cache-manifest'});
  		res.end("CACHE MANIFEST");
	});

	app.get('*', function(req, res) {
		res.sendFile('index.html', { root: publicFileRoot });
	});

	//
	// api ---------------------------------------------------------------------
	// 
	app.get('/api/todos', function(req, res) {

	});

	app.post('/api/todos', function(req, res) {

	});


	
};
