/**Image Splitter
 * User: Dmitry
 * Goal: to divide an image  into <div>s to manipulate these divs as separate DOM elements.
 * To define how many blocks of image will be created use x and y settings (options = {x:x, y:y});
 */

function divide(image, options, callback) {
  let blockElem = [];
  let x = parseInt(options.x) || 4;
  let y = parseInt(options.y) || 4;
  
  if ((x * y) <= 0 || (x * y) > 5000) {
    console.error('your X and Y values is not correct or too big. Values are changed to default (4 * 4).');
    x = 4;
    y = 4;
  }

  image.id = image.id || 'img';
    
  //get the height and width of the Image
  // let imgHeight = image.height;
  // let imgWidth = image.width;
  let imgHeight = image.naturalHeight;
  let imgWidth = image.naturalWidth;
  
  //set css properties for parent <div> 
  // image.parentElement.style.width = imgWidth + 'px';
  // image.parentElement.style.height = imgHeight + 'px';

  //get height and width of each block after division the image
  let blockHeight = imgHeight / y;
  let blockWidth = imgWidth / x;

  //create blocks of the images and set css parametres
  let blocks = document.createDocumentFragment();
  let blockId = 0;
  for (var i = 0; i < y; i++) {
    for (var j = 0; j < x; j++) {
      let div = document.createElement('div');
      div.id = `${image.id}-${blockId}`;

      div.style.cssText = (`
        width: ${blockWidth}px;
        height: ${blockHeight}px;
        background: url(${image.src}) ${blockWidth * j * (-1)}px ${blockHeight * i * (-1)}px;
        top: ${blockHeight * i}px;
        left: ${blockWidth * j}px;`);

      div.className = 'blocks';
      blocks.appendChild(div);

      blockElem[blockId++] = div;
    }
  }

  if (callback) {
    callback(image, blockElem);
  }
  return blockElem;
}
