let c1, c2; //placeholder for the clocks
let center; 
let noiseOffset = 0;
let maxLength;

function setup(){
  //createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);

  center = createVector(width/2, height/2);
  let smallerSide = width>height ? height : width;

  maxLength = smallerSide / 3;
  c1 = new Clock(center, 100, 0, 0.01, 1);
  c2 = new Clock(c1.location, 100, 0, 0.01, 1);
  
  background(0);
}

function draw(){
  //background(220);
  fill(0, 10);
  rect(0, 0, width, height);
  // ellipse(width/2, height/2, 200, 200);
  let noise1 = noise(noiseOffset);

  let l = maxLength * noise1;
  c1.len = l;
  c1.speed = noise1/20;// * -1;
  c1.update();
  c1.render();

  let noise2 = noise(noiseOffset + 10000);
  l = maxLength * noise2;
  c2.len = l;
  c2.speed = noise2/20;// * -1;
  c2.origin = c1.location;
  c2.update();
  c2.render();
   
  // line(center.x, center.y, c1.location.x, c1.location.y);
  // line(c1.location.x, c1.location.y, c2.location.x, c2.location.y);

  fill(255);
  noStroke();
  ellipse(c2.location.x, c2.location.y, 20, 20);

  noiseOffset += 0.01;
}

function Clock(o, l, a, s, d) {
  this.len = l;
  this.origin = o;
  this.angle = a;
  this.speed = s;
  this.dir = d;
   
   

  this.location = createVector();
  this.update();
}

Clock.prototype.update = function () {
  this.angle += this.speed * this.dir;
  this.location.x = cos(this.angle);
  this.location.y = sin(this.angle);

  this.location.mult(this.len);
  this.location.add(this.origin);
}

Clock.prototype.render = function(){
  ellipse(this.location.x, this.location.y, 2, 2)
}





