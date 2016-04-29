
// a wrapper around 2 arrays
var model = {
  watchlistItems: [],
  browseItems: []
}

var api = {
  root: "https://api.themoviedb.org/3",
  token: "1968d1e523f99b9563f5cbf37e84e0e1" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var title = $("<p></p>").text(movie.original_title);
		var itemView = $("<li></li>").text(title);
		$("#section-browselist ul").append(itemView);
		
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
  });
  
}

// to refer to them
//	var firstMovieTitle = model.watchlistItems[0].original_title.val();
//	console.log(firstMovieTitle);

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
// makes sure html loaded before doing other stuff so elements sure to be there
// passing a function into another function
$(document).ready(function() {
  discoverMovies(render);
  console.log("Ready!!");
});

