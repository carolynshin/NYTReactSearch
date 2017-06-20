// ???????
// ===========
// Axios for AJAX requests.
// Either require Axios here create a helpers file we will require here
// Here we include all of the sub-components

// import react
var React = require("react");
var helpers = require('../utils/helpers');

// import child components
var Results = require("./Results");
var Saved = require("./Saved");

// create Form component
var Form = React.createClass({

  // set a generic state associated with topic, startYear, and endYear for NYTimes Search
  getInitialState: function(){
    return {
      topic: "",
      startYear: "",
      endYear: "",
      scrapedArticles: []
    };
  },

  // custom function to change state of topic any time user types anything
  handleTopicChange: function(event){
    this.setState({
      topic: event.target.value
    })
  },

  // custom function to change state of startYear any time user types anything
  handleStartChange: function(event){
    this.setState({
      startYear: event.target.value
    })
  },

  // custom function to change state of endYear any time user types anything
  handleEndChange: function(event){
    this.setState({
      endYear: event.target.value
    })
  },

  onSubmit: function(event){
    event.preventDefault();
    var self = this;
    helpers.getArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then(function(response){
        console.log(response);
          var articleDocs = response.data.response.docs;
          var articleArray = [];
          articleDocs.forEach(function(item){
            var articleInfo = {};
            articleInfo.title = item.headline.main;
            articleInfo.link = item.web_url;
            articleArray.push(articleInfo);
          });
        self.setState({
          scrapedArticles: articleArray
        });
      })
      .catch(function(error){
        console.log(error);
      });
  },

  // render JSX code
  render: function(){
    return(
      <div className="container">
          <div className="jumbotron" styles={{backgroundColor: "#20315A" , color: "white"}}>
            <h2 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Article Scrubber</strong></h2>
            <h4 className="text-center"> Search for and annotate articles of interest! </h4>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
                </div>
                <div className="panel-body">

                  <form role="form" onSubmit={this.onSubmit}>

                    <div className="form-group">
                      <label for="search">Topic:</label>
                      <input type="text" className="form-control" id="search-term" value={this.state.topic} onChange={this.handleTopicChange}/>
                    </div>

                    <div className="form-group">
                      <label for="start-year">Start Year (YYYMMDD):</label>
                      <input type="text" className="form-control" id="start-year" value={this.state.startYear} onChange={this.handleStartChange}/>
                    </div>

                    <div className="form-group">
                      <label for="end-year">End Year (YYYMMDD):</label>
                      <input type="text" className="form-control" id="end-year" value={this.state.endYear} onChange={this.handleEndChange}/>
                    </div>

                    <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button>

                  </form>
                </div>
              </div>
            </div>
          </div>

          <Results scrapedArticles={this.state.scrapedArticles}/>

         <Saved />


          <div className="row">
            <div className="col-sm-12">

              <h5 className="text-center"><small>Made by Carolyn <i className="fa fa-heart"></i></small></h5>

            </div>
          </div>
        </div>
      )
  }



})

// export Form component so it can be used by `../app.js`
module.exports = Form;