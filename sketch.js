//Making variables
var monkey , monkey_running;
var bananaImage, obstacleImage;
var obstacle,obstacleGroup1 , obtstacleGroup2;
var score;
var ground , groundimg, invisibleGround;
var back, bg;
var bananaGroup1, bananaGroup2;
var banana3;
var sonic;
var jump;

function preload(){
  
  
  monkey_running = loadAnimation("Jog1.png","jog2.png","jog3.png","jog4.png","jog5.png","jog6.png","jog7.png","jog8.png","jog9.png","Jog10.png")
  
  groundimg = loadImage("okk.png");
  bananaImage = loadImage("ring.png");
  obstacleImage = loadAnimation("egg.png.png");
  back = loadImage("bg.png");
  sonic = loadSound("SONICMANIA.mp3")
  jump = loadAnimation("jump.png","jump.png")
 
}



function setup() {
   createCanvas(windowWidth,450);
   
   score = 50;
  
   
  
   ground = createSprite(0,250);
   ground.addImage("ground",groundimg);
  
   monkey = createSprite(70,300);
   monkey.addAnimation("running",monkey_running);
   monkey.scale = 1;
   monkey.frameDelay = 4;
  
  
   invisibleGround = createSprite(70,380,700,10);
   invisibleGround.visible = false;
    
   bananaGroup1 = new Group();
   bananaGroup2 = new Group();
  
   obstacleGroup1 = new Group();
   obstacleGroup2 = new Group();
    sonic.loop();

     banana3 = createSprite(windowWidth,120);
     banana3.y = round(random(200,400));
     banana3.addImage("banana",bananaImage);
     banana3.velocityX = -3;
     banana3.scale = 0.1;
   
}


function draw() {
  
 

  background(back);
  
    StopSpeed()
    
    if(frameCount>100){
      monkey.frameDelay = 3;
    }
  
  if(frameCount>300){
      monkey.frameDelay = 2.5;
    }
  
  if(frameCount>500){
      monkey.frameDelay = 2;
    }
  
  if(frameCount>900){
      monkey.frameDelay = 1.5;
    }
  
  if(frameCount>1500){
      monkey.frameDelay = 1;
    }
  if(frameCount>2500){
      monkey.frameDelay = 0.5;
    }
  
  
  if(frameCount % 400 === 0){
    spawnObstacles();
  }
  
  console.log("ground.velocityX = "+ground.velocityX)
  
  
  console.log(monkey.frameDelay)
  
  ground.velocityX = -(frameCount/100);
  
  if(ground.x < -230){
    ground.x = 600;
  }
  
  if(frameCount%30===0){
    score-=1;
  }
  
  
  

  if(keyDown("space") && monkey.y > 320){
    monkey.velocityY = -18;
    monkey.addAnimation("jump",jump);
  }
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.9;
  
  
  monkey.collide(invisibleGround);

  spawnBananas1();
  spawnBananas2();
  
  
  
  
  if(monkey.isTouching(bananaGroup1)){
    bananaGroup1.destroyEach();
    score = 50;
  }
  if(monkey.isTouching(bananaGroup2)){
    bananaGroup2.destroyEach();
    score = 50;
  }
  if(monkey.isTouching(banana3)){
    banana3.y = 1000;
    score = 50;
  }
  
  
  //drawSprites function
  drawSprites();
  
  //setup for the survival time
  fill("red");
  stroke("black");
  textSize(30);
  strokeWeight("5");
  text("SurvivalTime:  " + score, (windowWidth/2)-80,50);
  
}

 function spawnBananas1() {
   if(frameCount % round(random(600,400)) === 0){
     var banana = createSprite(windowWidth,120);
     banana.y = round(random(250,250));
     banana.addImage("banana",bananaImage);
     banana.velocityX = -(frameCount/100);
     banana.scale = 0.1;
    
     bananaGroup1.add(banana);
   }
 }
function spawnBananas2() {
   if(frameCount % round(random(400,600)) === 0){
     var banana2 = createSprite(windowWidth,120);
     banana2.y = round(random(150,250));
     banana2.addImage("banana",bananaImage);
     banana2.velocityX = -(frameCount/100);
     banana2.scale = 0.1;
    
     bananaGroup2.add(banana2);
   }
 }
 function spawnObstacles() {
   if(frameCount % round(random(350,600))){
     obstacle = createSprite(windowWidth,300);
     obstacle.addAnimation("EGGMAN",obstacleImage);
     obstacle.velocityX = -(frameCount/100)-2;
     obstacle.lifetime=450;
     obstacle.scale = 0.2;
     obstacle.rotation = 0;
     obstacleGroup1.add(obstacle);
   }
 }


function StopSpeed(){
  if(ground.velocityX< -10){
    ground.velocityX = -10;
    bananaGroup1.velocityX = -10;
    bananaGroup2.velocityX = -10;
  }
}

