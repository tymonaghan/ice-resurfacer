import TitleScreen from "./TitleScreen";
import Menu from "./Menu";
import GamePlay from "./GamePlay";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
  },
  scene: [TitleScreen, Menu, GamePlay],
};

var game = new Phaser.Game(config);
