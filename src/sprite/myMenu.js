import menuImg from "../assets/attack1.png"

export default class MyMenu extends Phaser.Scene {
    
    preload() {
        this.load.image("menuImg", menuImg);
    }

    create() {
        this.add.image(400, 300, "menuImg");
        this.spaceKey = this.input.keyboard.addKey("SPACE");
    }
    
    update() {
        if(this.spaceKey.isDown) {
            this.scene.start("MyGameKey");
        }
    }
}