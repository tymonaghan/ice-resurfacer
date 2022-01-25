import TitleScreen from "./TitleScreen";
import GamePlay from "./GamePlay";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
  },
  scene: [TitleScreen, GamePlay],
};

var game = new Phaser.Game(config);
