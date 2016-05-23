var laserY = 500
var objectY = 0;
var objectX;
var i;
var bugsAmt = 10;
var positionsX = [];
var positionsY = [];
var colors = [];
var isHit = [];
var hitBugs = 0;
var frogSize = 1;
var beeIsHit = false;
var lily = {
  X: 0,
  Y: 0,
  targetX: 100,
  targetY: 100
}
var lily2 = {
  X: 0,
  Y: 0,
  targetX: 1000,
  targetY: 100
}
var bee1 = {
  X: 0,
  Y: 200,
  Speed: 4
}
var bee2 = {
  X: 0,
  Y: 100,
  Speed: 3
}
var bee3 = {
  X: 1000,
  Y: 150,
  Speed: 4
}
var bees = [bee1, bee2, bee3];

function drawBee(beeIn) {
  fill(255, 255, 0);
  //println(beeIn.X)
  ellipse(beeIn.X, beeIn.Y, 40, 30);
  fill(0);
  rect(beeIn.X, beeIn.Y - 15, 10, 30);
  rect(beeIn.X - 15, beeIn.Y - 15, 7, 30);
  beeIn.X = beeIn.X + beeIn.Speed
  if (beeIn.X > width) {
    beeIn.Speed = beeIn.Speed * -1
  }
  if (beeIn.X < 0) {
    beeIn.Speed = beeIn.Speed * -1
  }
}

function drawLily(lily) {
  fill(50, 190, 0);
  arc(lily.X, lily.Y, 200, 200, 40, 360)
  
  // lily.targetX += random(-25, 25);
  // lily.targetY += random(-25, 25);

  var t;
  t+=0.1;
  
  lily.X += noise(t)*20 + width/2;
  lily.Y += noise(t*10)+height/2;
  
  // lily.X += 0.01 * (lily.targetX - lily.X)
  // lily.Y += 0.01 * (lily.targetY - lily.Y)
  // if (lily.X < 0) {
  //   lily.targetX = lily.targetX + 25
  // }
  // if (lily.X > 1000) {
  //   lily.targetX = lily.targetX - 25
  // }
  // if (lily.Y > 500) {
  //   lily.targetY = lily.targetY - 25
  // }
  // if (lily.Y < 0) {
  //   lily.targetY = lily.targetY + 25
  // }
}

function drawLily2(lily) {
  fill(50, 190, 0);
  arc(lily2.X, lily2.Y, 200, 200, 40, 360)
  // lily2.targetX += random(-20, 20);
  // lily2.targetY += random(-25, 25);
  
  var t;
  t+=0.1;
  
  lily2.targetX = noise(t);
  lily2.targetY = noise(t);
  
  
  lily2.X += 0.01 * (lily2.targetX - lily2.X)
  lily2.Y += 0.01 * (lily2.targetY - lily2.Y)
  if (lily2.X < 0) {
    lily2.targetX = lily2.targetX + 25
  }
  if (lily2.X > 1000) {
    lily2.targetX = lily2.targetX - 25
  }
  if (lily2.Y > 500) {
    lily2.targetY = lily2.targetY - 25
  }
  if (lily2.Y < 0) {
    lily2.targetY = lily2.targetY + 25
  }

}

function setup() {
    createCanvas(1000, 500);
    objectColor = color(0, 255, 0);

    angleMode();


    // Initialize the first position of the bugs 
    for (i = 0; i < bugsAmt; i++) {
      fill(0)
      positionsX[i] = random(0, 1000);
      positionsY[i] = random(15, 200);
  
      isHit[i] = 0;
      colors[i] = 'black';
      drawBug(positionsX[i], positionsY[i], colors[i])
      print(positionsX[i]);
    }
  }
  //bug shape
function drawBug(x, y, clr) {
  noStroke()
  fill(clr)
  ellipse(x, y, 20, 20);
}

function draw() {
  background(0, 107, 200);
  fill(255, 255, 255);



  drawLily(lily);
  drawLily2(lily);

  for (i = 0; i < bees.length; i++) {
    drawBee(bees[i]);
  }

  if (lily.Y > height) {
    speedY = -2
  }
  if (lily.Y < 0) {
    speedY = 2
  }
  if (lily.X > width) {
    speedX = -2
  }
  if (lily.X < 0) {
    speedX = 2
  }


  if (mouseIsPressed) {
    for (i = 0; i < bees.length; i++) {
      if (
        (bees[i].Y <= laserY + 20) &&
        (bees[i].Y >= laserY - 20) &&
        (mouseX <= bees[i].X + 20) &&
        (mouseX >= bees[i].X - 20)
      ) {

        beeIsHit = true;

      }
    }
  }

  //decides where the bugs will move
  for (i = 0; i < bugsAmt; i++) {
    if ((positionsY[i] <= laserY + 20) &&
      (positionsY[i] >= laserY - 20) &&
      (mouseX <= positionsX[i] + 20) &&
      (mouseX >= positionsX[i] - 20) &&
      isHit[i] == 0
    ) {
      //Bug I is hit!
      isHit[i] = 1;
      hitBugs++;
      print(hitBugs)
      frogSize *= 1.04;
    }
    
     // bug was not hit. move it randomly

    if (isHit[i] == 0) {
      positionsX[i] += random(-7, 7);
      positionsY[i] += random(-3, 3);


      //makes sure stay on the screen
      if (positionsY[i] > 200) {
        positionsY[i] = 200
      }
      if (positionsY[i] < 15) {
        positionsY[i] = 15
      }
      if (positionsX[i] > 1000) {
        positionsX[i] = 1000
      }
      if (positionsX[i] < 0) {
        positionsX[i] = 0
      }
      drawBug(positionsX[i], positionsY[i], colors[i])
    }
  }
  if (bugsAmt <= hitBugs) {
    //write something
    fill(50, 190, 0)
    rect(0, 0, width, height)
    fill(0)
    textSize(100)
    text('burp', 400, 200)


  }
  if (beeIsHit) {
    //write something
    fill(0);
    rect(0, 0, width, height);
    fill(255)
    textSize(100);
    text('The End', 300, 200);


  }

  //flying bugs 

  //shoots laser when mouse is pressed
  if (mouseIsPressed) {
    strokeWeight(10);
    stroke(255, 0, 0);
    line(mouseX, 500, mouseX, laserY);
    laserY = laserY - 50;
  } else {
    laserY = 500;
  }


  //frog
  // objectY = objectY + 2;
  noStroke();
  fill(50, 168, 0);
  ellipse(mouseX, 500, 150 * frogSize, 200);
  ellipse(mouseX, 400, 100, 100);
  ellipse(mouseX - 7, 360, 50, 40);
  ellipse(mouseX + 7, 360, 50, 40);
  fill(255);
  ellipse(mouseX - 25, 370, 30, 30);
  ellipse(mouseX + 25, 370, 30, 30);
  fill(0)
  ellipse(mouseX - 25, 360, 10, 10);
  ellipse(mouseX + 25, 360, 10, 10);

  //arms
  stroke(50, 168, 0);
  strokeWeight(20);
  line(mouseX + 60, 475, mouseX + 100, 400);
  line(mouseX - 60, 475, mouseX - 100, 400);
  line(mouseX + 100, 400, mouseX + 70, 350);
  line(mouseX - 100, 400, mouseX - 70, 350);
  //fingers
  strokeWeight(10);
  line(mouseX + 75, 350, mouseX + 90, 320)
  line(mouseX - 75, 350, mouseX - 90, 320)
  line(mouseX + 70, 350, mouseX + 70, 320)
  line(mouseX - 70, 350, mouseX - 70, 320)
  line(mouseX + 65, 350, mouseX + 50, 320)
  line(mouseX - 65, 350, mouseX - 50, 320)
    //fingertips
  fill(50, 168, 0)
  ellipse(mouseX + 90, 320, 5, 5)
  ellipse(mouseX - 90, 320, 5, 5)
  ellipse(mouseX + 70, 320, 5, 5)
  ellipse(mouseX - 70, 320, 5, 5)
  ellipse(mouseX + 50, 320, 5, 5)
  ellipse(mouseX - 50, 320, 5, 5)
    //bumps
  fill(50, 148, 0)
  noStroke()
  ellipse(mouseX + 20, 450, 20, 20)
  ellipse(mouseX - 20, 450, 20, 20)
  ellipse(mouseX + 20, 480, 20, 20)
  ellipse(mouseX - 20, 480, 20, 20)

  // //changes object color when the laser hits
  // if (objectY <= laserY + 3 && objectY >= laserY - 3 && mouseX <= objectX + 10 && mouseX >= objectX - 10) {
  //   objectColor = color(0);
  //   var hits = 0;
  //   hits = hits + 1;
  //   textSize(32);
  //   text(hits, 10, 30);
  //   print(hits);
  // }


  /////github practice
}