export function preloaddiamond() {
  this.load.spritesheet('diamondspritesheet', './assets/Lives and Coins.png', { frameWidth: 96, frameHeight: 96 });
}

export function creatediamond() {
  this.anims.create({
    key: 'DiamondIdle',
    frames: this.anims.generateFrameNumbers('diamondspritesheet', { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'DiamondCollected',
    frames: this.anims.generateFrameNumbers('diamondspritesheet', { start: 10, end: 12 }),
    frameRate: 10,
    repeat: 0
  });

 
  this.diamonds.children.iterate((diamond) => {
    diamond.body.allowGravity = false;
    diamond.anims.play('DiamondIdle', true);
  });
}

export function updatediamond() {
  this.diamonds.children.iterate((diamond) => {
    if (!diamond.isCollected) {
      diamond.anims.play('DiamondIdle', true);
    }
  });
}
