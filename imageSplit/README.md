# Image Splitter

> The **Splitter** divides an **image** into separate DOM elements that can be **manipulated independently** from each other

****

## How to use it

### divide(image, options, callback);

* ***image:*** image object represents an HTML <img> element.
* ***options = {x, y}:*** where X and Y indicate how many parts we need to divide an image into.
* ***callback(image, blockElem):*** a callback function that takes an image object and a blockElem that is an array of DOM elements of image parts.
