export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super("TitleScreen");
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

    this.input.keyboard.on("keyup-SPACE", (event) => {
      console.log(`lets get it`);
      this.scene.start("GamePlay");
    });
  }

  update() {}
}
