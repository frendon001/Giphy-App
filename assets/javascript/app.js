// Array of initial Disney Movie Names
var topics = ["Snow White", "Pinocchio", "Fantasia", "Dumo", "Bambi", "Cinderella", "Alice in Wonderland", "Peter Pan", "Lady and the Tramp"];

// show topics based on the selected topic item
function displayTopics() {

	var topic = $(this).attr("data-topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7klJ3TDY1Oynx5Baneh7rQxp4v2qPO7H&q=" + topic + "&limit=10&offset=0&lang=en";

	// run AJAX call to the giphy query
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		// Div to hold topic item
		var topicDiv = $("<div class='topic-gif-item'>");


	});

}

//Dynamically create buttons from array
function createButtons() {

	//Clear buttons already on the page
	$("#topics-btns").empty();

	// Loop through topics
	for (var i = 0; i < topics.length; i++) {
console.log("test");
		// create new buttons dynamically for each topic
		var newTopicBtn = $("<button>");
		newTopicBtn.addClass("topic-btn btn").attr("data-topic", topics[i]).text(topics[i]);

		// Adding the button to the buttons-view div
		$("#topic-btns").append(newTopicBtn);

	}

}


// Call function to create buttons from initial static array
createButtons();