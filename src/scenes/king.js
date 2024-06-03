export function preloadKing() {
    this.load.spritesheet('kingspritesheet', './assets/king2.png', { frameWidth: 96, frameHeight: 96 });
  }
  
  export function createKing(collider) {
    this.anims.create({
      key: 'Idle',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'Attack',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 22, end: 24 }),
      frameRate: 10,
      repeat: 0
    });
  
    this.anims.create({
      key: 'Dead',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 27, end: 30 }),
      frameRate: 10,
      repeat: 0
    });
  
    this.anims.create({
      key: 'Run',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 14, end: 21 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'In',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 31, end: 38 }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'Out',
      frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 39, end: 46 }),
      frameRate: 10,
      repeat: 0
    });
  
    
    this.king.body.setSize(23, 31);
    this.physics.add.collider(this.king, collider);

    
  
    this.king.on("animationcomplete", (animation) => {
      if (animation.key === 'Attack') {
        this.iskingAttack = false;
      }
    });
  
    this.kingAttackZone = this.add.zone(400, 300, 16, 16);
    this.physics.add.existing(this.kingAttackZone);
    this.kingAttackZone.body.allowGravity = false;
  
    this.physics.add.overlap(this.kingAttackZone, this.pigs, (attackZone, pig) => {
      if (this.iskingAttack && !this.isPigDead) {
        this.isPigDead = true;
        console.log("HIT pig!");
        pig.anims.play('pigDead', true);
      }
    });
  }
  
  export function updateKing() {
    if (this.king.flipX) {
      this.kingAttackZone.x = this.king.x - 32;
      this.kingAttackZone.y = this.king.y;
    } else {
      this.kingAttackZone.x = this.king.x + 32;
      this.kingAttackZone.y = this.king.y;
    }
  
    if (!this.iskingDead) {
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        if (this.cursors.left.isDown) {
          this.king.setFlipX(true);
          this.king.body.setVelocityX(-100);
          if (!this.iskingAttack) {
            this.king.anims.play('Run', true);
          }
        } else {
          this.king.setFlipX(false);
          this.king.body.setVelocityX(100);
          if (!this.iskingAttack) {
            this.king.anims.play('Run', true);
          }
        }
      } else {
        this.king.body.setVelocityX(0);
        if (!this.iskingAttack) {
          this.king.anims.play('Idle', true);
        }
      }
      if (this.cursors.up.isDown && this.king.body.onFloor()) {
        this.king.body.setVelocityY(-500);
      }
    
      if (this.king.body.velocity.y < 0) {
        this.king.setTexture("kingspritesheet", 11);
      }
      if (this.king.body.velocity.y > 0) {
        this.king.setTexture("kingspritesheet", 12);
      }
    
      if (this.cursors.space.isDown && this.king.body.onFloor() && !this.iskingAttack) {
        this.iskingAttack = true;
        this.king.anims.play('Attack', true);
      }
      // if(this.cursors.up.isDown && this.king.body.onFloor()){
        
      // }
    }
  }