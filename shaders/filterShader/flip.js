//warp filter shader
//example from https://p5js.org/tutorials/intro-to-shaders/
let video;
let warp;

let warpSrc = `
precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // Offset the input coordinate
  vec2 flippedCoord = vTexCoord;

  //flip both x and y 
  flippedCoord.x = vTexCoord.x * -1.0 + 1.0;
  flippedCoord.y = vTexCoord.y * -1.0 + 1.0;

  // Set the new color by looking up the warped coordinate
  gl_FragColor = texture2D(tex0, flippedCoord);
}
`;

function setup() {
  createCanvas(200, 200, WEBGL);
  video = createVideo(
    'https://upload.wikimedia.org/wikipedia/commons/d/d2/DiagonalCrosswalkYongeDundas.webm'
  );
  video.volume(0);
  video.hide();
  video.loop();
  
  warp = createFilterShader(warpSrc);
  
  describe('A warped video of a city crosswalk');
}

function draw() {
  background(255);
  push();
  imageMode(CENTER);
  image(video, 0, 0, width, height, 0, 0, video.width, video.height, COVER);
  pop();
  filter(warp);
}
