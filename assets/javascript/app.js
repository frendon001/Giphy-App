// Array of initial Disney Movie Names
var topics = ["Snow White", "Pinocchio", "Fantasia", "Dumbo", "Bambi", "Cinderella", "Alice in Wonderland", "Peter Pan", "Lady and the Tramp"];

// show topics based on the selected topic item
function displayTopics() {
	var randomOffset = Math.floor(Math.random() * 151);
	console.log(randomOffset);
	var topic = $(this).attr("data-topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7klJ3TDY1Oynx5Baneh7rQxp4v2qPO7H&q=" +
		topic + "&limit=10&offset="+randomOffset+"&lang=en";

	// run AJAX call to the giphy query
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var topicResults = response.data;
		//loop through all the results from the API
		for (var i = 0; i < topicResults.length; i++) {
			//New Div to hold topic item
			var topicItemDiv = $("<div class='topic-gif-item card'>");
			//New P element to hold rating
			var topicRatingP = $("<p>").text("Rating: " + topicResults[i].rating.toUpperCase());
			//New Img element to hold the gif
			var topicImage = $("<img class='card-img'>").attr("src", topicResults[i].images.fixed_height_still.url);
			//Add data required to toggle from still to animated to img element
			topicImage.attr("data-animate", topicResults[i].images.fixed_height.url)
				.attr("data-still", topicResults[i].images.fixed_height_still.url)
				.attr("data-state", "still");
			//New div to place gif within bootstrap card structure
			var topicCard = $("<div class='card-body'>");
			//Create bootstrap structure with newly created elments
			topicCard.append(topicRatingP);
			topicItemDiv.append(topicImage).append(topicCard);
			//Add card to html on page
			$("#topic-gifs").prepend(topicItemDiv);
		}
	});

}

//Dynamically create buttons from array
function createTopicButtons() {

	//Clear buttons already on the page
	$("#topic-btns").empty();

	// Loop through topics
	for (var i = 0; i < topics.length; i++) {
		// create new buttons dynamically for each topic
		var newTopicBtn = $("<button>");
		newTopicBtn.addClass("topic-btn btn").attr("data-topic", topics[i]).text(topics[i]);

		// Add the button to the topic-btns div
		$("#topic-btns").append(newTopicBtn);

	}

};


function newTopicButton() {
	//prevent submit button's default functionality
	event.preventDefault();
	// create new button dynamically
	var newTopic = $("#topics-input").val().trim();
	//add new topic to topics array
	topics.push(newTopic);

	//Display new list of buttons
	createTopicButtons();

	//clear content from input box
	$("#topics-input").val("");
};


function toggleGif() {

	//Save the current state of the gif in a variable called state
	var state = $(this).attr("data-state");

	//toggle the state based on current state of gif
	//if current state is "still" change state and use the animated gif
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	//toggle the state based on current state of gif
	//if current state is "animate" change state and use the still gif
	if (state === "animate") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
};

function clearResults() {


	$("#topic-gifs").empty();
	
};

// ***
// *Functions and event listeners used to run the app
// ***

// Call function to create buttons from initial static array
createTopicButtons();

// Event listener for all topic-btn elements
$(document).on("click", ".topic-btn", displayTopics);

// Event listener to add-topic
$("#add-topic").on("click", newTopicButton.bind(this));

// Event listener to clear results
$("#clear-gifs").on("click", clearResults);

//Event listener for gif toggle
$(document).on("click", ".card-img", toggleGif);



