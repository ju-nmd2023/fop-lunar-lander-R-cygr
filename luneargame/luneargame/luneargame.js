let stars = [];

function setup() {
   createCanvas(800, 600);

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

   // stars
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
   ellipse(230, 200, 80, 150);

   ellipse(230, 170, 40, 40);
   ellipse(230, 170, 30, 30);
}
