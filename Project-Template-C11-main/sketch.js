var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var bomb, coin, energyDrink;
var bombHitbox;
var gameState;
var coin_counter;
var speedUp;

function preload(){
  pathImg = loadImage("path.png");
  boyAnimation = loadAnimation("Runner-1.png","Runner-2.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  drinkImg = loadImage("energyDrink.png");
}

function setup(){
  
createCanvas(400,400);
gameState = 'play';
speedUp = false;

//Coin counter
coin_counter = 0;

// Moving background
path=createSprite(200,00);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//creating boy running
boy = createSprite(180,340,30,30);
boy.scale=0.08;
boy.addAnimation("JakeRunning",boyAnimation);

//create bomb
bomb = createSprite(0,0);
bomb.addImage(bombImg);
bomb.scale = 0.1;
bomb.visible = false;

//create bomb hitbox
bombHitbox = createSprite(50,50,20,20);
bombHitbox.visible = false;

//create coin
coin = createSprite(0,0);
coin.addImage(coinImg);
coin.scale=0.3;
coin.visible = false;

//create energy drink
energyDrink = createSprite(0,0);
energyDrink.velocityY = path.velocityY;
energyDrink.addImage(drinkImg);
energyDrink.scale = 0.125;
energyDrink.visible = false;

leftBoundary=createSprite(0,0,100,800);

leftBoundary.visible = false;


rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;
}

function draw() {
  background(0);
  console.log(path.y);

  boy.x = World.mouseX;
  bombHitbox.x = bomb.x;
  bombHitbox.y = bomb.y;

  bomb.velocityY = path.velocityY;
  coin.velocityY = path.velocityY;

  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
    
  //code to reset the background
  if(path.y > 500 ){
    path.y = height/2;
  }
  
  //Spawns a bomb every 120 frames
  if (frameCount % 120 == 0 && gameState == 'play') {
    spawnBomb();
    bomb.visible = true;
  }

  //Spawns a coin every 150 frames
  if (frameCount % 150 == 0 && gameState == 'play' && speedUp == false) {
    spawnCoin();
    coin.visible = true;
  } 
  //If the player picks up an energy drink, coins spawn every 45 frames
  else if(frameCount % 45 == 0 && gameState == 'play' && speedUp) {
    spawnCoin();
  }

  //Spawns a energy drink every 700 frames
  if (frameCount % 700 == 0 && gameState == 'play') {
    spawnDrink();
    energyDrink.visible = true;
  }
  
  //if the boy touches the bomb, the game stops
  if (boy.isTouching(bombHitbox)) {
    gameState = 'over';
    GameOver();
  }

  //if the boy touches the coin, it disappears and the coin counter goes up
  if (boy.isTouching(coin)) {
    coin_counter += 1;
    console.log('Coins: ' + coin_counter);
    coin.x = 500;
  }

  //if the boy touches the drink, it disappears
  if(boy.isTouching(energyDrink)) {
    energyDrink.x = 500;
    // finalFrame is used to represent the final frame of speed up. 
    finalFrame = frameCount + 500;
    speedUp = true;
  }

  //If speed up is true, the path velocity will be doubled
  if(speedUp && frameCount <= finalFrame && gameState == 'play') {
    path.velocityY = 8;
  } else if (gameState == 'play') {
    path.velocityY = 4;
    speedUp = false;
  }
 
  drawSprites();
  //console.log(bomb.y);
}

//spawns a bomb between the 3 columns randomly
function spawnBomb() {
  rand = Math.round(random(1,3));

  switch(rand) {
    case 1:
      bomb.x = 93;
      bomb.y = -20;
      break

    case 2:
      bomb.x = 203;
      bomb.y = -20;
      break

    case 3: 
      bomb.x = 313;
      bomb.y = -20;
      break
  }
}

//spawns a coin between the 3 columns randomly
function spawnCoin() {
  rand = Math.round(random(1,3));

  switch(rand) {
    case 1:
      coin.x = 93;
      coin.y = -20;
      coin.visible = true;
      break

    case 2:
      coin.x = 203;
      coin.y = -20;
      coin.visible = true;
      break

    case 3: 
      coin.x = 313;
      coin.y = -20;
      coin.visible = true;
      break
  }
}

//spawns an energy drink between the 3 columns randomly
function spawnDrink() {
  rand = Math.round(random(1,3));

  switch(rand) {
    case 1:
      energyDrink.x = 93;
      energyDrink.y = -20;
      break

    case 2:
      energyDrink.x = 203;
      energyDrink.y = -20;
      break

    case 3: 
      energyDrink.x = 313;
      energyDrink.y = -20;
      break
  } 
}

//stops movement
function GameOver() {
  bomb.velocityY = 0;
  coin.velocityY = 0;
  energyDrink.velocityY = 0;
  path.velocityY = 0;
  console.log("Game Over!");
}