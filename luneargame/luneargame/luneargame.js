let x = 100;
let y = 100;
let rotation = 0;
let speed = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseIsActive = false;

function setup() {
    createCanvas(400, 400);
}

function draw() {
   background(49, 173, 220);

    //  spaceship
    push();
    translate(x, y);
    rotate(rotation);
   
    fill(255, 255, 255);
    ellipse(0, 20, 80, 130);
    
    fill(255, 192, 203);
    ellipse(0, 0, 30, 30);
    
    fill(0);
    ellipse(0, 0, 20, 20);
    
    pop();

    x = x + Math.cos(rotation) * speed;
    y = y + Math.sin(rotation) * speed;

 
    if (keyIsDown(38)) {
        speed = 5;
    } else if (keyIsDown(40)) {
        speed = -5;
    } else {
        speed = 0;
    }

    if (keyIsDown(37)) {
        rotation = rotation - 0.05;
    } else if (keyIsDown(39)) {
        rotation = rotation + 0.05;
    }



    
}
