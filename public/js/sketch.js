var radius;
var c;

// Prevent scroll lock on iOS
// SOURCE: https://www.npmjs.com/package/body-scroll-lock
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const targetElement = document.querySelector("#disableScroll")

function setup() {
  var cnv = createCanvas(windowWidth/2 + 220, windowHeight/2 + 220);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  // canvas.parent('sketch-holder');

  // createP();

  slider = createSlider(1, 20, 10);
  slider.position(x,115);

  eraser = createCheckbox(' Eraser', false);
  eraser.position(windowWidth/2 - 35, 110);

  clear = createButton("Clear Canvas");
  clear.mousePressed(changeBG);
  clear.position(600,106);

  c = color(0, 0, 0);
  background(255);
  colorMode(RGB)

  // saveCanvas(cnv, './outputSketch/faces', 'jpg');
}

function draw() {
  radius = slider.value();
}

disableBodyScroll(targetElement);

function mouseClicked() {
  if (mouseX > 400) {
    c = get(mouseX, mouseY);
    eraser.checked(false);
  } else  {
    stampRectangle(c);
  }
}

function mouseDragged() {
  if (eraser.checked()){
    stroke(255);
  } else  {
    stroke(c)
  }
  if (mouseX < windowHeight) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  // background(255);
  // setup();
  window.open("sketch.html","_self");
}


function stampRectangle(c)  {
  fill(c)
  noStroke()
  rect(mouseX,mouseY,slider.value(),slider.value())
}

function eraserSwitch() {
 // 
}