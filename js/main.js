

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

// Add image to overlay
$overlay.append($image);

//Add caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);




// Click event on a link to an image 
$("#photo_gallery a").click(function(event){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	// Update overlay with the image linked 
	$image.attr("src", imageLocation);

	// Show overlay
	$overlay.show();

	//Get child alt attribute and set caption
	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);


});


// Hide overlay when clicked
$overlay.click(function(){

	$overlay.hide();

});






































