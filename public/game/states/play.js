'use strict';
// function Play() {}
// Play.prototype = {
//   create: function() {
//     this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
//     this.sprite.inputEnabled = true;
//
//     this.game.physics.arcade.enable(this.sprite);
//     this.sprite.body.collideWorldBounds = true;
//     this.sprite.body.bounce.setTo(1,1);
//     this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
//     this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
//
//     this.sprite.events.onInputDown.add(this.clickListener, this);
//   },
//   update: function() {
//
//   },
//   clickListener: function() {
//     this.game.state.start('gameover');
//   }
// };
//
// module.exports = Play;

// function mainState() {}
var mainState = {
    create: function() {
        this.add.image(0, 0, 'background');

        this.clouds = this.game.add.tileSprite(0,
            this.game.height - 550,
            this.game.width,
            this.game.cache.getImage('clouds').height,
            'clouds'
        );

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.hero = this.add.sprite(100, 245, 'hero');

        this.physics.arcade.enable(this.hero);

        this.hero.body.gravity.y = 1000;

        spaceKey = this.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

        tap = this.input.onDown.add(this.jump, this);

        spaceKey.onDown.add(this.jump, this);

        this.columns = this.add.group();

        this.columnsUp = this.add.group();

        this.columnsBroken = this.add.group();

        this.columnsBrokenUp = this.add.group();

        this.allColumns = [this.columns, this.columnsUp, this.columnsBroken, this.columnsBrokenUp];

        this.column_timer = this.time.events.loop(2250, this.addRowOfCol, this);

        // this.thunder_timer = this.time.events.loop(1000, this.thunder_strike, this);

        this.score = 0;

        this.labelScore = this.add.text(20, 20, "0", {
            font: "30px Press Start 2P",
            fill: "#000"
        });

        this.hero.anchor.setTo(-0.2, 0.5);

        this.jumpSound = this.add.audio('jump');

        this.pointSound = this.add.audio('point');

        this.gameoverSound = this.add.audio('gameover');

    },

    update: function() {
        // game.time.events.add(this.thunder_timer);

        this.clouds.tilePosition.x -= 0.50;

        if (this.hero.y < 0 || this.hero.y > 600) {
            this.restartGame();
        }
        this.physics.arcade.overlap(
            this.hero, this.allColumns, this.hitCol, null, this
        );

        if (this.hero.angle < 20) {
            this.hero.angle += 1;
        }

        if (this.columnsUp.getBounds().x <= -49 && this.columnsUp.getBounds().x >= -50 || this.columns.getBounds().x <= -49 && this.columns.getBounds().x >= -50) {
            this.score += 1;
            this.labelScore.text = this.score;
            if (this.score > highscore) {
                highscore = this.score;
            }
            this.pointSound.play();
        } else if (this.columnsBrokenUp.getBounds().x >= -100 && this.columnsBrokenUp.getBounds().x <= -99 || this.columnsBroken.getBounds().x >= -100 && this.columnsBroken.getBounds().x <= -99) {
            this.score += 1;
            this.labelScore.text = this.score;
            if (this.score > highscore) {
                highscore = this.score;
            }
            this.pointSound.play();
        }
    },

    jump: function() {
        this.hero.body.velocity.y = -350;
        this.add.tween(this.hero).to({
            angle: -20
        }, 100).start();
        if (this.hero.alive === false) {
            return;
        }

        this.jumpSound.play();
    },

    restartGame: function() {
        this.state.start('menu');
    },

    addOneCol: function(x, y) {
        var column = this.add.sprite(x, y, 'column');

        this.columns.add(column);

        this.physics.arcade.enable(column);

        column.body.velocity.x = -200;

        column.checkWorldBounds = true;
        column.outOfBoundsKill = true;
    },

    addOneColUpside: function(x, y) {
        var columnUp = this.add.sprite(x, y, 'columnUp');

        this.columnsUp.add(columnUp);

        this.physics.arcade.enable(columnUp);

        columnUp.body.velocity.x = -200;

        columnUp.checkWorldBounds = true;
        columnUp.outOfBoundsKill = true;


    },

    addOneColBroken: function(x, y) {
        var columnBroken = this.add.sprite(x, y, 'columnBroken');

        this.columnsBroken.add(columnBroken);

        this.physics.arcade.enable(columnBroken);

        columnBroken.body.velocity.x = -400;

        columnBroken.checkWorldBounds = true;
        columnBroken.outOfBoundsKill = true;
    },

    addOneColBrokenUpside: function(x, y) {
        var columnBrokenUp = this.add.sprite(x, y, 'columnBrokenUp');

        this.columnsBrokenUp.add(columnBrokenUp);

        this.physics.arcade.enable(columnBrokenUp);

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

        this.time.events.remove(this.column_timer);

        this.columns.forEach(function(col) {
            col.body.velocity.x = 0;
        }, this);

        this.columnsUp.forEach(function(col) {
            col.body.velocity.x = 0;
        }, this);

        this.columnsBroken.forEach(function(col) {
            col.body.velocity.x = 0;
        }, this);

        this.columnsBrokenUp.forEach(function(col) {
            col.body.velocity.x = 0;
        }, this);

        spaceKey = this.input.keyboard.removeKey(
            Phaser.Keyboard.SPACEBAR
        );

        tap = this.input.onDown.remove(this.jump, this);

    },

};
console.log('play');
// module.exports = mainState;
