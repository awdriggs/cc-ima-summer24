// camera state, wil reset to this.
let state = {
  distance: 100, // scalar
  center: [0, 0, -100], // vector
  rotation: [1, 0, 0, 0], // quaternion
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ec = createEasyCam();
  ec.setState(state, 1000); // animate to state in 1 second
  ec.state_reset = state; // state to use on reset

  //noLoop();
}

function draw() {
  background(220);
  let u, v;
  for (v = 0; v <= PI; v += 0.1) {
    let points = [];
    for (u = 0; u <= TWO_PI; u += 0.1) {
      let x = cos(v) * 100;
      let y = (u + u * (sin(v) * sin(u))) * 100;
      let z = sin(v) * cos(u) * 100;
      
      //cylinder
      // x = cos(u) * 100;
      // y = sin(u) * 100;
      // z = v * 100;

      point(x, y, z);
      //line(x,y,z, 0, 0, 0)
    }
  }
}

// { (u,v) | 0 ≤ u ≥ 2π, 0 ≤ v ≥ π }

// x = cos(v)
// y = u+u(sin(v)sin(u))
// z  = sin(v)cos(u)

