var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombie, zombiesGroup;
var bulletImg, bullet, bulletsGroup;
var winSound, loseSound, explosionSound;
var bulletNo = 50;
var life = 3;
var gameState = "play";
var score = 0;
var life1, life1Img, life2, life2Img, life3, life3Img;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet2.png");
  bgImg = loadImage("assets/bg.jpeg");
  life1Img = loadImage("assets/heart_1.png");
  life2Img = loadImage("assets/heart_2.png");
  life3Img = loadImage("assets/heart_3.png");

  winSound = loadSound("assets/win.mp3");
  loseSound = loadSound("assets/lose.mp3");
  explosionSound = loadSound("assets/explosion.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   life1 = createSprite(displayWidth - 150, 40, 20, 20);
   life1.addImage(life1Img);
   life1.scale = 0.5;
   life1.visible = false;

   life2 = createSprite(displayWidth - 150, 40, 20, 20);
   life2.addImage(life2Img);
   life2.scale = 0.5;
   life2.visible = false;

   life3 = createSprite(displayWidth - 200, 40, 20, 20);
   life3.addImage(life3Img);
   life3.scale = 0.5;
   life3.visible = true;




   zombiesGroup = new Group();
   bulletsGroup = new Group();

}

function draw() {
  background(0); 
  if(gameState === "play"){
 spawnZombies();
  
  if(life === 3){
    life3.visible = true;
    life2.visible = false;
    life1.visible = false;
  }
  if(life === 2){
    life3.visible = false;
    life2.visible = true;
    life1.visible = false;
  }
  if(life === 1){
    life3.visible = false;
    life2.visible = false;
    life1.visible = true;
  }
  }
  


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if (life === 0){
  gameState = "lost"
}
if(score == 100){
  gameState = "won";
  winSound.play();
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10);
 bullet.scale = 0.1;
 bullet.velocityX = 20;
 bullet.addImage(bulletImg);
 bulletsGroup.add(bullet);
 explosionSound.play();
 if(bulletNo>0){
  bulletNo = bulletNo-1;

 }
}
if(bulletNo===0){
  gameState = "noBullets";
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombiesGroup.isTouching(bulletsGroup)){
  for(var i = 0; i < zombiesGroup.length; i++){
    if(zombiesGroup[i].isTouching(bulletsGroup)){
    bulletsGroup.destroyEach();
    zombiesGroup[i].destroy();
    score = score+2; 
  }
  }
}
if(zombiesGroup.isTouching(player)){
  for(var i = 0; i < zombiesGroup.length; i++){
    if(zombiesGroup[i].isTouching(player)){
      zombiesGroup.destroyEach();
      life = life - 1;
      loseSound.play();
    }
  }
}


drawSprites();
textSize(20);
fill("white");
text("Score: "+score, displayWidth-150,100);
text("Lives: "+life, displayWidth-150,130);
text("Bullets: "+bulletNo, displayWidth-150,160);

if(gameState === "won"){
  textSize(100);
  text("YOU WON!! CONGRATS!", 200, 400);
  zombiesGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();

}
else if(gameState === "lost"){
  textSize(100);
  text("YOU LOST..", 200, 400);
  zombiesGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
}
if(gameState === "noBullets"){
  textSize(100);
  text("You ran out of bullets.", 150, 400);
  zombiesGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
}
}
function spawnZombies(){
  if(frameCount%60===0){
  zombie = createSprite(random(1000, 1500),random(100, 500),40, 40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.12;
  zombie.velocityX = -5;
  zombie.lifetime = 300;
  zombiesGroup.add(zombie);
}
}