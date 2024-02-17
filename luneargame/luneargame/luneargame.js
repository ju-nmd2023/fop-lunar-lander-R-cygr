let stars = [];
let spaceshipX, spaceshipY;
let spaceshipSpeedX = 0;
let spaceshipGravity = 0.2; // gravity
let moonSurfaceY = 210; //  moon surface Y position
let spaceshipSize = 60; //  spaceship size

function setup() {
   createCanvas(800, 600);
   spaceshipX = width / 2;
   spaceshipY = 100; // Initial position higher up

   for (let i = 0; i < 700; i++) {
      const star = {
         x: Math.floor(Math.random() * width),
         y: Math.floor(Math.random() * height),
         alpha: Math.random()
      };

      stars.push(star);
   }
}

function draw() {
   noStroke();
   background(0);

   //  stars
   for (let star of stars) {
      fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
      ellipse(star.x, star.y, 2);
      star.alpha += 0.02;
   }

   //  moon
   fill(250);
   stroke(250);
   ellipse(270, 300, 700, 170);

   fill(211);
   ellipse(50, 300, 80, 60);
   ellipse(230, 250, 80, 60);
   ellipse(400, 300, 80, 60);

   //  spaceship
   fill(250);
   stroke(0);
   ellipse(spaceshipX, spaceshipY, spaceshipSize, spaceshipSize * 2);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 2, spaceshipSize / 2);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 3, spaceshipSize / 3);

   //  gravity to spaceship
   if (spaceshipY < moonSurfaceY) {
      spaceshipY += spaceshipGravity;
   } else {
      spaceshipY = moonSurfaceY; //  spaceship Y position to moon surface
   }

   //  spaceship position based on speed
   spaceshipX += spaceshipSpeedX;

   // Wrap spaceship around edges
   if (spaceshipX < -40) {
      spaceshipX = width;
   } else if (spaceshipX > width) {
      spaceshipX = -40;
   }
}

function keyPressed() {
   if (keyCode === LEFT_ARROW) {
      spaceshipSpeedX = -5;
   } else if (keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 5;
   }
}

function keyReleased() {
   if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 0;
   }
}