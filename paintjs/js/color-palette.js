/**
 * Creates a color bar, which allows you to choose the color.
 * element: HTML element, container for color bar
 * colors: array of objects (r, g, b) original colors
 */
class ColorPalette {
  constructor({element, colors = [], defaultColor}) {
    this.element = element;
    // array of HTML element
    this.colorElements = [];

    this.colors = colors;
    this.currentColor = defaultColor;

    this.init();
  }

  init() {
    this.element.addEventListener('click', this.handleColorSelected.bind(this));

    for (let color of this.colors) {
      this.addColorElement(color);
    }
  }

  handleColorSelected({target}) {
    if (target.tagName === 'LI') {
      this.currentColor = target.style.backgroundColor;

      for (let colorElement of this.colorElements) {
        colorElement.classList.remove('selected');
      }

      target.classList.add('selected');
    }
  }

  // adds a new color to the color bar
  addColor(color) {
    this.addColorElement(color);
  }

  addColorElement(color) {
    let li = document.createElement('li');
    li.className = 'color-palette__color';
    li.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
    this.element.appendChild(li);
    this.colorElements.push(li);
  }
}
