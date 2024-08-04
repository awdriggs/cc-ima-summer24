//example from https://p5js.org/tutorials/intro-to-shaders/

let video;
let bw;

let bwSrc = `
precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

void main() {
  // Get the original color for this pixel
  vec4 color = texture2D(tex0, vTexCoord);

  // Make it black and white by replacing all channels with blue
  //make it b/w
  //color.r = color.b;
  //color.g = color.g; 

  //average the colors together! looks faded out
  color.r = (color.b + color.r + color.g) / 3.0;
  color.g = (color.b + color.r + color.g) / 3.0;
  color.b = (color.b + color.r + color.g) / 3.0;

  // Set the new color
  gl_FragColor = color;
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
  
  bw = createFilterShader(bwSrc);
  
  describe('A video of a city crosswalk in black and white');
}

function draw() {
  background(255);
  push();
  imageMode(CENTER);
  image(video, 0, 0, width, height, 0, 0, video.width, video.height, COVER);
  pop();
  filter(bw);
}
