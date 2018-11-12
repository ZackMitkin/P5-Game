const speed = 5;
const ammount = 0.1;

var score = 0;

var rocks = [];
var plane = {};

var gameOver = false;

function setup() {
  plane = { x: windowWidth / 2, y: windowHeight / 1.1, width: 25, height: 50 };
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  fill("red");
  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < ammount * windowWidth; i++) {
    var rock = {
      x: random(0, windowWidth),
      y: random(0, -windowHeight * 2),
      width: random(5, 30),
      height: random(5, 30)
    };
    rocks.push(rock);
  }
  console.log(rocks);
}

function draw() {
  if (gameOver) {
    fill("red");
    textSize(50);
    text("GAME OVER", windowWidth / 2 - 110, windowHeight / 2 - 25);
    textSize(25);
    text("score: " + int(score), windowWidth / 2 - 15, windowHeight / 2 + 25);
  } else {
    clear();

    // draw player
    fill(51);
    rect(plane.x, plane.y, plane.width, plane.height);

    if (keyIsDown(LEFT_ARROW)) {
      plane.x -= speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      plane.x += speed;
    }

    for (var i = 0; i < rocks.length; i++) {
      rocks[i].y += speed / 2;

      if (rocks[i].y > windowHeight) {
        rocks[i].y = -20;
      }

      if (
        ((rocks[i].x <= plane.x && plane.x <= rocks[i].x + rocks[i].width) ||
          (plane.x <= rocks[i].x && rocks[i].x <= plane.x + plane.width)) &&
        ((rocks[i].y <= plane.y && plane.y <= rocks[i].y + rocks[i].height) ||
          (plane.y <= rocks[i].y && rocks[i].y <= plane.y + plane.height))
      ) {
        gameOver = true;
        fill("red");
      } else {
        fill("orange");
      }
      rect(rocks[i].x, rocks[i].y, rocks[i].width, rocks[i].height);
    }

    score += 0.01;

    text("score: " + int(score), 20, 20);
  }
}
