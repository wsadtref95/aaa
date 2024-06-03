
import endImg from  "../assets/attack3.png";

export default class MyMenu extends Phaser.Scene {


    preload() {
        this.load.image("endImg", endImg);
    }

    create() {
        this.add.image(400, 300, "endImg");
        
        this.input.on("pointerdown", (pointer) => {
            if (pointer.leftButtonDown()) {
                this.scene.start("MyMenuKey");
            }
        });
    } 
}