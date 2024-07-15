 global variables
let gridSize, numCols, numRows;
let debug = true;
let cells = []; //empty array, will get filled with images
let originalImage, c;
let scale
let bg; //background

//handpose bizness
let handPose;
let video;
let hands = [];

//detecting movement
let prev;

//preload image
function preload() {
  originalImage = loadImage('./sp.png');
  handPose = ml5.handPose({flipped: true});
}

function setup(){
  createCanvas(600, 600);

  numCols = 4;
  numRows = 4;
  gridSize = width/numCols;
  print("gridSize", gridSize);
  print(originalImage.width);

  image(originalImage, 0, 0, width, height); //paint the image once

  c = get(); //get the canvas pixels, now the image is scaled to the canvas

  if(debug) print(c);

  //scramble the image
  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      updateCell([i,j]);
    }
  }

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

}

function draw() {

  if(hands.length > 0 && prev){ //hands exists and so does prev
    let current = hands[0].index_finger_tip; //only worry about one hand

    if(debug){
      ellipse(hands[0].index_finger_tip.x, hands[0].index_finger_tip.y, 20, 20)
      fill(255, 0, 0);
    }

    let distance = dist(current.x, current.y, prev.x, prev.y);

    //trigger an update
    if(distance > 10){
      moveEvent(current);
    }
  }

  if(debug) drawGrid();

  if(hands.length > 0){ //set the first hand gesture point
    prev = hands[0].index_finger_tip
  }
}

//take in a col/row coordinate
//return an array of images
function splitCell(coord) {

  let x = coord[0] * gridSize;
  let y = coord[1] * gridSize;

  //grab a subimage from the canvas at x,y
  let cellImage = c.get(x,y, gridSize, gridSize);

  let xScale = gridSize / numCols;
  let yScale = gridSize / numRows;

  // image(cellImage, 30, 30);
  let cell = [];

  for(let i = 0; i < numRows; i++){
    let cy = i * yScale;

    for(let j = 0; j < numCols; j++){
      let cx = j * xScale;
      cell.push(cellImage.get(cx, cy, xScale, yScale));
    }
  }

  if(debug) print("split", cell);

  return cell
}


//primarily for testing
function drawGrid() {
  stroke(255, 16, 240);
  for(let i = 0; i <= numRows; i++){
    let y = i * gridSize;

    for(let j = 0; j <= numCols; j++){

      let x = j * gridSize;

      line(x , 0, x, height); //vertical line
    }
    line(0, y, width, y);
  }
}

//helper function, find which cell a x/y location is in
function getCoordinate(x, y) {
  let c = floor(x/gridSize);
  let r = floor(y/gridSize);

  return [c,r];
}

//make it iteractive
//when clicked, see which cell has been clicked, update that cell
function mousePressed(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    let cellCord = getCoordinate(mouseX, mouseY);
    updateCell(cellCord);

    if(debug) print(cellCord);
  }
}

function moveEvent(current){
  let cellCoord = getCoordinate(current.x, current.y)
  updateCell(cellCoord);

  if(debug) print(cellCoord);
}

//main flow function, take a coordinate and manipulate the image
function updateCell(coord) {
  let cell = splitCell(coord);
  cell = shuffle(cell);
  drawCell(cell, coord);
}

//paint a cell to the screen
function drawCell(cellArray, coordArray) {
  let x = coordArray[0] * gridSize;
  let y = coordArray[1] * gridSize;
  let count = 0;

  for(let i = 0; i < cellArray.length; i++){

    let thumb = cellArray[i];
    image(thumb, x, y);

    x += thumb.width; //march horiziontal

    count++; //

    if(count % numCols == 0){ //wrap
      y += thumb.height; //move down
      x = coordArray[0] * gridSize; //reset x to original x location
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

