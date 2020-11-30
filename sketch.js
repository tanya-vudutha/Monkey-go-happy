var PLAY=1;
var END=0;
var gameState = PLAY;

var monkey , monkey_running;

var ground;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  monkey = createSprite(50, 315, 30, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  foodGroup=createGroup();
  
  //monkey.debug=true;
}


function draw() {
  background("pink");
  
  stroke("pink");
  textSize(20);
  fill("pink");
  text("Score: "+score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime, 100, 50);
  
  if (gameState===PLAY){
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
    if(ground.x<0){
      ground.x=ground.width/2
    }

    if(keyDown("space")&&monkey.y>=310){
      monkey.velocityY=-17;
    }

    monkey.velocityY=monkey.velocityY+0.8

    spawnObstacles();
    spawnBananas();

    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  
  else if(gameState===END){
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    ground.velocityX=0;
    
    monkey.velocityY=0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(400,327,50,50);
    obstacle.velocityX=-5;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.1;
    
    obstacle.lifetime=80;
    
    obstacleGroup.add(obstacle);
  }
}


function spawnBananas(){
  if(frameCount%80===0){
    banana=createSprite(400,120,30,30);
    banana.y=Math.round(random(120,200));
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    
    banana.lifetime=80;
    
    foodGroup.add(banana);
  }
}
