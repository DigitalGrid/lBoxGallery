lBox Gallery
====================

lBox Gallery is a jQuery plugin that allows you to view larger versions of your images with a stylish lightbox effect. You can can also use lBox Gallery as a gallery combined with the lightbox functionality. The gallery functionality allows you to quickly browse  through a list of images. It is a lightweight yet powerful plugin that requires minimal effort to install.

How to install
--------------------

* Get the latest version of lBox Gallery and include all files from lBox Gallery to your own project

* Include the CSS file in the head-section:

```sh
<link rel="stylesheet" type="text/css" href="lBoxGallery.css"> 
```

* Include lBoxGallery.js after loading jQuery:

```sh
<script src="jquery.lBoxGallery.js"></script>
```

### Install Lightbox ###

* add the class lBG-lightbox to your img-tags like this for example:

```sh
<img class='lBG-lightbox' src='img/abstract-q-c-640-640-1.jpg' width='200px' /> 
```

** Note: ** You will have to specify width or height for the image to acquire the satisfied size, if you don't you will get the full image size

* If you want to group more than one image you can add these images inside a div with the class lBG-lightbox-set like this:

```sh
<div class='lBG-lightbox-set'>
	<img class='lBG-lightbox' src='img/abstract-q-c-640-640-1.jpg' width='200px' title='title 1'/>
	<img class='lBG-lightbox' src='img/abstract-q-c-640-640-2.jpg' width='200px' title='title 2'/>
	<img class='lBG-lightbox' src='img/abstract-q-c-640-640-3.jpg' width='200px' title='title 3'/>
	<img class='lBG-lightbox' src='img/abstract-q-c-640-640-4.jpg' width='200px' title='title 4'/>
</div>
```

* Now almost everything is set you only have to include this code into your script to get things spinning

```sh
$('img.lBG-lightbox').click(function() {
  $(this).lBGlightbox({
    'fade': true
  });
});
```

#### Example ####

* Check out the example-page here to see how the Lightbox should look like: http://www.student.bth.se/~chja15/javascript/project/plugin-lBoxGallery/#lightbox-example

### Install Gallery ###

* To use the gallery function you have to include this code:

```sh
<div class='lBG-gallery-set'>
    <ul id="lBG-gallery">
        <li><img src='img/nature-q-c-640-640-1.jpg' title='title 1'></li>
        <li><img src='img/nature-q-c-640-640-2.jpg' title='title 2'></li>
        <li><img src='img/nature-q-c-640-640-3.jpg' title='title 3'></li>
        <li><img src='img/nature-q-c-640-640-4.jpg' title='title 4'></li>
    </ul>
</div>
```

* To get things spinning you also have to include this code:

```sh
$('#lBG-gallery').lBGgallery({
  'width': 200,
  'height': 200
});
```

#### Example ####

* Check out the example-page here to see how the Gallery should look like: http://www.student.bth.se/~chja15/javascript/project/plugin-lBoxGallery/#gallery-example

