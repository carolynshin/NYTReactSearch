// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");
// Exporting an object with methods for retrieving and posting data to our API


var helpers = {

  getArticles: function(topic, start, end) {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; 
  url += "?" +  $.param({
    'api-key': "d5d12de4fcf74bfe896b56623e3b8b8b",
    'q': topic,
    'begin_date': start,
    'end_date': end
  });
    return axios.get(url);
  },

  saveArticles: function(title, link){
      return axios.post('/api/saved', 
        {
        title: title,
        link: link
        });
  },

  getSavedArticles: function() {
    return axios.get('/api/saved');
  },

  deleteArticle: function(article){
    return axios.put('/api/saved',
      {
        title: article.title,
        link: article.link
      })
  }


}


module.exports = helpers;