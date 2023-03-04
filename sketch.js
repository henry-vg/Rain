const numDrops = 700,
  drops = [],
  wRatio = 0.125,
  vRatio = 1.2,
  hInterval = [5, 25];

let angle = 5,
  toScaleX = 1,
  toScaleY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  noFill();
  stroke(140, 45, 225);

  if (angle < 0) {
    angle += 360 * (abs(floor(angle / 360)) + 1);
  }

  angle %= 360;

  if (angle > 90 && angle <= 180) {
    toScaleY *= -1;
    angle = 180 - angle;
  }
  else if (angle > 180 && angle <= 270) {
    toScaleY *= -1;
    toScaleX *= -1;
    angle = (180 + angle) % 360;
  }
  else if (angle > 270 && angle <= 360) {
    toScaleX *= -1;
    angle = 360 - angle;
  }

  for (let i = 0; i < numDrops; i++) {
    drops.push(new dropObject());
    drops[i].generate();
  }
}

function draw() {
  background(230, 230, 250);

  if (toScaleY == -1) {
    translate(0, height);
  }
  if (toScaleX == -1) {
    translate(width, 0);
  }
  scale(toScaleX, toScaleY);

  for (let i = 0; i < numDrops; i++) {
    drops[i].show();
    drops[i].x += drops[i].v * sin(angle);
    drops[i].y += drops[i].v * cos(angle);
    if (drops[i].x > width + drops[i].h * sin(angle) || drops[i].y > height + drops[i].h * cos(angle)) {
      drops[i].generate();
    }
  }
}

function dropObject() {
  this.show = function () {
    strokeWeight(this.h * wRatio);
    line(this.x, this.y, this.x + this.h * sin(angle), this.y + this.h * cos(angle));
  }
  this.generate = function () {
    this.h = random(hInterval[0], hInterval[1]);
    this.v = this.h * vRatio;
    if (this.x) {
      const xRand = random(-height * tan(angle), width - this.h * sin(angle));
      this.x = (xRand < 0) ? -this.h * sin(angle) : xRand;
      this.y = (this.x < 0) ? random(height - this.h * cos(angle)) : -this.h * cos(angle);
    }
    else {
      this.x = random(width - this.h * sin(angle));
      this.y = random(height - this.h * cos(angle));
    }
  }
}