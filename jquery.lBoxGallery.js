/**
 * Lightbox and gallery combined.
 */

(function($) {

  /**
   * ----------
   * Lightbox-function - Display the lightbox with overlay 
   * ----------
   */
  $.fn.lBGlightbox = function(params) {
	//get window (inner) height and width
    var windowHeight = window.innerHeight || $(window).height(), // make it work on ipad & android
        windowWidth  = window.innerWidth  || $(window).width(),
		imgTitle = $(this).attr('title'),
		// extend
		options = $.extend({
		  'fade': false
		}, params),
		fading = options.fade;
		
	//Remove lightbox and overlay if it's already exists 
	$('#lBG-overlay, #lBG-lightbox').remove();
		
    // Display the overlay (fade or not?)
	if(fading) {
		$('<div id="lBG-overlay"></div>')
		.css('opacity', '0')
		.animate({'opacity' : '0.9'})
		.appendTo('body');
	} else {
		$('<div id="lBG-overlay"></div>')
		.css('opacity', '0.9')
		.appendTo('body');
	}
    
    // Create the lightbox container and hide it
    $('<div id="lBG-lightbox"></div>')
    .hide()
    .appendTo('body');
    
    // Display the image on load
    $('<img>')
    .attr('src', $(this).attr('src'))
    .css({
      'max-height': windowHeight, 
      'max-width':  windowWidth
    })
    .load(function() { //Load image when it's ready
      $('#lBG-lightbox') // center image and fade it in
        .css({  //center image
          'top':  (windowHeight - $('#lBG-lightbox').height()) / 2,
          'left': (windowWidth  - $('#lBG-lightbox').width())  / 2
        })
        .fadeIn('slow');
		
		$('#lBG-overlay').css('background-image', 'none'); //remove loading image
		
    })
    .appendTo('#lBG-lightbox');
	
	if(imgTitle) {
	  // Display the title of the image
	  $('<div id="lBG-title-wrapper"></div>')
      .hide()
	  .appendTo('#lBG-lightbox');

      $('<p id="lBG-title"></p>')
      .appendTo('#lBG-title-wrapper')
      document.getElementById("lBG-title").innerHTML = imgTitle;
	}
	
	//show extra info on hover
	$('#lBG-lightbox').hover(function() {
		$('#lBG-arrow-left, #lBG-arrow-right')
		.css('opacity', '0.5');
		
		$('#lBG-title-wrapper')
		.animate({width:'toggle'},300)
    },
	function() {
		$('#lBG-arrow-left, #lBG-arrow-right')
		.css('opacity', '0');
		
		$('#lBG-title-wrapper')
		.animate({width:'toggle'},300)
	});
	
    // Remove it all on click (overlay and image).
    $('#lBG-overlay, #lBG-lightbox').click(function() {
      $('#lBG-overlay, #lBG-lightbox')
	  .fadeOut('slow', function() {
		$(this).remove();
		});
    });
	
	// Remove it all by pressing the escape key
	$(document).keydown(function(e) {

	  if(e.keyCode == 27) {
		$('#lBG-overlay, #lBG-lightbox')
	    .fadeOut('slow', function() {
		  $(this).remove();
		});
	  }
	});
	
	return this;
	
  };
  
  
  /**
   * ----------
   * Gallery-function - Display pictures in a gallery
   * ----------
   */
  $.fn.lBGgallery = function(params) {
    
	  
	// Initializing variables
	var liItems = $(this).children(), //all li elements (child to ul)
	imgItems = liItems.children(), //all img elements (child to li)
	imgCount = liItems.size(), //number of li elements and also the number of images in this case
	options = $.extend({ // extend
      'width': 200,
      'height': 200
    }, params),
	imgWidth = options.width,
	imgHeight = options.height;
	
	// Set the width and the height of the images
	imgItems.css({
	  'width': imgWidth + 'px',
	  'height': imgHeight + 'px'
	});
	
	// Load gallery item on click
	imgItems.click(function() {
	  //save the index of the clicked item
	  var imgId = $(this).parent().index();
	  
	  //load the selected image
	  loadImg($(this), imgId);
	});
	
	
	/**
	 * Display the selected image
	 */
	function loadImg(img, imgId) {
	    //show image with the lightbox-plug
	    img.lBGlightbox();
	  
	    //create/show navigation
	    createNavitagion(imgId); 
	}
	
	/**
	 * Create the navigation arrows
	 */
	function createNavitagion(imgId) {
	  var prevImg,
	    nextImg,
		navHeight = 50,
		navMiddle = ($('#lBG-lightbox').height() - navHeight) / 2;
	  
	  //create left nav-arrow only if imgId is not 0
	  if(imgId !== 0) {
		//prev image
		prevImg = $(liItems).eq(imgId - 1).children();
		
		//create left nav-arrow
		$('<div id="lBG-arrow-left"></div>')
          .appendTo('#lBG-lightbox')
          .css({left: '0px', top: navMiddle})
          .click(function() { //load prev image on click
            loadImg(prevImg, imgId - 1);
          });
		  
		$('<div id="lBG-arrow-left-icon"></div>')
          .appendTo('#lBG-arrow-left');
		  
	  } else {
		//last image
		prevImg = $(liItems).eq(imgCount-1).children();
		
		//create left nav-arrow
		$('<div id="lBG-arrow-left"></div>')
          .appendTo('#lBG-lightbox')
          .css({left: '0px', top: navMiddle})
          .click(function() { //load prev image on click
            loadImg(prevImg, imgCount-1);
          });
		  
		$('<div id="lBG-arrow-left-icon"></div>')
          .appendTo('#lBG-arrow-left');
	  }
	  
	  
	  
	  //create right nav-arrow 
	  if(imgId+1 < imgCount) {
		//next image
		nextImg = $(liItems).eq(imgId + 1).children();
		
		//create right nav-arrow
		$('<div id="lBG-arrow-right"></div>')
          .appendTo('#lBG-lightbox')
          .css({right: '0px', top: navMiddle})
          .click(function() { //load next image on click
            loadImg(nextImg, imgId + 1);
          });
		  
		$('<div id="lBG-arrow-right-icon"></div>')
          .appendTo('#lBG-arrow-right');
	  } else {
		//next image
		nextImg = $(liItems).eq(0).children();
		
		//create right nav-arrow
		$('<div id="lBG-arrow-right"></div>')
          .appendTo('#lBG-lightbox')
          .css({right: '0px', top: navMiddle})
          .click(function() { //load next image on click
            loadImg(nextImg, 0);
          });
		  
		$('<div id="lBG-arrow-right-icon"></div>')
          .appendTo('#lBG-arrow-right');
	  }
	   
	}

	return this;
	
  }; 
  
})(jQuery);

 

