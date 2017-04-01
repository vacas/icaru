
'use strict';
// function Preload() {
//   this.asset = null;
//   this.ready = false;
// }

// Preload.prototype = {
//   preload: function() {
//     this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
//     this.asset.anchor.setTo(0.5, 0.5);
//
//     this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
//     this.load.setPreloadSprite(this.asset);
//     this.load.image('yeoman', 'assets/yeoman-logo.png');
//
//   },
//   create: function() {
//     this.asset.cropEnabled = false;
//   },
//   update: function() {
//     if(!!this.ready) {
//       this.game.state.start('menu');
//     }
//   },
//   onLoadComplete: function() {
//     this.ready = true;
//   }
// };
//
// module.exports = Preload;

var Preload = {
  preload: function() {
    // this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    // this.asset.anchor.setTo(0.5, 0.5);
    //
    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.load.setPreloadSprite(this.asset);
    game.load.image('hero', '../../assets/icarus-full.png');
    game.load.image('column', '../../assets/col-full.png');
    game.load.image('columnBroken', '../../assets/col-broken.png');
    game.load.image('columnUp', '../../assets/col-full-upside.png');
    game.load.image('columnBrokenUp', '../../assets/col-broken-upside.png');
    game.load.image('background', '../../assets/cloud_final_noclouds.png');
    game.load.image('clouds', '../../assets/clouds-alone.png');
    game.load.image('thunder_bg', '../../assets/thunder-bg.png');
    game.load.image('background', '../../assets/cloud_final_noclouds.png');
    game.load.image('clouds', '../../assets/clouds-alone.png')
    game.load.audio('jump', '../../assets/jump.wav');
    game.load.audio('point', '../../assets/point.wav');
    game.load.audio('gameover', '../../assets/gameover.wav');;
    game.load.audio('jinete', '../../assets/eljinete2.mp3');

  },
  create: function() {
    // this.asset.cropEnabled = false;
  },
  update: function() {
    // if(!!game.ready) {
      console.log('hello');
      game.state.start('menu');
    // }
  },
  onLoadComplete: function() {
    game.ready = true;
  }
};
console.log('preload');
// module.exports = Preload;
