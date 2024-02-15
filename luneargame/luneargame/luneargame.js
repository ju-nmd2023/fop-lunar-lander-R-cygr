let stars = [];
let spaceshipX, spaceshipY;
let spaceshipSpeedX = 0;
let spaceshipGravity = 0.2; // gravity
let moonSurfaceY = 210; //  moon surface Y position
let spaceshipSize = 60; //  spaceship size
let obstacles = [];
let weapon;
let gameIsOver = false;
let gameIsWon = false;

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

   // Create obstacles
   for (let i = 0; i < 5; i++) {
      obstacles.push({
         x: random(50, width - 50),
         y: random(240, moonSurfaceY - 60),
         size: random(20, 40)
      });
   }

   // Create weapon
   weapon = {
      x: spaceshipX,
      y: spaceshipY - 50,
      size: 10,
      speed: 5,
      active: false
   };
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

   // Draw obstacles
   for (let obstacle of obstacles) {
      fill(100);
      rect(obstacle.x - obstacle.size / 2, obstacle.y - obstacle.size / 2, obstacle.size, obstacle.size);
   }

   // Draw spaceship
   fill(250);
   stroke(0);
   ellipse(spaceshipX, spaceshipY, spaceshipSize, spaceshipSize * 2);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 2, spaceshipSize / 2);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 3, spaceshipSize / 3);

   // Move and draw weapon
   if (weapon.active) {
      fill(255, 0, 0);
      ellipse(weapon.x, weapon.y, weapon.size);
      weapon.y -= weapon.speed;

      // Check collision with obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
         if (dist(weapon.x, weapon.y, obstacles[i].x, obstacles[i].y) < weapon.size + obstacles[i].size) {
            obstacles.splice(i, 1);
            weapon.active = false;
            break;
         }
      }
   }

   //  gravity to spaceship
   if (spaceshipY < moonSurfaceY && !gameIsOver) {
      spaceshipY += spaceshipGravity;
   } else if (!gameIsOver) {
      spaceshipY = moonSurfaceY; //  spaceship Y position to moon surface
      if (obstacles.length === 0) {
         gameIsWon = true;
         gameIsOver = true;
      } else {
         gameIsOver = true;
      }
   }

   //  spaceship position based on speed
   spaceshipX += spaceshipSpeedX;

   // Wrap spaceship around edges
   if (spaceshipX < -40) {
      spaceshipX = width;
   } else if (spaceshipX > width) {
      spaceshipX = -40;
   }

   // Win and lose conditions
   if (gameIsOver) {
      textSize(32);
      fill(255);
      if (gameIsWon) {
         text("You Win!", width / 2 - 50, height / 2);
      } else {
         text("Game Over", width / 2 - 75, height / 2);
      }
   }
}

function keyPressed() {
   if (keyCode === LEFT_ARROW) {
      spaceshipSpeedX = -5;
   } else if (keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 5;
   } else if (keyCode === UP_ARROW && !weapon.active) {
      weapon.active = true;
      weapon.x = spaceshipX;
      weapon.y = spaceshipY - 50;
   }
}

function keyReleased() {
   if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 0;
   }
}
