// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that this API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/ping", function (req, res) {
  res.json({greeting: 'pong'});
});

app.get('/api', (req, res) => {
	let now = Date.now();
	let d = new Date(now);

	res.json({
		unix: Math.floor(now / 1000),
		utc: d.toUTCString()
	});
});

app.get('/api/:date?', (req, res) => {	
	let d = new Date(req.params.date);

	// check if unix timestamp given, and convert
	if (isNaN(d)) d = new Date(parseInt(req.params.date));

	// check if invalid date given
	if (isNaN(d)) res.json({
		error: 'Invalid Date'
	});

	// response object
	res.json({
		unix: Math.floor(d.getTime() / 1000),
		utc: d.toUTCString()
	});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('🎉 Your app is listening on port ' + listener.address().port + ' 🎉');
});
