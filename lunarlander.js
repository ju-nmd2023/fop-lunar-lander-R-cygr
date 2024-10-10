// I had some coding that chat gbt improved.

let stars = [];
let spaceshipX, spaceshipY;
let spaceshipSpeedX = 0;
let spaceshipSpeedY = 0; // vertical speed
let spaceshipGravity = 0.1; // gravity
let moonSurfaceY = 500; // moon surface Y position
let spaceshipSize = 60; // spaceship size
let gameStarted = false; // variable to track if the game has started
let spaceshipLanded = false; // variable to track if the spaceship has landed
let coins = []; // array to store coins
let score = 0; // player's score
let thrust = -0.2; // thrust force
let thrustUsed = false; // track if thrust was used
let maxSafeLandingSpeed = 5; // max safe landing speed
let landedSuccessfully = false; // track if the landing was successful

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

   //  coins
   for (let i = 0; i < 20; i++) {
      const coin = {
         x: Math.floor(Math.random() * width),
         y: Math.floor(Math.random() * height)
      };
      coins.push(coin);
   }
}

function draw() {
   if (!gameStarted) {
      startScreen();
   } else {
      gamePlay();
   }
}

function startScreen() {
   background(0);
   fill(255);
   textSize(24);
   textAlign(CENTER, CENTER);
   text("Press ENTER to start game. Use THRUST to avoid crashing and collect coins.", width / 2, height / 2);
}

function gamePlay() {
   noStroke();
   background(0);

   // stars
   for (let star of stars) {
      fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
      ellipse(star.x, star.y, 2);
      star.alpha += 0.02;
   }

   // moon
   fill(250);
   stroke(250);
   ellipse(270, 600, 1550, 200);

   fill(211);
   ellipse(50, 560, 90, 60);
   ellipse(230, 580, 100, 60);
   ellipse(400, 550, 80, 60);

   // coins
   fill(255, 215, 0); 
   for (let coin of coins) {
      ellipse(coin.x, coin.y, 20, 20);
   }

   // spaceship
   fill(255,192,203);
   stroke(255,192,203);
   ellipse(spaceshipX, spaceshipY, spaceshipSize, spaceshipSize * 2);
   stroke(0,0,0);
   fill(255,255,255);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 2, spaceshipSize / 2);
   fill(0,0,0);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 3, spaceshipSize / 3);
  
   //  thrust control
   if (keyIsDown(UP_ARROW)) {
      spaceshipSpeedY += thrust; // apply thrust to counter gravity
      thrustUsed = true; // mark that thrust was used
   }

   // gravity effect
   spaceshipSpeedY += spaceshipGravity;

   // spaceship position based on speed
   spaceshipY += spaceshipSpeedY;
   spaceshipX += spaceshipSpeedX;

   // Display velocity
   fill(255);
   textSize(16);
   textAlign(LEFT);
   text("Velocity: " + spaceshipSpeedY.toFixed(2), 10, 20);

   // prevent spaceship from going below the moon surface
   if (spaceshipY >= moonSurfaceY) {
      spaceshipY = moonSurfaceY;
      spaceshipLanded = true;

      //help from chat gbt

      // Check if the spaceship landed within the safe velocity
      if (thrustUsed && Math.abs(spaceshipSpeedY) < maxSafeLandingSpeed) {
         landedSuccessfully = true;
      } else {
         landedSuccessfully = false;
      }
   }

   // Check for collisions between spaceship and coins
   for (let i = coins.length - 1; i >= 0; i--) {
      if (dist(spaceshipX, spaceshipY, coins[i].x, coins[i].y) < 40) {
         coins.splice(i, 1); // Remove coin from array
         score++; // Increment score
      }
   }

   // Landing condition, I wrote the following and chat gbt improved it
   if (spaceshipLanded) {
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      if (landedSuccessfully) {
         text("Landed successfully!", width / 2, height / 2);
      } else if (!thrustUsed) {
         text("Crashed! No thrust used.", width / 2, height / 2);
      } else {
         text("Crashed! Speed too high.", width / 2, height / 2);
      }
      text("Score: " + score, width / 2, height / 2 + 50);
      text("Press SPACE to restart", width / 2, height / 2 + 100);
      spaceshipSpeedY = 0; // Stop movement after landing
   }
}

function keyPressed() {
   if (!gameStarted && keyCode === ENTER) {
      gameStarted = true; // Start the game when ENTER key is pressed
      // Reset spaceship position and state
      spaceshipY = 100;
      spaceshipSpeedY = 0;
      spaceshipLanded = false; 
      thrustUsed = false; // Reset thrust used flag
      score = 0;
   } else if (keyCode === LEFT_ARROW) {
      spaceshipSpeedX = -5;
   } else if (keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 5;
   } else if (keyCode === 32 && spaceshipLanded) { // Restart the game when SPACE key is pressed
      restartGame();
   }
}

function keyReleased() {
   if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      spaceshipSpeedX = 0;
   }
}

function restartGame() {
   gameStarted = false;
   spaceshipX = width / 2;
   spaceshipY = 100;
   spaceshipSpeedY = 0;
   spaceshipLanded = false;
   thrustUsed = false; // Reset thrust used flag

   //  new coins
   coins = [];
   for (let i = 0; i < 5; i++) {
      const coin = {
         x: Math.floor(Math.random() * width),
         y: Math.floor(Math.random() * height)
      };
      coins.push(coin);
   }
}

