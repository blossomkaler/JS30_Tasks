const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');            //returns a drawing context on the canvas
/* canvas.width = window.innerWidth;               //read-only property that returns the interior height of the window in pixels
canvas.height = window.innerHeight; */
ctx.strokeStyle = '#BADA55';                    //specifies the color, gradient, or pattern to use for the strokes 
ctx.lineJoin = 'round';                         //determines the shape used to join two line segments where they meet
ctx.lineCap = 'round';
ctx.lineWidth = 80;
// ctx.globalCompositeOperation = 'multiply';   //specifies blending mode operations to be used

let isDrawing = false;                       
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;                           //flag to control line width

function draw(e) {
  if (!isDrawing) return;                        // stop the fn from running when they are not moused down
  console.log(e);

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();                              //begins a path, or resets the current path
  ctx.moveTo(lastX, lastY);                     //begins a new sub-path at the point specified
  ctx.lineTo(e.offsetX, e.offsetY);             //adds a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
  ctx.stroke();                                 //outlines the current or given path with the current stroke style

  [lastX, lastY] = [e.offsetX, e.offsetY];      //offsetX property returns the relative horizontal coordinate of the mouse pointer when a mouse event occurs

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 80 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);