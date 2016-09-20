var mainState = {
    preload: function() {
        game.load.image('hero', 'assets/icarus-full.png');
        game.load.image('column', 'assets/col-full.png');
        game.load.image('columnBroken', 'assets/col-broken.png');
        game.load.image('columnUp', 'assets/col-full-upside.png');
        game.load.image('columnBrokenUp', 'assets/col-broken-upside.png');
        game.load.image('clouds', 'assets/cloud_final.gif');
        game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // game.stage.image(800, 600, 'clouds');

        game.add.image(0, 0, 'clouds');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.hero = game.add.sprite(100, 245, 'hero');

        game.physics.arcade.enable(this.hero);

        this.hero.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );
        spaceKey.onDown.add(this.jump, this);

        this.columns = game.add.group();

        this.columnsUp = game.add.group();

        this.allColumns = [this.columns, this.columnsUp];

        this.timer = game.time.events.loop(1500, this.addRowOfCol, this);

        this.score = 0;

        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#000"
        });

        this.hero.anchor.setTo(-0.2, 0.5);

        this.jumpSound = game.add.audio('jump');
    },

    update: function() {
        if (this.hero.y < 0 || this.hero.y > 600) {
            this.restartGame();
        }
        game.physics.arcade.overlap(
            this.hero, this.allColumns, this.hitCol, null, this
        );

        if (this.hero.angle < 20){
          this.hero.angle += 1;
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
        game.state.start('main');
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

    //need to check this block
    addRowOfCol: function() {
        var hole = Math.floor(Math.random() * 300) + 1;
        var realHole = Math.random();
        // addOneCol.body.y = hole * 50;

        // Rightside up columns
        for (var i = 1; i < 2; i++) {
            if (i != hole && i != hole + 300) {
                var otherside = realHole * -350;
                this.addOneCol(400, i * (otherside + 650));
                this.addOneColUpside(400, i * (otherside));
            }
        }

        // Upside down columns
        // for (var n = -7; i < -5; i++) {
        //     if (n != hole && n != hole + 1) {
        //         this.addOneColUpside(400, n * 60 + 10);
        //     }
        // }

        this.score += 1;
        this.labelScore.text = this.score;
    },

    hitCol: function() {
      if (this.hero.alive === false) {
        return;
      }

      this.hero.alive = false;

      game.time.events.remove(this.timer);

      this.columns.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);

      this.columnsUp.forEach(function(col){
        col.body.velocity.x = 0;
      }, this);
    },


};

var game = new Phaser.Game(800, 600);

game.state.add('main', mainState);

game.state.start('main');
