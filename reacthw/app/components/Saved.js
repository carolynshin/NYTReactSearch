// Include React
var React = require("react");
var helpers = require('../utils/helpers');

var io =  require('socket.io-client');
var socket = io('http://localhost:3000');

var Saved = React.createClass({

  getInitialState: function() {
    return {
      savedArticles : []
    };
  },

  componentDidMount: function() {
    self = this;
    socket.on('initialFetch', function (data) {
      console.log('mounted in saved');
      self.setState({
        savedArticles: data
      })
    });
    socket.on('fetchNewData', this.fetchArticles);
    socket.on('fetchNewDataAfterDelete', this.fetchArticles);
  },

  fetchArticles: function(data) {
    self = this;
    helpers.getSavedArticles()
      .then(function(response) {
        self.setState({
          savedArticles: response.data
        });
      });
  },

  deleteArticle: function(article) {
  	self = this;
  	helpers.deleteArticle(article)
  		.then(function(response){
        console.log(response);
        socket.emit('deleteTheFreakingData', {hello: 'world'});
        // socket.on('updateSavedArticles', function(data){
        //   self.setState({savedArticles: response.data});
        // });
  		})
  },

  render: function() {

	var articles = this.state.savedArticles.map(function(article){
        	return (
        		<div>
        			<p>
        			<button type="button" className="btn btn-success" onClick={this.deleteArticle.bind(this, article)}>
        				Delete
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
			          <h3 className="panel-title"><strong><i className="fa fa-floppy-o"></i>   Saved Articles </strong></h3>
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
module.exports = Saved;