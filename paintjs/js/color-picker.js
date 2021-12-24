/** 
 * Interacts with the color picker panel
 * Lets you add a color to the color bar
 * element: HTML element, container for color picker panel
*/
class ColorPicker {
  constructor({element}) {
    this.element = element;
    this.previewElement = null;

    this.color ={
      red: 0,
      green: 0,
      blue: 0
    };

    this.onAdd = () => {};

    this.init();
  }

  init() {
    this.previewElement = this.element.querySelector('.color-picker__preview');
    // this.setPreviewBackground(this.color);
    this.reset();

    this.element.querySelectorAll('.color-picker__slider')
      .forEach(slider => slider.addEventListener('input', this.handleChange.bind(this)));

    this.element.querySelector('.color-picker__add-button')
      .addEventListener('click', this.handleAdd.bind(this));

    this.element.querySelectorAll('.color-picker__close-button, .modal-close').forEach(elem => {
      elem.addEventListener('click', this.handleClose.bind(this));
    });
  }

  handleAdd() {
    this.onAdd(this.color);
    this.reset();
    this.close();
  }

  handleClose() {
    this.reset();
    this.close();
  }

  handleChange({target}) {
    this.color[target.id] = Number(target.value);
    target.previousElementSibling.innerHTML = this.color[target.id];

    this.setPreviewBackground(this.color);
  }

  setPreviewBackground(color) {
    this.previewElement.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
  }

  reset() {
    this.color = {
      red: 0,
      green: 0,
      blue: 0
    };

    this.setPreviewBackground(this.color);

    this.element.querySelectorAll('.color-picker__slider')
      .forEach(slider => slider.previousElementSibling.innerHTML = slider.value = 0);
  }

  open() {
    this.element.style.display = 'block';

		window.onclick = ({target}) => {
			if (target == this.element) {
				this.handleClose();
			}
		}
  }

  close() {
    this.element.style.display = 'none';
  }
}
