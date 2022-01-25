export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super("TitleScreen");
    this.spacebar;
  }

  preload() {
    this.load.image("logo1", "assets/logo1.png");
    this.load.image("logo2", "assets/logo2.png");
  }

  create() {
    // RENDER TITLE SCREEN
    this.add.image(400, 300, "logo1").setScale(2);
    this.add.image(400, 300, "logo2").setScale(2);
    this.add.text(170, 300, "PRESS SPACEBAR TO PLAY", {
      fontSize: "32px",
      fill: "#ffff00",
    });
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log(`spacebar up: moving to MENU,`);
      this.scene.start("Menu");
    }
  }
}
