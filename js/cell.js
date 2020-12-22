function Cell(row, column) {
  this.row = row;
  this.column = column;
  this.visited = false;
  this.wall = [true, true, true, true];

  this.randomUnvisitedAdjacentWall = () => {
    let adjacent = [];
    if (!this.isCellVisited(this.row - 1, this.column)) {
      adjacent.push(cells[(this.row - 1) * (height / w) + this.column]);
    }
    if (!this.isCellVisited(this.row, this.column + 1)) {
      adjacent.push(cells[this.row * (height / w) + (this.column + 1)]);
    }
    if (!this.isCellVisited(this.row + 1, this.column)) {
      adjacent.push(cells[(this.row + 1) * (height / w) + this.column]);
    }
    if (!this.isCellVisited(this.row, this.column - 1)) {
      adjacent.push(cells[this.row * (height / w) + (this.column - 1)]);
    }

    if (adjacent.length != 0) {
      return adjacent[Math.floor(random(adjacent.length))];
    }
  };

  this.isCellVisited = (r, c) => {
    if (r < 0 || c < 0 || r == height / w || c == width / w) {
      return true;
    } else {
      return cells[r * (height / w) + c].visited;
    }
  };

  this.show = () => {
    if (!this.visited) {
      stroke(255);
      strokeWeight(1);
    } else {
      stroke(255, 200, 100);
      strokeWeight(2);
    }

    if (this.wall[0]) {
      line(this.column * w, this.row * w, this.column * w + w, this.row * w);
    }
    if (this.wall[1]) {
      line(
        this.column * w + w,
        this.row * w,
        this.column * w + w,
        this.row * w + w
      );
    }
    if (this.wall[2]) {
      line(
        this.column * w,
        this.row * w + w,
        this.column * w + w,
        this.row * w + w
      );
    }
    if (this.wall[3]) {
      line(this.column * w, this.row * w, this.column * w, this.row * w + w);
    }
  };
}
