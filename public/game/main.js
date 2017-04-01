'use strict';

//global variables
var game, spaceKey, tap, highscore, column_timer, thunder_timer, thunder, tabButton, jinete, chatButton, title, instructions, highscore = 0, playing;
// Boot, mainMenu, mainState, Preload,,


WebFont.load({
    google: {
        families: ['Press Start 2P']
    }
});

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-window');

  // GAME MENUS
  var mainMenu = creatingMenu('ICARU', '', 'play', 'menu_jinete', 'menu_chat');
  var jineteMenu = creatingMenu('EL JINETE', "Music: 'El Jinete' by Jose Alfredo Jimenez", 'play_jinete', 'menu', 'menu_chat');
  var vicarusMenu = creatingMenu('VICARUS', '', 'play_chat', 'menu_jinete', 'menu');

  // GAME STATES
  var mainState = creatingPlay('menu', '');
  var jineteState = creatingPlay('menu_jinete', 'jinete');
  var vicarusState = creatingPlay('menu_chat', 'vicarus');

  game.state.add('boot', Boot);

  game.state.add('preload', Preload);

  // ALL MENUS
  game.state.add('menu', mainMenu);
  game.state.add('menu_jinete', jineteMenu);
  game.state.add('menu_chat', vicarusMenu);

  // ALL STATES
  game.state.add('play', mainState);
  game.state.add('play_jinete', jineteState);
  game.state.add('play_chat', vicarusState);


  game.state.start('preload');
};
