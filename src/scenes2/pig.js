export function preloadPig() {
  this.load.spritesheet('pigspritesheet', './assets/KingPig.png', { frameWidth: 80, frameHeight: 80 });
}

export function createPig(collider) {

  this.pigs.children.iterate(pig => {
    pig.anims.play('pigIdle');
    pig.isRunning = false; 
    pig.nextActionTime = 0; 
    pig.speed = 150; 
    pig.isDead = false; 
    pig.onceDead = false; 

    
  });

  this.anims.create({
    key: 'pigIdle',
    frames: this.anims.generateFrameNumbers('pigspritesheet', { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1
  });


  this.anims.create({
    key: 'pigRun',
    frames: this.anims.generateFrameNumbers('pigspritesheet', { start: 12, end: 17 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'pigDead',
    frames: this.anims.generateFrameNumbers('pigspritesheet', { start: 26, end: 31 }),
    frameRate: 10,
    repeat: 0
  });

  this.physics.add.collider(this.pigs, collider);
}

export function updatePig() {
  this.pigs.children.iterate(pig => {
    if (pig.isDead) {
      if (!pig.onceDead) {
        pig.onceDead = true;
        pig.body.setVelocity(0, 0);
        pig.anims.play('pigDead', true);
      }
      return;
    }
    if (pig.direction === 1 && pig.body.blocked.right) {
      pig.direction = -1;
      pig.setVelocityX(-100);
  } else if (pig.direction === -1 && pig.body.blocked.left) {
      pig.direction = 1;
      pig.setVelocityX(100);
  }

    if (this.time.now > pig.nextActionTime) {
      if (pig.isRunning) {
        
        pig.body.setVelocity(0, 0);
        pig.anims.play('pigIdle', true);
        pig.isRunning = false;
        pig.nextActionTime = this.time.now + Phaser.Math.Between(500, 1000); 
      } else {
        
        const direction = Phaser.Math.Between(0, 3);
        switch (direction) {
          case 0: 
            pig.body.setVelocityX(pig.speed); 
            pig.flipX = true; 
            break; 
          case 1: 
            pig.body.setVelocityX(-pig.speed); 
            pig.flipX = false; 
            break; 
          case 2: 
            pig.body.setVelocityY(pig.speed); 
            break; 
          case 3: 
            pig.body.setVelocityY(-pig.speed); 
            break; 
        }
        pig.anims.play('pigRun', true);
        pig.isRunning = true;
        pig.nextActionTime = this.time.now + Phaser.Math.Between(500, 1500); 
      }
    }
  });
}