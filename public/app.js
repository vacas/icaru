function Game() {}

Game.prototype = {
  start: function() {
    var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-area');

    game.state.add('main_chat', mainState_chat);
    game.state.add('menu_chat', mainMenu_chat);
    game.state.start('boot');
  }
};
