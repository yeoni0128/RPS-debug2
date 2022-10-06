class Form {
  constructor() {
    this.title = createImg("assets/RPS.png");
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.button = createButton("Play");
  }
  setElementsbyStyle() {
    this.input.class("customInput");
    this.button.class("customButton");
  }
  setElementsbyPosition() {
    this.title.position(width / 2 - 150, height / 2 - 200);
    this.input.position(width / 2 - 100, height / 2 + 100);
    this.button.position(width / 2 - 90, height / 2 + 200);
  }
  show() {
    this.setElementsbyPosition();
    this.setElementsbyStyle();
    this.handleButtonPressed();
  }
  handleButtonPressed() {
    this.button.mousePressed(() => {
      this.title.hide();
      this.input.hide();
      this.button.hide();
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.updateCount(playerCount);
      player.addPlayer();
      player.getDistance();
    });
  }
}
