/** 
 * canvas: HTML element, canvas
 * colorPicker: Object class ColorPicker
 * colorPalette: Object class ColorPalette
*/
class App {
  constructor({canvas, colorPicker, colorPalette}) {
    this.canvas = canvas;
    this.colorPicker = colorPicker;
    this.colorPalette = colorPalette;

    this.context = null;
    this.isDrawing = false;

    this.init();
  }

  init() {
    this.context = this.canvas.getContext('2d');

    this.canvas.width = parseInt(getComputedStyle(this.canvas).width);
    this.canvas.height = parseInt(getComputedStyle(this.canvas).height);

    this.rectCanvas  = this.canvas.getBoundingClientRect();
    document.querySelector('span.brush-size').innerHTML = this.context.lineWidth;

    this.canvas.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMousemove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseup.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseleave.bind(this));

    this.colorPicker.onAdd = color => this.colorPalette.addColor(color);

    document.querySelector('#clear-canvas-button')
      .addEventListener('click', this.handleCanvasClear.bind(this));
    document.querySelector('#brush-size-slider')
      .addEventListener('input', this.handleBrushSizeChange.bind(this));
      document.querySelector('#new-color-button')
        .addEventListener('click', this.handleNewColorButton.bind(this));
  }

  handleMousedown(event) {
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(event.clientX - this.rectCanvas.left, event.clientY - this.rectCanvas.top);
    this.context.strokeStyle = this.colorPalette.currentColor;
    this.context.fillStyle = this.colorPalette.currentColor;
  }

  handleMousemove(event) {
    if (this.isDrawing) {
      this.context.lineTo(event.clientX - this.rectCanvas.left, event.clientY - this.rectCanvas.top);
      this.context.stroke();
      
      // make the line smooth
      this.context.beginPath();
      this.context.arc(event.clientX - this.rectCanvas.left, event.clientY - this.rectCanvas.top, this.radius, 0, Math.PI * 2);
      this.context.fill();

      this.context.beginPath();
      this.context.moveTo(event.clientX - this.rectCanvas.left, event.clientY - this.rectCanvas.top);

    }
  }

  handleMouseup(event) {
    this.isDrawing = false;
  }

  handleMouseleave(event) {
    // this.isDrawing = false;
  }

  handleCanvasClear(event) {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleBrushSizeChange(event) {
    this.context.lineWidth = Number(event.target.value);
    this.radius = this.context.lineWidth / 2;
    
    document.querySelector('span.brush-size').innerHTML = this.context.lineWidth;
  }

  handleNewColorButton(event) {
    this.colorPicker.open();
  }
}
