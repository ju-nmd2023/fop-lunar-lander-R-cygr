let catY = 0; // Initial position of the cat
let catspeedY = 0; // Initial vertical speed of the cat
let catGravity = 0.2; // Gravity affecting the cat's fall

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0); // Clear the background

    // Update the cat's vertical speed based on gravity
    catspeedY += catGravity;

    // Update the cat's vertical position based on its speed
    catY += catspeedY;

    // Draw the cat at its current position
    drawCat(catY);

    // Draw the moon
    fill(250);
    stroke(250);
    ellipse(270, 400, 950, 200);

    fill(211);
    ellipse(50, 400, 80, 60);
    ellipse(230, 350, 80, 60);
    ellipse(400, 400, 80, 60);
}

// Function to draw the cat at a given vertical position (catY)
function drawCat(y) {
    fill("lightgrey");
    stroke("black");

    // Draw the cat's body parts at the specified position (y)
    // (Use y instead of fixed y-coordinates)

    //tail
    triangle(35, 35 + y, 43.75, 18.75 + y, 48.75, 21.25 + y);

    //leftbackpaws
    ellipse(23.75, 35 + y, 5, 3.75);

    //leftfrontleg
    line(22.5, 22.5 + y, 20, 36.25 + y);

    //body
    ellipse(28.75, 26.25 + y, 16.25, 18.75);

    //rightfrontleg
    line(28.75, 23.75 + y, 24.375, 37.5 + y);

    //leftfrontpaw
    ellipse(18.125, 36.25 + y, 3.75, 2.5);

    //rightfrontpaw
    ellipse(22.5, 37.5 + y, 3.75, 2.5);

    //backleg
    ellipse(33.75, 32.5 + y, 8.75, 10);

    //rightbackpaws
    ellipse(31.25, 37.5 + y, 5, 3.75);

    //leftear
    triangle(20, 6.875 + y, 25, 8.125 + y, 21.875, 11.875 + y);

    //rightear
    triangle(35, 6.875 + y, 30, 8.125 + y, 33.125, 11.875 + y);

    //head
    ellipse(27.5, 13.75 + y, 12.5, 12.5);

    //leftwhiskers
    line(22.5, 15 + y, 17.5, 15 + y);
    line(23.75, 16.25 + y, 18.75, 17.5 + y);

    //rightwhiskers
    line(32.5, 15 + y, 37.5, 15 + y);
    line(31.25, 16.25 + y, 36.25, 17.5 + y);

    //spot
    ellipse(25, 12.5 + y, 3.75, 3.75);

    //nose
    fill("black");
    triangle(26.25, 15 + y, 28.75, 15 + y, 27.5, 16.25 + y);

    //eyes
    ellipse(25, 12.5 + y, 1.25, 1.25);
    ellipse(30, 12.5 + y, 1.25, 1.25);
}
