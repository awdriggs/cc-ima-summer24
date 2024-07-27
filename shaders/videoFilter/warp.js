//warp filter shader applied to video
//example from https://p5js.org/tutorials/intro-to-shaders/
let warp;

// Set the video capture as a global variable.
let capture;

let warpSrc = `
precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // Offset the input coordinate
  vec2 warpedCoord = vTexCoord;
  warpedCoord.x += 0.05 * sin(vTexCoord.y * 10.0);
  warpedCoord.y += 0.05 * sin(vTexCoord.x * 10.0);

  // Set the new color by looking up the warped coordinate
  gl_FragColor = texture2D(tex0, warpedCoord);
}
`;

function setup() {
  createCanvas(720, 400, WEBGL);

  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); //hide the video input and show the filtered shader instead
  warp = createFilterShader(warpSrc);
  
  describe('A warped video of a city crosswalk');
}

function draw() {
  background(255);
  push();
  imageMode(CENTER);
  image(capture, 0, 0, width, height);
  pop();
  filter(warp);
}
