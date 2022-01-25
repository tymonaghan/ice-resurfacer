export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // this.load.setPath("./assets");
    this.load.image("logo1", "./logo1.png");
    this.load.image("logo2", "logo2.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
