/* Variables for Overlay*/
var $;
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img id="overlayImage">');
var $caption = $("<p></p>");
var $currentImage;
var $imageLocation;
var imageCaption;


/* Variables for Left/Right arrows */
var $leftArrow = $('<a href=""><img id="leftArrow" src="pictures/keyboard-left-arrow-button.svg"/>');
var $rightArrow = $('<a href=""><img id="rightArrow" src="pictures/keyboard-right-arrow-button.svg"/>');

//Appending overlay to body
$("body").append($overlay);
$($overlay).append($image);
$($overlay).append($caption);
$($overlay).append($leftArrow);
$($overlay).append($rightArrow);

// clicking on an image to make the overlay appear

$("#photo_gallery a").click(function (event) {

	//Prevent image to link a dead end
	event.preventDefault();

  //Show the overlay
	$overlay.fadeIn(1000);


	//Get the href
	var $imageLocation = $(this).attr("href");

// Updates the ooverlay 
	$image.attr("src", $imageLocation);

// Find the children alt
	var imageCaption = $(this).children("img").attr("alt");
  // This adds the text from the alt1 
	$caption.text(imageCaption);

  $currentImage = $(this).children("img");

});



//Show next image
var next = function (e) {
  $imageLocation = $currentImage.parent("li").next().children("a").attr("href");
  $image.attr("src", $imageLocation);
  imageCaption = $currentImage.parent("li").next().children("a").children("img").attr("alt");
  $caption.text(imageCaption);
  $overlay.show();
  $currentImage = $currentImage.parent("li").next().children("a").children("img");
};

//Show previous image
var prev = function() {
  $imageLocation = $currentImage.parent("li").prev().children("a").attr("href");
  $image.attr("src", $imageLocation);
  imageCaption = $currentImage.parent("li").prev().children("a").children("img").attr("alt");
  $caption.text(imageCaption);
  $overlay.show();
  $currentImage = $currentImage.parent("li").prev().children("a").children("img");
};



//Clicking right arrow execute function nextImage
$('#rightArrow').click(function() {
  if ($currentImage.parents("li").next().children("a").children("img").length !== 0) {
      next();
  }
});

//Clicking left arrow, execute function previousImage
$('#leftArrow').click(function() {
  if ($currentImage.parents("li").next().children("a").children("img").length !== 0) {
      prev();
  }
});


// search function

(function() {                             // Lives in an IIFE
  "use strict";
  var $imgs = $('#photo_gallery img');    // Get the images
  var $search = $('#search');             // Get the input element
  var cache = [];                         // Create an array called cache

  $imgs.each(function () {                   // For each image
    cache.push({                            // Add an object to the cache array
      element: this,                        // This image
      text: this.alt.trim().toLowerCase()   // Its alt text (lowercase trimmed)
    });
  });

  function filter() {                               // Declare filter() function
    var query = this.value.trim().toLowerCase();    // Get the query
    cache.forEach(function(img) {                   // For each entry in cache pass image 
      var index = 0;                                // Set index to 0

      if (query) {                                   // If there is some query text
        index = img.text.indexOf(query);            // Find if query text is in there
      }

      img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
    });
  }

  if ('oninput' in $search[0]) {          // If browser supports input event
    $search.on('input', filter);          // Use input event to call filter()
  } else {                                // Otherwise
    $search.on('keyup', filter);          // Use keyup event to call filter()
  }            

}());


// Hide overlay when clicking outside of image
$overlay.click(function(){
	$overlay.hide();

});

// Hide overlay when Escape key is pressed
$(document).keydown(function(k) {
  if(k.keyCode == 27 ){         
    $overlay.hide();
  }
});