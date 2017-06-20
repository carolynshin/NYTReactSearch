// Include React
var React = require("react");
var helpers = require('../utils/helpers');

var io =  require('socket.io-client');
var socket = io('http://localhost:3000');

var Results = React.createClass({

  save: function(article){

  	console.log('before saving');
  	helpers.saveArticles(article.title, article.link)
  		.then(function(response){
			socket.emit('savedArticle', article);
  			
  		})
  		.catch(function(err) {
  			console.log(err);
  		})
  },


  render: function() {

  			        
	var articles = this.props.scrapedArticles.map(function(article){
		        	return (
		        		<div>
		        			<p>
		        			<button type="button" className="btn btn-success" onClick={this.save.bind(this, article)}>
		        				Save
		        			</button>


		        			<a href={article.link}>{article.title}</a>
		        			</p>
		        		</div>
		        	);
		        }, this);
    return (
		<div>

		  <div className="row">
		    <div className="col-sm-12">
		      <div className="panel panel-primary">
		        <div className="panel-heading">
		          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Results</strong></h3>
		        </div>

		        <div className="panel-body" id="well-section">

		        	{articles}

		        </div>
		      </div>
		    </div>
		  </div>	

		</div>

    );
  }
});
// Export the component back for use in other files 
module.exports = Results;

