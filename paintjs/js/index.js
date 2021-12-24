new App({
  canvas: document.querySelector('#canvas'),
  colorPalette: new ColorPalette({
    element: document.querySelector('#color-palette'),
    colors: [
      {red: 252, green: 76, blue: 79},
      {red: 79, green: 163, blue: 252},
      {red: 255, green: 255, blue: 0},
      {red: 173, green: 255, blue: 47}, // greenyellow
    ],
    defaultColor: 'black'
  }),
  colorPicker: new ColorPicker({
    element: document.querySelector('#color-picker')
  })
});

// const modal = document.querySelector('#color-picker');
// window.onclick = ({target}) => {
//   if (target == modal) {
//     modal.style.display = "none";
//   }
// };