
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  foodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
  var survivaltime=0;
}


function draw() {
  background(255);
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  if (keyDown("space")){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  drawSprites();
  text("score "+score,500,50);
  if (obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  survivaltime = Math.ceil(frameCount/frameRate());
  text("survivaltime "+survivaltime,100,50)
}

function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -4;
    banana.lifetime = 300;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    monkey.depth = banana.depth+1;
    foodGroup.add(banana);
    
  }
}

function spawnObstacles(){
  if (frameCount%300===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}


