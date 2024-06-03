// import Phaser from "phaser";
// import { preload, create, update } from "./MyMenu";
// import { preload, create, update } from './game2.js';
// import MyMenu from "./myMenu";
import MyGame from "./myGame";
import MyEnd from "./myEnd";
import { config } from "webpack";
import { types } from "babel-core";

// import { Scene } from "phaser";
// import { create, preload } from "../introduce/game1";



// class MyMenu extends Phaser.Scene {
//     preload() {
//         this.load.image("menuImg", menuImg);
//     }

//     create() {
//         this.add.image(400, 300, "menuImg");
//         this.spaceKey = this.input.keyboard.addKey("SPACE");
//     }
    
//     update() {
//         if(this.spaceKey.isDown) {
//             this.scene.start("MyGameKey");
//         }
//     }
// }

// **************************************

// class MyGame extends Phaser.Scene {
//     preload() {
//         this.load.image("gameImg", gameImg);
//     }

//     create() {
//         this.add.image(400, 300, "gameImg");
//         this.timeEvent = this.time.delayedCall(1000, this.endNow, [], this);
//     } 
//     update() {
//         this.scene.start("MyEndKey");
        
//     }
// }
// ********************************************

// class MyEnd extends Phaser.Scene {
//     preload() {
//         this.load.image("endImg", endImg);
//     }

//     create() {
//         this.add.image(400, 300, "endImg");

//         this.input.on("pointerdown", (pointer) => {
//             if (pointer.leftButtonDown()) {
//                 this.scene.start("MyMenuKey");
//             }
//         });
//     } 

// }

//***********************************************/

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1000 },
        debug: false
      }
    },
    scene:[]
  };

  function preload() {

  }

  function create() {

  }
    
  function update() {

  }
  const game = new Phaser.Game(config);

// game.scene.add("MyMenuKey", MyMenu);
game.scene.add("MyGameKey", MyGame);
game.scene.add("MyEndKey", MyEnd);

game.scene.start("MyMenuKey");