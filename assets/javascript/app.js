
	var categories = ["Ace Ventura", "The Office", "HIMYM", "Dumbledore", "Stewie"];

	function displayGifInfo() {
		console.log(this);
		var name = $(this).attr("data-images");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=12";
		$("#hpc-info").html(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
	}).done(function(response){
			//$("hpc-info").html(response.Title + "<img src='" + response.Poster + "'>");

		$("#gif").empty();
		for (var i = 0; i < 12; i++) {
			var newGifDiv = $("<div class='gifs'>")
			var rating = response.data[i].rating;
			var gifPicStill = response.data[i].images.fixed_height_still.url;
			var gifPicPresent = $("<img>").attr("src", gifPicStill);
			var gifAnimated = response.data[i].images.fixed_height.url;
			gifPicPresent.attr("data-animated", gifAnimated);
			gifPicPresent.attr("data-static", gifPicStill);
			gifPicPresent.attr("data", "still");
			gifPicPresent.addClass("images");
			newGifDiv.append(gifPicPresent);

			var gifRating = $("<span>").html("Rating: " + rating);
			gifRating.addClass("ratings");
			newGifDiv.append(gifRating);
			$("#gif").append(newGifDiv);
		}
	});
	};

	$(document).on("click", ".images", function(){
		console.log(this);
		if($(this).attr("data") === "still"){
			$(this).attr("src", $(this).attr("data-animated"));
			$(this).attr("data", "animated");
		}
		else{
			$(this).attr("src", $(this).attr("data-static"));
			$(this).attr("data", "still");
		}
	});

	function renderButtons(){
		$("#gif-view").empty();
		for (var i = 0; i < categories.length; i++) {
			var a = $("<button>");
			a.addClass("category");
			a.addClass("btn btn-success")
			a.attr("data-images", categories[i]);
			a.text(categories[i]);
			$("#gif-view").append(a);
		}
	}
	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var category = $("#gif-input").val().trim();
		categories.push(category);
		renderButtons();
	});
	$(document).on("click", ".category", displayGifInfo);
	renderButtons();
