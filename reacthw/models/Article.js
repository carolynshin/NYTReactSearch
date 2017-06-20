// require mongoose
var mongoose = require("mongoose");

// create a schema class
var Schema = mongoose.Schema;

// create a article schema
var ArticleSchema = new Schema({

	// title is a required string
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;