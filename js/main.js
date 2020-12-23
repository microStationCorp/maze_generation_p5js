let w = 30;
let cells = [];
let stack = [];
let fIter = true;
let current = null;

function setup() {
  createCanvas(600, 600);
  //atfirst create all cells
  for (let r = 0; r < height / w; r++) {
    for (var c = 0; c < width / w; c++) {
      cells.push(new Cell(r, c));
    }
  }
  current = cells[0];
  //initially first cell marked as true
  current.visited = true;
}

function draw() {
  background(51);

  //draw all cells
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }

  if (fIter || stack.length != 0) {
    fill(255, 100, 200, 150);
    noStroke();
    rect(current.column * w, current.row * w, w, w);
    fIter = false;
  }

  //get the next random cell for visit
  let next = current.randomUnvisitedAdjacentWall();

  //if next is valid then run it
  if (next) {
    //next will marked as visited
    next.visited = true;
    //current cell pushed to stack
    stack.push(current);
    //remove wall between current and next cell
    removeWall(current, next);
    //next cell is now current cell
    current = next;
  } else if (stack.length != 0) {
    //if there is no adjacent valid cell then marker wiil go backward and previous visited cell will be current cell
    current = stack.pop();
  } else {
    //if cell is completed the canvas will be save and loop will be stopped
    saveCanvas("maze", "jpg");
    noLoop();
  }
}

//function for remove wall between current and next cell
function removeWall(cur, next) {
  let x = cur.row - next.row;
  if (x > 0) {
    cur.wall[0] = false;
    next.wall[2] = false;
  } else if (x < 0) {
    cur.wall[2] = false;
    next.wall[0] = false;
  }
  let y = cur.column - next.column;
  if (y > 0) {
    cur.wall[3] = false;
    next.wall[1] = false;
  } else if (y < 0) {
    cur.wall[1] = false;
    next.wall[3] = false;
  }
}
