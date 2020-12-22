let w = 30;
let cells = [];
let stack = [];
let fIter = true;
let current = null;

function setup() {
  createCanvas(600, 600);
  for (let r = 0; r < height / w; r++) {
    for (var c = 0; c < width / w; c++) {
      cells.push(new Cell(r, c));
    }
  }
  current = cells[0];
  current.visited = true;
}

function draw() {
  background(51);

  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }

  if (fIter || stack.length != 0) {
    fill(255, 100, 200, 150);
    noStroke();
    rect(current.column * w, current.row * w, w, w);
    fIter = false;
  }
  console.log(current);

  let next = current.randomUnvisitedAdjacentWall();

  if (next) {
    next.visited = true;
    stack.push(current);
    removeWall(current, next);
    current = next;
  } else if (stack.length != 0) {
    current = stack.pop();
  } else {
    saveCanvas("maze", "jpg");
    noLoop();
  }
}

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
