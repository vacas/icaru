'use strict';

//global variables
var game, spaceKey, tap, highscore, column_timer, thunder_timer, thunder, tabButton, jinete, chatButton, title, instructions, highscore = 0;
// Boot, mainMenu, mainState, Preload,,


WebFont.load({
    google: {
        families: ['Press Start 2P']
    }
});

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-window');

  // Game States

  game.state.add('boot', Boot);

  // game.state.add('gameover', GameoverState);
  game.state.add('preload', Preload);

  game.state.add('menu', mainMenu);

  game.state.add('play', mainState);


  game.state.start('preload');

  console.log('loading');
};
