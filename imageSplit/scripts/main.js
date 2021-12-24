// load
window.addEventListener('DOMContentLoaded', function () {
  const blockEffects = [blockTranslate, blockFade];

  let isDivided = [false, false];
  let gridOptions = [];
  let blockElem = [];

  const forms = document.forms;
  const images = document.images;

  Array.prototype.forEach.call(images, (image) => {
    // image.src = image.src + '?random=' + (new Date()).getTime();
    image.onerror = function () {
      console.error("Ошибка " + image.src)
    };

    // image.onload = function(e) {
    let imgHeight = image.naturalHeight;
    let imgWidth = image.naturalWidth;
    image.parentElement.parentElement.style.width = imgWidth + 40 + 'px';

    image.style.width = imgWidth + 'px';
    // image.style.height = imgHeight + 'px';
    // };
  });

  document.querySelectorAll('.img-container').forEach((item, index) => {
    // touchstart
    item.addEventListener('click', (event) => {
      switch (event.target.dataset.btn) {
        case 'split':
          event.preventDefault();
          console.log(event.target.dataset.btn);
          gridOptions[index] = getDataForm(forms[index]);

          if (!isDivided[index]) {
            blockElem[index] = divide(images[index], {
              'x': gridOptions[index].x,
              'y': gridOptions[index].y
            });

            blockEffects[index](images[index], blockElem[index]);

            item.querySelector('.mix').style.visibility = 'visible';
            item.querySelector('.sort').style.visibility = 'visible';
            isDivided[index] = true;
          } else {
            item.querySelectorAll('.blocks').forEach((block) => {
              block.remove();
            });

            images[index].classList.remove('hidden-to');
            images[index].classList.add('fade-in');
            item.querySelector('.mix').style.visibility = '';
            item.querySelector('.sort').style.visibility = '';
            isDivided[index] = false;
          }
          break;
        case 'mix':
          console.log(event.target.dataset.btn);
          shuffleArrayES6(item.querySelectorAll('.blocks'));
          break;
        case 'sort':
          console.log(event.target.dataset.btn);
          sort(item.querySelectorAll('.blocks'), gridOptions[index].x, gridOptions[index].y);
          break;
        default:
          console.log(event.target.dataset.btn);
          break;
      }
    });
  });
});

// Functions
function getDataForm(form) {
  x = parseInt(form.x.value);
  y = parseInt(form.y.value);
  if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0 || (x * y) > 5000) {
    return {x: 4, y: 4}
  }
  return {x, y};
}

function blockTranslate(image, blockElem) {
  let blocksFragment = document.createDocumentFragment();

  for (const block of blockElem) {
    block.addEventListener('mouseenter', (e) => {
      block.style.transitionDelay = '';
      block.style.transitionDuration = '';
      block.classList.remove('translateLeave');
      block.classList.add('translateEnter');
    });
    block.addEventListener('mouseleave', (e) => {
      block.classList.remove('translateEnter');
      block.classList.add('translateLeave');
    });
    blocksFragment.appendChild(block);
  }

  image.parentElement.appendChild(blocksFragment);
  image.classList.remove('fade-in');
  image.classList.add('hidden-to');
}

function blockFade(image, blockElem) {
  let blocksFragment = document.createDocumentFragment();

  for (const block of blockElem) {
    block.addEventListener('mouseenter', (e) => {
      block.style.transitionDelay = '';
      block.style.transitionDuration = '';
      block.classList.remove('fade-in');
      block.classList.add('fade-out');
    });
    block.addEventListener('mouseleave', (e) => {
      block.classList.remove('fade-out');
      block.classList.add('fade-in');
    });
    block.classList.add('borderRadius');
    blocksFragment.appendChild(block);
  }

  image.parentElement.appendChild(blocksFragment);
  image.classList.remove('fade-in');
  image.classList.add('hidden-to');
}

function shuffleArrayES6(blocks) {
  // let arrayShuffle = array.slice();
  let blockId = 0;
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  for (let i = blocks.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
    blocks[i].style.transitionDelay = `${4 * blockId++}ms`;
    blocks[i].style.transitionDuration = '600ms';
    [blocks[i].style.top, blocks[j].style.top] = [blocks[j].style.top, blocks[i].style.top];
    [blocks[i].style.left, blocks[j].style.left] = [blocks[j].style.left, blocks[i].style.left];
  }
  // return arrayShuffle;
}

function sort(blocks, x, y) {
  let blockId = 0;
  let blockHeight = parseInt(blocks[0].style.height);
  let blockWidth = parseInt(blocks[0].style.width);

  //t makes an influens on the time, wich it takes to animate the event. The more elements we have the less time takes an nimation.
  let t = 40;
  if ((x * y) < 60) {
    t = 40;
  } else if ((x * y) < 120) {
    t = 12;
  } else if ((x * y) < 280) {
    t = 8;
  } else if ((x * y) < 420) {
    t = 6;
  } else if ((x * y) < 620) {
    t = 4;
  } else if ((x * y) < 1200) {
    t = 1;
  } else {
    t = 0.2;
  }

  for (var i = 0; i < y; i++) {
    for (var j = 0; j < x; j++) {
      let block = blocks[blockId];

      block.style.transitionDelay = `${t * blockId++}ms`;
      block.style.transitionDuration = '1400ms';
      block.style.top = (blockHeight * i) + 'px';
      block.style.left = (blockWidth * j) + 'px';
    }
  }
}