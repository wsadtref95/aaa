import gameImg from "../assets/attack2.png"


export default class MyMenu extends Phaser.Scene {


    preload() {
        this.load.image("gameImg", gameImg);
    }

    create() {
        this.add.image(400, 300, "gameImg");
        this.timeEvent = this.time.delayedCall(1000, this.endNow, [], this);
    }
    update() {
        this.scene.start("MyEndKey");

    }


}