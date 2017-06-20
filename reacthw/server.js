var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var logger = require('morgan');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var Article = require('./models/Article');

var PORT = process.env.PORT || 3000; 

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

// MongoDB configuration
// http://mongoosejs.com/docs/connections.html
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


io.on('connection', function(socket) {
	Article.find({}, function(err, article) {
		socket.emit('initialFetch', article);
	});
	socket.on('savedArticle', function (data) {
		socket.broadcast.emit('fetchNewData', data);
	});
	socket.on('deleteTheFreakingData', function(data){
		console.log(data);
		socket.emit('fetchNewDataAfterDelete', data);
		// Article.find({}, function(err, article){
		// 	socket.emit('updateSavedArticles', article);
		// })
	})
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/saved", function(req, res){
	var title = req.body.title;
	var link = req.body.link;
	var article = new Article({
		title: title,
		link: link
	});
	article.save(function(err){
		if (err) {
			console.log(err);
		}
	})
	res.sendStatus(200);
})

app.get("/api/saved", function(req, res){
	Article.find({}, function(err, articles) {
		res.send(articles);
	})

})

app.put("/api/saved", function(req, res){
	var title = req.body.title;
	var link = req.body.link;

	Article.findOneAndRemove({title: title, link: link}, function(err){
		if (err){
			return console.log(err);
		}
		else {
			console.log("removed from db!");
			res.sendStatus(200);
		}
	});
	
});

// Starting our express server
server.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});