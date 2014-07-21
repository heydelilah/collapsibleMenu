var app = require('http').createServer(handler)
	, fs = require('fs')
	,url = require("url");

app.listen(8099);



function handler (req, res) {
	var pathname = url.parse(req.url).pathname;
	pathname = (pathname=='/') ? 'main.html' : pathname;

	fs.readFile(__dirname +'/'+pathname,
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}
