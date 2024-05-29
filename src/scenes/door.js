export function preloadDoor() {
    this.load.spritesheet('doorClosespritesheet', './assets/Closiong (46x56).png', { frameWidth: 46, frameHeight: 56 });
    this.load.spritesheet('doorOpenspritesheet', 'assets/Opening (46x56).png', { frameWidth: 46, frameHeight: 56 });
}

export function createDoor(collider) {
    

    this.anims.create({
        key: 'doorOpen',
        frames: this.anims.generateFrameNumbers('doorOpenspritesheet', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'doorClose',
        frames: this.anims.generateFrameNumbers('doorClosespritesheet', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0
    });

    
}

export function updateDoor() {

}