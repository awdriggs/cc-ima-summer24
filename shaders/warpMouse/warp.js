//warp filter shader
//example from https://p5js.org/tutorials/intro-to-shaders/
let video;
let warp;

let warpSrc = `
precision highp float;

uniform sampler2D tex0;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vTexCoord;

void main() {
  // Offset the input coordinate
  vec2 n_mouse = u_mouse/u_resolution;
  vec2 warpedCoord = vTexCoord;
  // warpedCoord.x += 0.05 * sin(vTexCoord.y * 10.0);
  // warpedCoord.y += 0.05 * sin(vTexCoord.x * 10.0);

  //weird cells
  // warpedCoord.x += sin(vTexCoord.y * 10.0);
  // warpedCoord.y += sin(vTexCoord.x * 10.0);

//mouse sin't really working here!
  warpedCoord.x += u_mouse.y  * sin(vTexCoord.y * 10.0);
  warpedCoord.y += u_mouse.x * vTexCoord.x;

  // Set the new color by looking up the warped coordinate
  gl_FragColor = texture2D(tex0, warpedCoord);
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
