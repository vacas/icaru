var title;
var instructions;
var highscore = 0;

WebFont.load({
  google: {
    families: ['Press Start 2P']
  }
});

var mainMenu = {

    preload: function() {
      game.load.image('background', 'assets/cloud_final_noclouds.png');
      game.load.image('clouds', 'assets/clouds-alone.gif');
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    },
    create: function() {
        game.add.image(0, 0, 'background');

        this.clouds = this.game.add.tileSprite(0,
          this.game.height - 550,
          this.game.width,
          this.game.cache.getImage('clouds').height,
          'clouds'
        );

        var title = this.game.add.text(350,50, 'ICARU', {font: "32px Press Start 2P", fill: "#000000"});
        title.setShadow(-3, 3, 'rgba(0,0,0,0.2)', 0);

        console.log(title);

        var instructions = this.game.add.text(150,300, 'Tap SPACEBAR or TAP to JUMP. \n\nTo start the game, use the same function.', {font: "14px Press Start 2P", align:"center",fill: "#000000"});
        instructions.setShadow(-3, 3, 'rgba(0,0,0,0.2)', 0);

        var hs = this.game.add.text(600, 20, "High Score: "+ highscore, {
            font: "14px Press Start 2P",
            fill: "#000"
        });

        spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

    },

    update: function() {
    this.clouds.tilePosition.x -= 0.50;

    if(this.game.input.activePointer.justPressed() || spaceKey.isDown === true){
      this.game.state.start('main');
    }
  }

};


var spaceKey;
var tap;

var mainState = {
    preload: function() {
        game.load.image('hero', 'assets/icarus-full.png');
        game.load.image('column', 'assets/col-full.png');
        game.load.image('columnBroken', 'assets/col-broken.png');
        game.load.image('columnUp', 'assets/col-full-upside.png');
        game.load.image('columnBrokenUp', 'assets/col-broken-upside.png');
        game.load.image('background', 'assets/cloud_final_noclouds.png');
        game.load.image('clouds', 'assets/clouds-alone.gif');
        game.load.audio('jump', 'assets/jump.wav');
        game.load.audio('point', 'assets/point.wav');
        game.load.audio('gameover', 'assets/gameover.wav');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    },

    create: function() {
        game.add.image(0, 0, 'background');

        this.clouds = this.game.add.tileSprite(0,
          this.game.height - 550,
          this.game.width,
          this.game.cache.getImage('clouds').height,
          'clouds'
        );

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.hero = game.add.sprite(100, 245, 'hero');

        game.physics.arcade.enable(this.hero);

        this.hero.body.gravity.y = 1000;

        spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

        tap = game.input.onDown.add(this.jump, this);

        spaceKey.onDown.add(this.jump, this);

        this.columns = game.add.group();

        this.columnsUp = game.add.group();

        this.columnsBroken = game.add.group();

        this.columnsBrokenUp = game.add.group();

        this.allColumns = [this.columns, this.columnsUp, this.columnsBroken, this.columnsBrokenUp];

        this.timer = game.time.events.loop(2250, this.addRowOfCol, this);

        this.score = 0;

        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Press Start 2P",
            fill: "#000"
        });

        this.hero.anchor.setTo(-0.2, 0.5);

        this.jumpSound = game.add.audio('jump');

        this.pointSound = game.add.audio('point');

        this.gameoverSound = game.add.audio('gameover');
    },

    update: function() {
        this.clouds.tilePosition.x -= 0.50;

        if (this.hero.y < 0 || this.hero.y > 600) {
            this.restartGame();
        }
        game.physics.arcade.overlap(
            this.hero, this.allColumns, this.hitCol, null, this
        );

        if (this.hero.angle < 20){
          this.hero.angle += 1;
        }

        if (this.columnsUp.getBounds().x <= -49 && this.columnsUp.getBounds().x >= -50 || this.columns.getBounds().x <= -49 && this.columns.getBounds().x >= -50){
          this.score += 1;
          this.labelScore.text = this.score;
          if (this.score > highscore){
            highscore = this.score;
          }
          this.pointSound.play();
        } else if (this.columnsBrokenUp.getBounds().x >= -100 && this.columnsBrokenUp.getBounds().x <= -99 || this.columnsBroken.getBounds().x >= -100 && this.columnsBroken.getBounds().x <= -99) {
          this.score += 1;
          this.labelScore.text = this.score;
          if (this.score > highscore){
            highscore = this.score;
          }
          this.pointSound.play();
        }
    },

    jump: function() {
        this.hero.body.velocity.y = -350;
        game.add.tween(this.hero).to({angle: -20}, 100).start();
        if (this.hero.alive === false) {
          return;
        }

        this.jumpSound.play();
    },

    restartGame: function() {
        game.state.start('menu');
    },

    addOneCol: function(x, y) {
        var column = game.add.sprite(x, y, 'column');

        this.columns.add(column);

        game.physics.arcade.enable(column);

        column.body.velocity.x = -200;

        column.checkWorldBounds = true;
        column.outOfBoundsKill = true;
    },

    addOneColUpside: function(x, y) {
        var columnUp = game.add.sprite(x, y, 'columnUp');

        this.columnsUp.add(columnUp);

        game.physics.arcade.enable(columnUp);

        columnUp.body.velocity.x = -200;

        columnUp.checkWorldBounds = true;
        columnUp.outOfBoundsKill = true;


    },

    addOneColBroken: function(x, y) {
        var columnBroken = game.add.sprite(x, y, 'columnBroken');

        this.columnsBroken.add(columnBroken);

        game.physics.arcade.enable(columnBroken);

        columnBroken.body.velocity.x = -400;

        columnBroken.checkWorldBounds = true;
        columnBroken.outOfBoundsKill = true;
    },

    addOneColBrokenUpside: function(x, y) {
        var columnBrokenUp = game.add.sprite(x, y, 'columnBrokenUp');

        this.columnsBrokenUp.add(columnBrokenUp);

        game.physics.arcade.enable(columnBrokenUp);

        columnBrokenUp.body.velocity.x = -400;

        columnBrokenUp.checkWorldBounds = true;
        columnBrokenUp.outOfBoundsKill = true;
    },

    addRowOfCol: function() {
        var hole = Math.floor(Math.random() * 300) + 1;
        var realHole = Math.random();

        // Rightside up columns
        for (var i = 1; i < 2; i++) {
            if (i != hole && i != hole + 300) {
                var otherside = realHole * -350;
                var othersideBroken = realHole * -500;
                if (Math.ceil(Math.random() * 3) == 3) {
                this.addOneColBroken(800, i * (othersideBroken + 650));
                this.addOneColBrokenUpside(800, i * (othersideBroken));
              } else {
                this.addOneCol(600, i * (otherside + 650));
                this.addOneColUpside(600, i * (otherside));
              }
            }
        }
    },

    hitCol: function() {
      if (this.hero.alive === false) {
        return;
      }

      this.hero.alive = false;

      this.gameoverSound.play();

      game.time.events.remove(this.timer);

      this.columns.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);

      this.columnsUp.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);

      this.columnsBroken.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);

      this.columnsBrokenUp.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);

      spaceKey = game.input.keyboard.removeKey(
          Phaser.Keyboard.SPACEBAR
      );

      tap = game.input.onDown.remove(this.jump, this);

    },


};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('main', mainState);

game.state.add('menu', mainMenu);

game.state.start('menu');
