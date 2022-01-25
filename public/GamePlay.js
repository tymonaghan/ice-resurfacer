import Phaser from "phaser";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super("GamePlay");

    this.cursors, this.player;
    this.scuffs;
    this.score;
    this.scoreText;
    this.time;
    this.timeDisplay;
    this.boards;
    this.currentRinkName;
    this.gameOver = false;
    this.win = false;
    this.spacebar;
    this.timeLimit;
    this.gamestate;
  }
  preload() {
    this.load.setPath("assets/");

    this.load.image("red", "red.png");

    this.load.image("rink", "rink2.png");
    this.load.image("resurfacer", "resurfacer.png");
    this.load.image("scuff", "scuff.png");
    this.load.image("scuff2", "scuff2.png");
    this.load.image("boards", "boards.png");
    this.load.image("wall", "platform.png");
  }

  create() {
    //boards (write under the rink so they're invisible)
    this.boards = this.physics.add.staticGroup();
    // boards.create(400, 300, 'boards');
    this.boards.create(400, 72, "wall").setScale(2).refreshBody();
    this.boards.create(400, 590, "wall").setScale(2).refreshBody();
    this.boards.create(15, 350, "wall").setScale(2).setAngle(90).refreshBody();
    this.boards.create(780, 350, "wall").setScale(2).setAngle(90).refreshBody();

    // rink
    this.add.image(400, 300, "rink");
    // scuffs
    this.scuffs = this.physics.add.group({
      key: ["scuff", "scuff2"],
      repeat: 50,
      setXY: {
        x: 75,
        y: 150,
        stepX: 10,
      },
    });
    this.scuffs.children.iterate(function (child) {
      child.x = Phaser.Math.Between(100, 700);
      child.y = Phaser.Math.Between(115, 500);
    });

    // player / ice resurfacer
    this.player = this.physics.add.sprite(300, 200, "resurfacer").setScale(1.5);
    this.player.setBounce(0.1);
    this.player.setDamping(true);
    this.player.setDrag(0.38);
    this.player.setCollideWorldBounds(true);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // collisions/ pickups
    this.physics.add.overlap(
      this.player,
      this.scuffs,
      this.cleanScuff,
      null,
      this
    );
    this.physics.add.collider(this.player, this.boards);
    // not sure why i'm not colliding with the boards here

    // scoreboard and timer
    this.score = 0;
    this.scoreText = this.add.text(15, 15, "Score: 0", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    this.timeDisplay = this.add.text(15, 40, "Time: X", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    this.currentRinkName = this.add.text(
      380,
      15,
      "Current Rink:\nVillage Grove Park District",
      {
        align: "right",
        fontSize: "24px",
        fill: "#ffffff",
      }
    );

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.timeLimit = 99;

    // TITLE SCREEN
    // this.add.image(400, 300, "logo1").setScale(2);
    // this.add.image(400, 300, "logo2").setScale(2);
    // this.add.text(170, 300, "PRESS SPACEBAR TO PLAY", {
    //   fontSize: "32px",
    //   fill: "#ffff00",
    // });
  }

  update() {
    if (this.spacebar.isDown) {
      console.log(`you pressed spacebar, hooray`);
    }

    var up;

    if (this.player.angle > 0) up = true;
    if (this.player.angle < 0) up = false;

    if (this.cursors.left.isDown) {
      this.player.setAngle(this.player.angle - this.player.body.speed * 0.03);
    } else if (this.cursors.right.isDown) {
      this.player.setAngle(this.player.angle + this.player.body.speed * 0.03);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityX(Math.abs(this.player.angle) - 90);
      this.player.setVelocityY(
        // translating angle into x and y velocities sucks
        Math.abs(this.player.angle) < 180 - Math.abs(this.player.angle)
          ? up
            ? -Math.abs(this.player.angle) // going up and right
            : Math.abs(this.player.angle) // going down and right
          : up
          ? -180 + Math.abs(this.player.angle) // going up and left
          : 180 - Math.abs(this.player.angle) // going down and left
      );
    }
    this.time = Phaser.Math.FloorTo(
      this.sys.game.loop.time.toString() / 1000,
      0
    );
    if (this.time > this.timeLimit) {
      this.gameOver = true;
    }

    if (!this.gameOver) {
      this.timeDisplay.setText("Time: " + this.time);
    }

    if (this.gameOver) {
      this.physics.pause();
      if (this.win) {
        this.add.text(400, 300, "You did it!", {
          fontSize: "32px",
          fill: "#ffffff",
        });
      } else {
        this.add.text(400, 300, "You're fired!", {
          fontSize: "32px",
          fill: "#ffffff",
        });
      }
    }
  }

  cleanScuff(player, scuff) {
    scuff.disableBody(true, true);

    this.score += 1;
    this.scoreText.setText("Score: " + this.score);

    if (this.scuffs.countActive(true) === 0) {
      this.win = true;
      //  when all scuffs are collected, game over man, game over.
      // make the resurfacer sparkle all the time because why not
      var particles = this.add.particles("red");
      var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: "ADD",
      });
      emitter.startFollow(this.player);
      this.physics.pause();
      this.gameOver = true;
    }
  }
}
