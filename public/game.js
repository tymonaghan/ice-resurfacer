import GamePlay from "../GamePlay";

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
    },
    scene: GamePlay,
  };

  var game = new Phaser.Game(config);
};
