export function preloaddoor() {
    this.load.image('doorIdle', './assets/Idle.png');
    this.load.spritesheet('doorClosespritesheet', './assets/Closiong (46x56).png', { frameWidth: 46, frameHeight: 56 });
    this.load.spritesheet('doorOpenspritesheet', './assets/Opening (46x56).png', { frameWidth: 46, frameHeight: 56 });
}

export function createdoor() {
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

    this.door = null;
    const doorObjects = this.map.getObjectLayer('point').objects.filter(obj => obj.name === 'door');
    doorObjects.forEach(doorObject => {
        this.door = this.physics.add.sprite(doorObject.x, doorObject.y, 'doorIdle');
        this.door.body.allowGravity = false;
        this.door.setVisible(true); // Initially visible
    });
}

export function interactWithDoor() {
    if (this.door) {
        // Play door open animation
        this.door.anims.play('doorOpen', true);

        // Play king 'In' animation
        this.king.anims.play('In', true);

        // Set a delay to play the door close animation
        this.time.delayedCall(500, () => {
            this.door.anims.play('doorClose', true);
        });
    }
}