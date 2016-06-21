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

    getCurrentImage(this);
    
  //Show the overlay
	$overlay.fadeIn(1000);

    
	//Get the href
	var $imageLocation = $(this).attr("href");

// Updates the overlay 
	$image.attr("src", $imageLocation);

// Find the children alt
	var captionText = $(this).children("img").attr("alt");
  // This adds the text from the alt1 
	$caption.text(captionText);

  //$currentImage = $(this).children("img");

});

// When the next button is clicked
$rightArrow.on("click", function(event) {
    event.preventDefault();
    getNextImage();
});

// When right arrow key is pressed
$("body").keydown(function(event){
    if ( event.which == 39 ) {
        getNextImage();
  }
});

// When the previous button is clicked
$leftArrow.on("click", function(event){
    event.preventDefault();
    getPrevImage();
});

// When left arrow key is pressed
$("body").keydown(function(event){
    if ( event.which == 37 ) {
        getPrevImage();
  }
});

function getCurrentImage(currentImage) {
    thisImage = currentImage;
    var imageLocation = $(currentImage).attr("href");// accessing attributes from currentImage to pull the href value 
    $image.attr("src", imageLocation);//Update overlay with the image linked in the link

    //Get child's alt attribute and set caption
    var captionText = $(currentImage).children("img").attr("alt");
    $caption.text(captionText);
}

function getPrevImage() {//Create function called getPrevImage
    imageParent = $(thisImage).parent().prev();
    if(imageParent.length!==0){
      thisImage = $(imageParent).children("a");
      // imageLocation = $(thisImage).attr("href");
      // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
    
}

function getNextImage() {//Create function called getNextImage
    imageParent = $(thisImage).parent().next();
    if(imageParent.length!==0){
    thisImage = $(imageParent).children("a");
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
}

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