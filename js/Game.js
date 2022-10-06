class Game {
  constructor() {
    this.resetButton = createButton("Reset");
    this.rockButton = createButton("Rock");
    this.paperButton = createButton("Paper");
    this.scissorButton = createButton("Scissor");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    papers = []
    rocks = []
    scissors = []
    papers2 = []
    rocks2 = []
    scissors2 = []

    form = new Form();
    form.show();

    p1 = createSprite(50, height / 2, 50, 50);
    p1.shapeColor = "red";

    p2 = createSprite(width - 50, height / 2, 50, 50);
    p2.shapeColor = "yellow"

    players = [p1, p2];
  }

  handleElements() {

    this.resetButton.class("resetButton");
    this.resetButton.position(50, 80);

    this.rockButton.size(80, 40);
    this.rockButton.class("customButton2");
    this.rockButton.position(width / 2 + 90, height - 50);
    this.paperButton.position(width / 2, height - 50);
    this.paperButton.class("customButton2");
    this.scissorButton.position(width / 2 - 90, height - 50);
    this.scissorButton.size(80, 40);
    this.scissorButton.class("customButton2");
  }


  play() {

    //handleSpot
    this.handleElements();
    this.handleShoot()
    this.handleScreenSync()
    this.handleOverWrite()
    this.handleItemSync()
    this.handleButtonSync()
    //handleSpot

    itemIndex = "Items/item" + itemNo;

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

      var index = 0;
      for (var plr in allPlayers) {

        index = index + 1;

        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        players[index - 1].position.x = x;
        players[index - 1].position.y = y;

      }

      this.handlePlayerControls();
      this.handleResetButton()

      drawSprites();
    }
  }

  handlePlayerControls() {

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      player.positionY -= 10;
      player.update();
    }
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        itemNo: 1,
        rShot: 0,
        pShot: 0,
        sShot: 0,
        rShot2: 0,
        pShot2: 0,
        sShot2: 0,
        rockPressed: 0,
        paperPressed:0,
        scissorPressed:0,
        rock2Pressed:0,
        paper2Pressed:0,
        scissor2Pressed:0,
        players: {},
      });
      window.location.reload();
    });
  }
  handleShoot() {
    this.paperButton.mouseReleased(() => {
      if (paperYes != true) {
        paper = new Item()
        paper.type = "paper"
        if (player.index === 1) {
          paperShot = createSprite(p1.x, p1.y)
          paperShot.addImage("paper", paperImg)
          papers.push(paperShot)
          paperShot.scale = 0.4
          paper.positionX = paperShot.x
          paper.positionY = paperShot.y
          paper.side = 1
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          paper.addItem()
          pShot = 1
          database.ref("/").update({
            pShot: pShot
          });
        } else if (player.index === 2) {
          paperShot2 = createSprite(p2.x, p2.y)
          papers2.push(paperShot2)
          paperShot2.addImage("paper2", paperImg)
          paperShot2.scale = 0.4
          paper.positionX = paperShot2.x
          paper.positionY = paperShot2.y
          paper.side = 2
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          paper.addItem()
          pShot2 = 1
          database.ref("/").update({
            pShot2: pShot2
          });
        }
        paperYes = true
      }
    })
    this.rockButton.mouseReleased(() => {
      if (rockYes != true) {
        rock = new Item()
        rock.type = "rock"
        if (player.index === 1) {
          rockShot = createSprite(p1.x, p1.y)
          rocks.push(rockShot)
          rockShot.addImage("rock", rockImg)
          rockShot.scale = 0.5
          rockShot.x += 1
          rock.side = 1
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          rock.addItem()
          rShot = 1
          database.ref("/").update({
            rShot: rShot
          });
        } else if (player.index === 2) {
          rockShot2 = createSprite(p2.x, p2.y)
          rocks2.push(rockShot2)
          rockShot2.addImage("rock2", rockImg)
          rockShot2.scale = 0.5
          rockShot2.x -= 1
          rock.side = 2
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          rock.addItem()
          rShot2 = 1
          database.ref("/").update({
            rShot2: rShot2
          });
        }
        rockYes = true
      }
    })
    this.scissorButton.mouseReleased(() => {
      if (scissorYes != true) {
        scissor = new Item()
        scissor.type = "scissor"
        if (player.index === 1) {
          scissorShot = createSprite(p1.x, p1.y)
          scissorShot.addImage("scissor", scissorImg)
          scissors.push(scissorShot)
          scissorShot.scale = 0.4
          scissorShot.x += 1
          scissor.side = 1
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          scissor.addItem()
          sShot = 1
          database.ref("/").update({
            sShot: sShot
          });
        } else if (player.index === 2) {
          scissorShot2 = createSprite(p2.x, p2.y)
          scissorShot2.addImage("scissor2", scissor2Img)
          scissors2.push(scissorShot2)
          scissorShot2.scale = 0.4
          scissorShot2.x -= 1
          scissor.side = 2
          itemNo += 1
          database.ref("/").update({
            itemNo: itemNo
          });
          scissor.addItem()
          sShot2 = 1
          database.ref("/").update({
            sShot2: sShot2
          });
        }
        scissorYes = true

      }
    })
  }

  handleScreenSync() {

    pShotRef = database.ref("pShot");
    pShotRef.on("value", function (data) {
      pShot = data.val();
    });
    database.ref("/").update({
      pShot: pShot
    });

    rShotRef = database.ref("rShot");
    rShotRef.on("value", function (data) {
      rShot = data.val();
    });
    database.ref("/").update({
      rShot: rShot
    });

    sShotRef = database.ref("sShot");
    sShotRef.on("value", function (data) {
      sShot = data.val();
    });
    database.ref("/").update({
      sShot: sShot
    });

    pShotRef2 = database.ref("pShot2");
    pShotRef2.on("value", function (data) {
      pShot2 = data.val();
    });
    database.ref("/").update({
      pShot2: pShot2
    });

    rShotRef2 = database.ref("rShot2");
    rShotRef2.on("value", function (data) {
      rShot2 = data.val();
    });
    database.ref("/").update({
      rShot2: rShot2
    });

    sShotRef2 = database.ref("sShot2");
    sShotRef2.on("value", function (data) {
      sShot2 = data.val();
    });
    database.ref("/").update({
      sShot2: sShot2
    });
  }
  handleOverWrite() {
    itemNoRef = database.ref("itemNo");
    itemNoRef.on("value", function (data) {
      itemNo = data.val();
    });
    database.ref("/").update({
      itemNo: itemNo
    });
  }
  handleItemSync() {
    item1Ref = database.ref("Items/item1/positionX");
    item1Ref.on("value", function (data) {
      item1 = data.val();
    });    
     item2Ref = database.ref("Items/item2/positionX");
    item2Ref.on("value", function (data) {
      item2 = data.val();
    });    
    item3Ref = database.ref("Items/item3/positionX");
    item3Ref.on("value", function (data) {
      item3 = data.val();
    });    
    item4Ref = database.ref("Items/item4/positionX");
    item4Ref.on("value", function (data) {
      item4 = data.val();
    });    
    item5Ref = database.ref("Items/item5/positionX");
    item5Ref.on("value", function (data) {
      item5 = data.val();
    });    
    item6Ref = database.ref("Items/item6/positionX");
    item6Ref.on("value", function (data) {
      item6 = data.val();
    });    
    
  }

  handleButtonSync(){
    this.rockButton.mouseReleased(()=>{
      if(player.index === 1){
        rockPressed = 1
      }else if(player.index === 2){
        rock2Pressed === 1
      }else{
        rockPressed = 0
        rock2Pressed = 0
      }
    })
    this.paperButton.mouseReleased(()=>{
      if(player.index === 1){
        paperPressed = 1
      }else if(player.index === 2){
        paper2Pressed === 1
      }else{
        paperPressed = 0
        paper2Pressed = 0
      }
    })
    this.scissorButton.mouseReleased(()=>{
      if(player.index === 1){
        scissorPressed = 1
      }else if(player.index === 2){
        scissor2Pressed === 1
      }else{
        scissorPressed = 0
        scissor2Pressed = 0
      }
    })
    rockPressedRef = database.ref("rockPressed");
    rockPressedRef.on("value", function (data) {
      rockPressed = data.val();
    });
    database.ref("/").update({
      rockPressed: rockPressed
    });
    rock2PressedRef = database.ref("rock2Pressed");
    rock2PressedRef.on("value", function (data) {
      rock2Pressed = data.val();
    });
    database.ref("/").update({
      rock2Pressed: rock2Pressed
    });
    paperPressedRef = database.ref("paperPressed");
    paperPressedRef.on("value", function (data) {
      paperPressed = data.val();
    });
    database.ref("/").update({
      paperPressed: paperPressed
    });
    paper2PressedRef = database.ref("paper2Pressed");
    paper2PressedRef.on("value", function (data) {
      paper2Pressed = data.val();
    });
    database.ref("/").update({
      paper2Pressed: paper2Pressed
    });
    scissorPressedRef = database.ref("scissorPressed");
    scissorPressedRef.on("value", function (data) {
      scissorPressed = data.val();
    });
    database.ref("/").update({
      scissorPressed: scissorPressed
    });
    scissor2PressedRef = database.ref("scissor2Pressed");
    scissor2PressedRef.on("value", function (data) {
      scissor2Pressed = data.val();
    });
    database.ref("/").update({
      scissor2Pressed: scissor2Pressed
    });
  }
  
}