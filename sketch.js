
//play with these varibles
var fillcolor;

var dragable; // Declare object
var dragables = []; //array to hold all the dragable buttons

//varibles for buttons
var justpushed = false;
var buttonx = 90;
var buttony = 100;
var buttonx2 = 220;
var buttony2= 100;
var buttonx3 = 90;
var buttony3= 210;
var buttonx4 = 220;
var buttony4= 210;
var buttonx5 = 150;
var buttony5= 310;

//varibles for shape
var shapefilled = false;
var fullcircle = true;

var killer;

function setup() {
 //play with these too!
 fillcolor = color(255, 182, 130);
 createCanvas(1500, 700);

 var killer = 0;


  
  // Create objects in dragable array
  dragables.push(new Dragme());
  dragables.push(new Dragme());
  dragables.push(new Dragme());
  dragables.push(new Dragme());
}

function draw() {
  //nice looking background
  background(255, 255, 255);
  
  //dealing with dragable graphics and position
  for (var i = 0; i < dragables.length; i++) {



    //making the dragables, well, dragable
    //creating a var to store how many are selected (without this you'd end up picking up two dragables at a time and you wouldnt be able to seperate them)
    var dragablesselcted = 0;
    //finding how many dragables are selected
    for (var m = 0; m < dragables.length; m++) {
      if(dragables[m].dragablemoving){dragablesselcted++;}
    }
    //if the mouse is pressed and other dragables aren't selected movement is enabled for this dragable (it checks for mouse position inside of the Dragme.move();)
    if((mouseIsPressed && dragablesselcted <= 1 && dragables[i].dragablemoving) || (dragablesselcted == 0)){
      dragables[i].move();
    }
    //if the mouse isn't pressed this makes it so no dragables are selected
    if(!mouseIsPressed){
      dragablesselcted = 0;
      dragables[i].dragablemoving = false;
    }

  }
  
  

  //making the curve using the dragable's locations
  //setting up P5 to just draw a line
  if(!shapefilled){
    noFill();
  }
  if(shapefilled){
    fill(fillcolor);
  }
  stroke(0,0,0);
  //starts drawing a shape
  beginShape();
  //gives the first point to the shape
  vertex(dragables[0].x, dragables[0].y);
  //for each 3 dragables it draws a bezzier using the 3 dragables and the last dragable from the most recent bezzier (in the first bezzier curve it uses the vertecy made a few lines above)
  for(var i = 1; i < dragables.length-1;i++){
    bezierVertex(dragables[i].x, dragables[i].y, dragables[i+2].x, dragables[i+2].y, dragables[i+1].x, dragables[i+1].y);
    i++;
    i++;
  }
  if(fullcircle){
    vertex(dragables[0].x, dragables[0].y);
  }

  
  endShape();
  for(var i = 0; i < dragables.length;i++){

    //dragable graphics
    //choosing color of dragable
    if( ((i+1) % 3 == 0) || (i == 0) ){
      fill(188, 216, 255);
    }  
    else{
      fill(219, 188, 255);
    }

    //displaying the dragables
    dragables[i].display();
    //writing the number of dragable inside of the dragable
    fill(255,255,255);
    text(i,dragables[i].x,dragables[i].y);
  }
  //setting the tint back to normal if the shape was filled
  tint(255);

  //UI stuff (buttons, generated code)
  fill(255,255,255);
  rect(10,10,300,height);

  //generated code
  fill(0);
  text("NOTE: to acess the 'printed' code please open your", 20,390);
  text(" browser's console, or triple click the text", 20, 400);
  removeElements();

  var htmltext = ['beginShape(); <br>' + "vertex(" + round(dragables[0].x-300) + "," + round(dragables[0].y) + "); <br>" ];
   htmltext.join(" ");
    var test;
 
    var testArray = ["a" , "b" ,"c"];
 

  for(var i = 1; i < dragables.length-1;i++){
 //Eva's code: this makes it so that it doesn't add each piece to the array, but as one line for the coordinates, eliminating extra commas 
      htmltext.push("bezierVertex(" + round(dragables[i].x-300) + "," + round(dragables[i].y)  + "," + round(dragables[i+2].x-300)  + "," + round(dragables[i+2].y)  + "," + round(dragables[i+1].x-300) + "," + round(dragables[i+1].y) + "); <br>");
 
    i++;
    i++;
    
  }
    

    
  if(fullcircle){
    htmltext.push("vertex(" + round(dragables[0].x-300) + "," + round(dragables[0].y) + ");");
         htmltext.join(" ");
  }
  else{
    htmltext.push("endShape();");
         htmltext.join(" ");
  }
 
    //original code to push text
    //var printhtmltext = createDiv(join(htmltext, ""));
 // printhtmltext.position(10,400);

    
    //Eva's added code that prints the code (htmltext) as text into a div
   // var printdiv = document.createElement("div");
   // rintdiv.innerHTML = htmltext;
    
    //var node = document.createTextNode(htmltext);
    //printdiv.appendChild(node);
    
   // var displayedText = document.getElementById("div1");
  //  displayedText.appendChild(printdiv); //replace instead of append

//attempt 2
    var printText = createP(htmltext.join(" "));
    printText.position(20,410);
    printText.innerHTML = htmltext;
   // document.getElementById("p1").innerHTML = htmltext;


    
    
    


  //buttons Note: I know this code is messy. I didn't want to make a button object for the 3-4 buttons im going to include in this program
  // get distance between mouse and circle

  var distance = dist(mouseX, mouseY, buttonx, buttony); 
  

  // if the distance is less than the circle's radius
  if(distance < 50)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  ellipseMode(CENTER);
  //if the mouse is over the circle
  if(isOverCircle == true)
  {
    //changes the color of the button
    fill(100);
    if(mouseIsPressed && !justpushed){
      //if the button is pushed add in 3 new dragables, to make a new curve and make the button unpressable for short time (otherwise the screen becomes spammed with curves very quickly)
      justpushed = true;
      dragables.push(new Dragme());
      dragables.push(new Dragme());
      dragables.push(new Dragme());
    }
  }
  else {
    fill(200);
    
  }
  if(!mouseIsPressed){
    justpushed = false;
  }
  fill(130, 188, 255);
    ellipse(buttonx, buttony, 100, 100);
  fill(0,0,0);
  text("Add Curve",buttonx-25,buttony);




  // get distance between mouse and circle

  var distance = dist(mouseX, mouseY, buttonx2, buttony2); 
  

  // if the distance is less than the circle's radius
  if(distance < 50)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  ellipseMode(CENTER);
  //if the mouse is over the circle
  if(isOverCircle == true)
  {
    //changes the color of the button
    fill(100);
    if(mouseIsPressed && !justpushed){
      justpushed=true;
      if(fullcircle){fullcircle=false;}
      else if(!fullcircle){fullcircle=true;}
    }
  }
  else {
    fill(200); 
  }
  if(!mouseIsPressed){
    justpushed = false;
  }
  fill(255, 71, 71);
    ellipse(buttonx2, buttony2, 100, 100);
  fill(0,0,0);
  text("Full Circle",buttonx2-25,buttony2);



  // get distance between mouse and circle

  var distance = dist(mouseX, mouseY, buttonx3, buttony3); 
  

  // if the distance is less than the circle's radius
  if(distance < 50)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  ellipseMode(CENTER);
  //if the mouse is over the circle
  if(isOverCircle == true)
  {
    //changes the color of the button
    fill(100);
    if(mouseIsPressed && !justpushed){
      justpushed = true;
      if(shapefilled){shapefilled=false;}
      else if(!shapefilled){shapefilled=true;}
    }
  }
  else {
    fill(200); 
  }
  if(!mouseIsPressed){
    justpushed = false;
  }
  fill(227, 158, 255);
    ellipse(buttonx3, buttony3, 100, 100);
  fill(0,0,0);
  text("Fill",buttonx3-9,buttony3);


  // get distance between mouse and circle

  var distance = dist(mouseX, mouseY, buttonx4, buttony4); 
  

  // if the distance is less than the circle's radius
  if(distance < 50)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  ellipseMode(CENTER);
  //if the mouse is over the circle
  if(isOverCircle == true)
  {
    //changes the color of the button
    fill(100);
    if(mouseIsPressed && !justpushed){
      justpushed = true;
      println("beginShape();");
      println("vertex(" + round(dragables[0].x-300) + round(dragables[0].y) + ");");
      for(var i = 1; i < dragables.length-1;i++){
        println("bezierVertex(" + round(dragables[i].x-300)  + round(dragables[i].y)  + round(dragables[i+2].x-300) + round(dragables[i+2].y) + round(dragables[i+1].x-300)  + round(dragables[i+1].y) + ");");
        i++;
        i++;
      }
      if(fullcircle){
        println("vertex(" + round(dragables[0].x-300)  + round(dragables[0].y) + ");");
        println("endShape();");
      }
      else{
        println("endShape();");
      }
      
    }
  }
  else {
    fill(200); 
  }
  if(!mouseIsPressed){
    justpushed = false;
  }
  fill(131, 255, 109);
    ellipse(buttonx4, buttony4, 100, 100);
  fill(0,0,0);
  text("Print Code",buttonx4-25,buttony4);

  var distance = dist(mouseX, mouseY, buttonx5, buttony5); 
  

  // if the distance is less than the circle's radius
  if(distance < 50)
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  ellipseMode(CENTER);
  //if the mouse is over the circle
  if(isOverCircle == true)
  {
    //changes the color of the button
    fill(100);
    if(mouseIsPressed && !justpushed){
      justpushed = true;
      dragables = shorten(dragables);
      dragables = shorten(dragables);
      dragables = shorten(dragables);
    }
  }
  else {
    fill(200); 
  }
  if(!mouseIsPressed){
    justpushed = false;
  }
 fill(255, 255, 127);
    ellipse(buttonx5, buttony5, 100, 100);
  fill(0,0,0);
  text("Delete Point",buttonx5-30,buttony5);

}

// Dragme class
function Dragme() {
  //making the varibles for the Dragme
  //randomly positions the dragable
  this.x = random(320,width-20);
  this.y = random(20,height-20);
  this.diameter = 20;
  this.dragablemoving = false;

  this.move = function() {
    //checking if draggable is clicked
    //checking if the mouse is pressed
    if (mouseIsPressed) {
      //checking if the mouse is within the dragable and within the editing window
      if ((((mouseX >= this.x - this.diameter) && (mouseX <= this.x + this.diameter) && (mouseY >= this.y - this.diameter) && (mouseY <= this.y + this.diameter)) || (this.dragablemoving)) && ((mouseX > 310) && (mouseX < width-10) && (mouseY > 10) && (mouseY < height-20)))  {
        //moves draggable to the mouse
        this.x = mouseX;
        this.y = mouseY;
        //sets the dragable's status to being clicked
        this.dragablemoving = true;
      }
    }
    //checking if the mouse isn't pressed 
    if (!mouseIsPressed) {
      //sets the dragable to not being clicked
      this.dragablemoving = false;
    }
  }

  this.display = function() {
    //simply draws the dragable(runs every frame on every dragable)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}