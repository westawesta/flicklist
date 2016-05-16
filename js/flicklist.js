

var model = {
  watchlistItems: [],
  browseItems: [],
  activeMovieIndex: 0
  // TODO (DONE)
  // add a property for the current active movie index
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "1968d1e523f99b9563f5cbf37e84e0e1", // TODO 0 add your api key
  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    var baseImageUrl = "https://image.tmdb.org/t/p/w300/";
    return baseImageUrl + movie.poster_path; 
  }
}



/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */

function discoverMovies(callback, keywords) {

  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token,
      with_keywords: keywords
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search/keywords endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, invokes the supplied callback function, passing in
 * the API's response.
 */
function searchMovies(query, callback) {

  $.ajax({
    url: api.root + "/search/keyword",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      console.log(response);
    
      var keywordIDs = response.results.map(function(keywordObj) {
        return keywordObj.id;
      });
      var keywordsString = keywordIDs.join("|");
      console.log(keywordsString);
      
      discoverMovies(callback, keywordsString);
    }
  });
}

/**
 * gets a poster for the movie
 */
 function getPoster(movie) {
    var baseImageUrl = "https://image.tmdb.org/t/p/w300/";
    return baseImageUrl + movie.poster_path; 
 }


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();
  $("carousel-inner").empty();
  
console.log("Movies to watch: ");  
  // render watchlist items
  model.watchlistItems.forEach(function(movie) {
    console.log(movie.original_title);  
    var title = $("<h6></h6>").text(movie.original_title);
      
    // movie poster
    var poster = $("<img></img>")
      .attr("src", api.posterUrl(movie))
      .attr("class", "img-responsive");

    // "I watched it" button
    var button = $("<button></button>")
      .text("I watched it")
      .attr("class", "btn btn-danger")
      .click(function() {
        var index = model.watchlistItems.indexOf(movie);
        model.watchlistItems.splice(index, 1);
        render();
      });

    // panel heading contains the title
    var panelHeading = $("<div></div>")
      .attr("class", "panel-heading")
      .append(title);
    
    // panel body contains the poster and button
    var panelBody = $("<div></div>")
      .attr("class", "panel-body")
      .append( [poster, button] );

    // list item is a panel, contains the panel heading and body
    var itemView = $("<li></li>")
      .append( [panelHeading, panelBody] )
      .attr("class", "panel panel-default");

    $("#section-watchlist ul").append(itemView);
  });
}

  
  var displayedMovie = model.browseItems[model.activeMovieIndex];
  
    $("#browse-info h2").text(displayedMovie.original_title);
    $("#section-browse p").text(displayedMovie.overview);
    
  console.log("The movie on deck is " + displayedMovie.original_title);  
  
  $("#add-to-watchlist")
  .attr("class","btn btn-primary")
  .unbind("click")
  .click(function() {
      model.watchlistItems.push(displayedMovie);
      render();
    })
  .prop("disabled", model.watchlistItems.indexOf(displayedMovie) !== -1);
  
  var posters = model.browseItems.map(function(movie) {
    
    var poster = $("<img></img>")
      .attr("src", api.posterUrl(movie))
      .attr("class", "img-responsive");
    
    return $("<li></li>")
      .attr("class","item")
      .append(poster);
      
    //var title = $("<li></li>")  
    //  .attr("class", "item")
      
  });
  
  $("#section-browse .carousel-inner").append(posters);
  
  posters[model.activeMovieIndex].addClass("active");


//   // render browse items
//   model.browseItems.forEach(function(movie) {
//     var title = $("<h4></h4>").text(movie.original_title);
//     var overview = $("<p></p>").text(movie.overview);

//     // button for adding to watchlist
//     var button = $("<button></button>")
//       .text("Add to Watchlist")
//       .attr("class", "btn btn-primary")
//       .click(function() {
//         model.watchlistItems.push(movie);
//         render();
//       })
//       .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

//     var itemView = $("<li></li>")
//       .attr("class", "list-group-item")
//       .append( [title, overview, button] );
      
//     // append the itemView to the list
//     $("#section-browse ul").append(itemView);
 


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
