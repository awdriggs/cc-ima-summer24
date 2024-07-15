/*
 * Growth and Decay, awdriggs
 * hold up your hads to touch cells, touching a cell keeps it alive
 * handpose code from ml5js This example demonstrates hand tracking on live video through ml5.handPose.
 */

//hp vars
let handPose;
let video;
let hands = [];

//sketch vars
let organisms = [];
let cellWidth, cellHeight, numRows, numCols;
let debug = false;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({flipped: true}); //go missy
}

function setup() {
  //base canvas size on the windowsize
  createCanvas(windowWidth, windowHeight);

  //calculate cell geometry business
  numCols = 10; //hard coded
  cellWidth = width/numCols;
  cellHeight = cellWidth; //squre
  numRows = floor(height/cellHeight);

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  //create the organisms, save to the organisms array
  seed();
}

function draw() {
  background(0);

  //draw the organisms
  //loop through the organisms, see if the hands are touching
  for(let o of organisms){
    if(o.alive){ //only bother checking if this organism is still alive
      o.update(); //grow or decy depending ont he handpoints
      o.show(); //show the organism
    }
  }

  // Draw the webcam video
  // image(video, 0, 0, width, height);

  //draw points for each hand 
  for(let h of hands){
    fill(255, 0, 255);
    ellipse(h.index_finger_tip.x, h.index_finger_tip.y, 20, 20)
  }

  //display instructions on top of the screen
  //fade after n frames
  if(frameCount < 600){
    directions();
  }
}

function directions(){
  fill(0, 150)
  noStroke();
  rect(40, 40, 460, 100);
  fill(0, 255, 0);

  textSize(30);
  text("Growth / Decay", 50, 80)

  textSize(15);
  text("hold up your hands to touch the cells. touching a cell keeps it alive.", 50, 120);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function seed() {
  //num rows and num cols
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      organisms.push(new Cell(j * cellWidth, i * cellHeight, cellWidth, cellHeight));
    }
  }
}

//Cell Class
function Cell(x, y, w, h) {
  // this.shade = color(random(0, 255), random(0, 255), random(0, 255));
  this.w = w;
  this.h = h;
  this.pos = createVector(x, y);
  this.health = 100.0;
  // this.vel = createVector(random(0, 1), random(-1, 1));
  this.alive = true;
}

Cell.prototype.update= function () {

  //loop through handpoints
  for(let h of hands){


    if(this.check(h.index_finger_tip.x, h.index_finger_tip.y)){
      if(this.health < 100){
        this.health += 10;
      }
    } else {
      this.health -= 0.1;
    }
    // this.pos.add(this.vel);

    if(this.health < 0){
      this.alive = false;
    }
  }
};

Cell.prototype.check = function (x,y) {

  if(x > this.pos.x && x < this.pos.x + this.w && y > this.pos.y && y < this.pos.y + this.h){
    return true;
  } else {
    return false;
  }
}

Cell.prototype.checkHit = function () {
  //loop though the two hand points, see if any are touching this being
}

Cell.prototype.show = function() {
  if(!debug){
    noStroke()
  } else {
    stroke(0)
  };

  fill(0, map(this.health, 0, 100, 0, 255, 0), 0);
  rect(this.pos.x, this.pos.y, this.w, this.h);
}

