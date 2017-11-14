class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(point) {
    let newPoint = new Point(point.x + this.x, point.y + this.y);
    return newPoint;
  }
}
let total = new Point(7, 9);
let total2 = new Point(1, 1);

total.plus(total2);
