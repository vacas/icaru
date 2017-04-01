
'use strict';
// function Menu() {}
//
// Menu.prototype = {
//   preload: function() {
//
//   },
//   create: function() {
//     var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
//     this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
//     this.sprite.anchor.setTo(0.5, 0.5);
//
//     this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
//     this.titleText.anchor.setTo(0.5, 0.5);
//
//     this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
//     this.instructionsText.anchor.setTo(0.5, 0.5);
//
//     this.sprite.angle = -20;
//     this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
//   },
//   update: function() {
//     if(this.game.input.activePointer.justPressed()) {
//       this.game.state.start('play');
//     }
//   }
// };
//
// module.exports = Menu;

// function mainMenu() {}

var mainMenu = {

    preload: function() {
        game.load.image('background', '../../assets/cloud_final_noclouds.png');
        game.load.image('clouds', '../../assets/clouds-alone.png');
        // game.load.audio('jinete', 'assets/eljinete2.mp3');
        // game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    },
    create: function() {
        game.add.image(0, 0, 'background');

        this.clouds = this.game.add.tileSprite(0,
            this.game.height - 550,
            this.game.width,
            this.game.cache.getImage('clouds').height,
            'clouds'
        );

        var title = this.game.add.text(350, 50, 'ICARU', {
            font: "32px Press Start 2P",
            fill: "#000000"
        });
        title.setShadow(-3, 3, 'rgba(0,0,0,0.2)', 0);

        var instructions = this.game.add.text(150, 300, 'Tap SPACEBAR or TAP to JUMP. \n\nTo start the game, use the same function.', {
            font: "14px Press Start 2P",
            align: "center",
            fill: "#000000"
        });
        instructions.setShadow(-3, 3, 'rgba(0,0,0,0.2)', 0);

        var credits = this.game.add.text(30, 500, "Credits:\nDesigns: José Daniel 'Mansuper' Vélez\nProgramming: Miguel Vacas", {
            font: "10px Press Start 2P",
            align: "left",
            fill: "#000000"
        });
        credits.setShadow(-3, 3, 'rgba(0,0,0,0.2)', 0);

        var hs = this.game.add.text(600, 20, "High Score: " + highscore, {
            font: "14px Press Start 2P",
            fill: "#000"
        });

        spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

        tabButton = game.input.keyboard.addKey(
            Phaser.Keyboard.TAB
        );

        chatButton = game.input.keyboard.addKey(
            Phaser.Keyboard.C
        );

        if (!jinete) {
            jinete = game.add.audio('jinete');
        }
        jinete.stop();

    },

    update: function() {
        this.clouds.tilePosition.x -= 0.50;

        if (this.game.input.activePointer.justPressed() || spaceKey.isDown === true) {
            game.state.start('play');
        }
        // if (tabButton.isDown === true) {
        //     this.game.state.start('menu_b');
        // }
        // if (chatButton.isDown === true) {
        //     this.game.state.start('menu_chat');
        // }
    },
};
console.log('menu');
// module.exports = mainMenu;
