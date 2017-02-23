
	var categories = ["Ace Ventura", "The Office", "HIMYM", "Dumbledore", "Stewie"];

	function displayGifInfo() {
		console.log(this);
		var name = $(this).attr("data-image");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=12";
		$("#hpc-info").html(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
	}).done(function(response){
			//$("hpc-info").html(response.Title + "<img src='" + response.Poster + "'>");
		var newGifDiv = $("<div class='12gifs'>");
		$("#gif").empty();
		for (var i = 0; i < 11; i++) {
			var rating = response.data[i].rating;
			var gifRating = $("<span>").html("Rating: " + rating);
			newGifDiv.append(gifRating);

			var gifPicStill = response.data[i].images.fixed_height_still.url;
			var gifPicPresent = $("<img>").attr("src", gifPicStill);
			var gifAnimated = response.data[i].images.fixed_height.url;
			gifPicPresent.attr("data-animated", gifAnimated);
			gifPicPresent.attr("data-static", gifPicStill);
			gifPicPresent.attr("data", "still");
			gifPicPresent.addClass("image");
			newGifDiv.append(gifPicPresent);

			$("#gif").append(newGifDiv);
		}
	});
	};

	$(document).on("click", ".image", function(){
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
			a.attr("data-image", categories[i]);
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
