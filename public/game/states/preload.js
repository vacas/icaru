
'use strict';

var Preload = {
  preload: function() {
    game.load.image('hero', '../../assets/icarus-full.png');
    game.load.image('vicarus', '../../assets/vicarus.png');
    game.load.image('column', '../../assets/col-full.png');
    game.load.image('columnBroken', '../../assets/col-broken.png');
    game.load.image('columnUp', '../../assets/col-full-upside.png');
    game.load.image('columnBrokenUp', '../../assets/col-broken-upside.png');
    game.load.image('background', '../../assets/cloud_final_noclouds.png');
    game.load.image('clouds', '../../assets/clouds-alone.png');
    game.load.image('thunder_bg', '../../assets/thunder-bg.png');
    game.load.image('wine-b', 'assets/8-bit-wine.png');
    game.load.image('background', '../../assets/cloud_final_noclouds.png');
    game.load.image('clouds', '../../assets/clouds-alone.png')
    game.load.audio('jump', '../../assets/jump.wav');
    game.load.audio('point', '../../assets/point.wav');
    game.load.audio('gameover', '../../assets/gameover.wav');
    game.load.audio('jinete', '../../assets/eljinete2.mp3');
  },
  create: function() {
    jinete = game.add.audio('jinete');
    jinete.play();
  },
  update: function() {
    game.state.start('menu');
  },
  onLoadComplete: function() {
    game.ready = true;
  }
};
