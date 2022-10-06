var titleImg, rockImg, scissorImg, paperImg;
var rock, scissor, paper, name, bg, resetButton
var dataBase
var gameState = 0;
var playerCount = 0;
var playerData;
var form,game,player,rockShot,paperShot,scissorShot,rockShot2,paperShot2,scissorShot2,scissors,papers,rocks,scissors2,papers2,rocks2
var players = [];
var allPlayers
var p1,p2
var itemNo = 1
var itemIndex
var rockYes = false
var paperYes = false
var scissorYes = false
var rShot = 0
var pShot = 0
var sShot = 0
var rShot2 = 0
var pShot2 = 0
var sShot2 = 0
var rShotRef,pShotRef,sShotRef
var rShotRef2,pShotRef2,sShotRef2
var itemNoRef
var item1 
var item2  
var item3 
var item4 
var item5 
var item6 
var item1Ref,item2Ref,item3Ref,item4Ref,item5Ref,item6Ref
var rockPressed = 0
var paperPressed = 0
var scissorPressed = 0
var rock2Pressed = 0
var paper2Pressed = 0
var scissor2Pressed = 0
var rockPressedRef 
var paperPressedRef
var scissorPressedRef 
var rock2PressedRef
var paper2PressedRef 
var scissor2PressedRef 
function preload() {
  titleImg = loadImage("assets/RPS.png");
  rockImg = loadImage("assets/Rock.png");
  scissorImg = loadImage("assets/Scissors.png");
  scissor2Img = loadImage("assets/Scissors2.png");
  paperImg = loadImage("assets/Paper.png");
  resetImg = loadImage("assets/reset.png");
}

function setup() {
  database = firebase.database();
  createCanvas(windowWidth,windowHeight);
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background("#13abb3");


  if (gameState === 1) {
    game.play();
  }

  if (playerCount === 2) {
    gameState = 1;
    game.update(1)
  }
  //itemNo += 1


}





