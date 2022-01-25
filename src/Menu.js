export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
    this.spacebar;
  }

  preload() {
    this.load.image("rink1", "assets/rink1.png");
  }

  create() {
    // RENDER TITLE SCREEN
    this.add.image(400, 300, "rink1").setScale(4);
    var rect = this.add.rectangle(400, 300, 400, 300, 0xffffff, 0.7);
    this.add.text(
      220,
      150,
      "\nYou're Hired!\n\nWelcome to the Village Grove Park\nDistrict. We need you to 'zam\nthe ice after the beer league games\nat 11pm. Lock up when you're done.\n\nGood luck!",
      {
        fontSize: "18px",
        fill: "#000000",
      }
    );

    this.input.keyboard.once("keydown-SPACE", (event) => {
      console.log(`space up, moving to GAMEPLAY`);
      this.scene.start("GamePlay");
    });
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log(`spacebar up: moving to MENU,`);
      this.scene.start("GamePlay");
    }
  }
}
