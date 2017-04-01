
'use strict';

// function Boot() {
// }

var Boot = {
  preload: function() {
    // this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    // this.game.input.maxPointers = 1;
    game.state.start('preload');
  }
};

  console.log('boot');
// module.exports = Boot;
