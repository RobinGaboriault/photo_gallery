
$(document).ready(function() {       

var $overlay = $('<div id="overlay"></div>'); 

var $image = $('<img id="overlayImage">');  

var $caption = $("<p></p>");

var $lastLightboxImage = $('<img>');

var $nextLightboxImage = $('<img>');

var $leftArrow = $('<a href=""><img id="leftArrow" src="pictures/keyboard-left-arrow-button.svg"/>');

var $rightArrow = $('<a href=""><img id="rightArrow" src="pictures/keyboard-right-arrow-button.svg"/>');


// Add image to overlay
$overlay.append($image);

//Add caption to overlay
$overlay.append($caption);

//Add arrows for the slideshow
$overlay.append($leftArrow);

$overlay.append($rightArrow);

//Add overlay
$("body").append($overlay);



// Click event on a link to an image 
$("#photo_gallery a").click(function(event){
    event.preventDefault();
    var imageLocation = $(this).attr("href");
    // Update overlay with the image linked 
    $image.attr("src", imageLocation);

    getCurrentImage(this);

    // Show overlay
    $overlay.show();

    //Get child alt attribute and set caption
    var captionText = $(this).children("img").attr("alt");
    $caption.text(captionText);


});



// search function

(function() {                             // Lives in an IIFE
  var $imgs = $('#photo_gallery img');    // Get the images
  var $search = $('#search');             // Get the input element
  var cache = [];                         // Create an array called cache

  $imgs.each(function() {                   // For each image
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


//Clicking on arrow to show the last picture
$leftArrow.click(function(event){
    getPrevImage();
});

//Clicking on arrow to show the next picture
$rightArrow.click(function(event){
    getNextImage();
    $image.show();
});

function getCurrentImage (currentImage) {
    thisImage = $(currentImage).children("a");
    thisImageLocation = $(thisImage).attr('href');
    $image.attr('src', thisImageLocation);
}

function getPrevImage() {
    imageParent = $(thisImage).parent().prev();
    if(prevImageParent.length!=0){
        thisImage = $(imageParent).children('a');
        //imageLocation = $(thisImage).attr("href");
        //$image.attr("src", imageLoocation);
    }
    
    getCurrentImage(thisImage);
}

function getNextImage() {
    imageParent = $(thisImage).parent().next();
    if(imageParent.length!=0){
    thisImage = $(imageParent).children("a");
      // imageLocation = $(thisImage).attr("href");
      // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
}


// Hide overlay when clicking outside of image
$overlay.click(function(){
	$overlay.hide();

});
});













