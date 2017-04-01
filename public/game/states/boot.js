'use strict';

var Boot = {
  preload: function() {
    // this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    game.state.start('preload');
  }
};
