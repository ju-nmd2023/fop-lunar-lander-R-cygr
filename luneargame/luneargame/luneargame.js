let stars = [];
let spaceshipX, spaceshipY;
let spaceshipSpeedX = 0;
let spaceshipGravity = 3; // gravity
let moonSurfaceY = 500; // moon surface Y position
let spaceshipSize = 60; // spaceship size
let gameStarted = false; // variable to track if the game has started
let spaceshipLanded = false; // variable to track if the spaceship has landed
let coins = []; // array to store coins
let score = 0; // player's score

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
   for (let i = 0; i < 10; i++) {
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
   text("Press ENTER to start game. Collect coins.", width / 2, height / 2);
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
   fill(255,255,255);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 2, spaceshipSize / 2);
   fill(0,0,0);
   ellipse(spaceshipX, spaceshipY - 30, spaceshipSize / 3, spaceshipSize / 3);
  
   //  thrust force
   if (keyIsDown(UP_ARROW)) {
      spaceshipY += -2; 
   }

   // gravity to spaceship
   if (spaceshipY < moonSurfaceY && gameStarted && !spaceshipLanded) {
      spaceshipY += spaceshipGravity;
   } else if (!spaceshipLanded) {
      spaceshipY = moonSurfaceY; // spaceship Y position to moon surface
      spaceshipLanded = true; // spaceship has landed
   }

   // spaceship position based on speed
   spaceshipX += spaceshipSpeedX;


   // Check for collisions between spaceship and coins
   for (let i = coins.length - 1; i >= 0; i--) {
      if (dist(spaceshipX, spaceshipY, coins[i].x, coins[i].y) < 40) {
         coins.splice(i, 1); // Remove coin from array
         score++; // Increment score
      }
   }

   // Display result scene if the spaceship has landed
   if (spaceshipLanded) {
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      if (score >= 3) {
         text("Landed successfully", width / 2, height / 2);
      } else {
         text("You lost. Try again.", width / 2, height / 2);
      }
      text("Score: " + score, width / 2, height / 2 + 50);
      text("Press SPACE to restart", width / 2, height / 2 + 100);
   }
}

function keyPressed() {
   if (!gameStarted && keyCode === ENTER) {
      gameStarted = true; // Start the game when ENTER key is pressed
      // Reset spaceship position to initial higher position
      spaceshipY = 100;
      spaceshipLanded = false; // Reset spaceship landed state
      // Reset score
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
   spaceshipLanded = false;

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
