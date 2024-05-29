
// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   pixelArt: true,
//   parent: 'game',
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 1000 },
//       debug: false
//     }
//   },

  
//   scene: {
//     preload: preload,
//     create: create,
//     update: update
//   }
// };

// const game = new Phaser.Game(config);

// function preload() {

  
  

//   this.load.tilemapTiledJSON('map','map/map1.json');
//   this.load.image('tiles','map/Terrain (32x32).png')

 

//   this.iskingDead = false
//   this.load.spritesheet('kingspritesheet', './assets/king2.png', { frameWidth: 96, frameHeight: 96 });
  
//   this.load.spritesheet('pigspritesheet', './assets/KingPig.png',{frameWidth: 80, frameHeight: 80});

//   this.load.spritesheet('pigboxsheet','assets/PigBox.png',{frameWidth: 80, frameHeight: 80})



//   this.load.spritesheet('diamond', 'assets/Lives and Coins.png',{frameWidth: 96, frameHeight: 96})
  

  
// }
// function create() {

//   var map = this.make.tilemap({
//     key: 'map'
//   })
//   var tiles = map.addTilesetImage('Terrain (32x32)', 'tiles')
//   var bg = map.createStaticLayer('bg', tiles, 0, 0)
//   var collider = map.createStaticLayer('collider', tiles, 0 ,0)
//   collider.setCollisionByExclusion([-1])
//   // collider.setCollisionFromcollisionGroup(true, false)
//   // const kingObjects = map.createFromObjects("point", {
//   //   name: "king",
//   //   key: 'kingspritesheet'
//   // });
  
//   // kingObjects.forEach(kingObject => {
//   //   this.physics.world.enable(kingObject);
//   //   kingObject.body.setSize(23, 31);
//   //   kingObject.anims.play('Idle'); // 播放預設動畫
//   //   this.king = kingObject; // 將其中一個物件設為 this.king
//   // });

//   this.isDiamondCollected = false

//   this.iskingAttack = false








//   const diamond = this.physics.add.sprite(350,300,'diamond');


//   diamond.body.allowGravity = false;
//   diamond.body.setSize(14,14);


//   this.anims.createFromAseprite('kingspritesheet');
//   this.king = this.physics.add.sprite(400, 250, 'kingspritesheet');
//   this.king.setPosition(686,1371)
//   // this.pig.setPosition(1620,1008)
  

//   const Idle = {
//     key: 'Idle',
//     frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 0, end: 10 }),
//     frameRate: 10,
//     repeat: -1      
//   }
//   this.anims.create(Idle)
  

   
//   const Attack = {
//     key: 'Attack',
//     frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 22, end: 24 }),
//     frameRate: 10,
//     repeat: 0  
//   }
//   this.anims.create(Attack)

//   const Dead = {
//     key: 'Dead',
//     frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 27, end: 30 }),
//     frameRate: 10,
//     repeat: 0      
//   }
//   this.anims.create(Dead)

//   const Run = {
//     key: 'Run',
//     frames: this.anims.generateFrameNumbers('kingspritesheet', { start: 14, end: 21 }),
//     frameRate: 10,
//     repeat: -1      
//   }
//   this.anims.create(Run)



  
//   this.isPigDead = false
//   this.anims.createFromAseprite('pigspritesheet');
//   this.pig = this.physics.add.sprite(430, 250, 'pigspritesheet');
//   this.pig.body.setSize(16, 23);

//   const pigIdle = {
//     key: 'pigIdle',
//     frames: this.anims.generateFrameNumbers('pigspritesheet', { start: 0, end: 11 }),
//     frameRate: 10,
//     repeat: -1      
//   }
//   this.anims.create(pigIdle)


//   const pigDead = {
//     key: 'pigDead',
//     frames: this.anims.generateFrameNumbers('pigspritesheet', { start: 28, end: 31 }),
//     frameRate: 10,
//     repeat: 0 
//   }
//   this.anims.create(pigDead)


//   const DiamondIdle = {
//     key: 'DiamondIdle',
//     frames: this.anims.generateFrameNumbers('diamond', { start: 0, end: 9 }),
//     frameRate: 10,
//     repeat: -1 
//   }
//   this.anims.create(DiamondIdle)

//   diamond.anims.play('DiamondIdle')

//   const DiamondCollected = {
//     key: 'DiamondCollected',
//     frames: this.anims.generateFrameNumbers('diamond', { start: 10, end: 12 }),
//     frameRate: 10,
//     repeat: 0,
//   }
//   this.anims.create(DiamondCollected)

  

//   this.isPigboxDead = false
//   this.anims.createFromAseprite('pigboxsheet');
//   this.pigbox = this.physics.add.sprite(370, 250, 'pigboxsheet');
//   this.pigbox.body.setSize(16, 23);

//   const pigboxIdle ={
//     key: 'pigboxIdle',
//     frames: this.anims.generateFrameNumbers('pigboxsheet', { start: 5, end: 13 }),
//     frameRate: 10,
//     repeat: -1   
//   }
//   this.anims.create(pigboxIdle)

  


//   this.kingAttackZone = this.add.zone(400, 300, 16, 16)
//   this.physics.add.existing(this.kingAttackZone)
//   this.kingAttackZone.body.allowGravity = false

  
  
  
//   this.physics.add.collider(this.king, collider);
//   this.physics.add.collider(this.pig, collider);


//   this.physics.add.overlap(this.king, diamond, (king,diamond) =>{
//     if(!this.isDiamondCollected) {
//       this.isDiamondCollected = true
//       diamond.anims.play('DiamondCollected', true)
//     }
//   })


//   this.physics.add.overlap(this.king, this.pig, (king,pig) =>{
//     if (!this.iskingDead && !this.isPigDead){
//       this.iskingDead = true
//       this.king.body.setVelocity(0,-300)
//       king.anims.play('Dead',true)
//     }  
//   })
 
  
  
//   this.physics.add.overlap(this.kingAttackZone,this.pig, (attackZone,pig) =>{
//     if (this.iskingAttack && !this.isPigDead) {
//       this.isPigDead = true
//       console.log("HIT pig!")
//       pig.anims.play('pigDead',true)     
//     }
//   })

  
  

//   this.king.body.setSize(23, 31);
//   this.king.on("animationcomplete", (animation) => {
//     if (animation.key === 'Attack') {
//       this.iskingAttack = false
//     }
//   })


//   this.cursors = this.input.keyboard.createCursorKeys();

//   this.cameras.main.setZoom(2);
//   this.cameras.main.startFollow(this.king)
// }

// function update() {
//   if (this.king.flipX) {
//     this.kingAttackZone.x = this.king.x - 32
//     this.kingAttackZone.y = this.king.y
//   } else {
//     this.kingAttackZone.x = this.king.x + 32
//     this.kingAttackZone.y = this.king.y
//   }
  
 
//   if (!this.iskingDead)  {
//     if (this.cursors.left.isDown || this.cursors.right.isDown) {
//     if (this.cursors.left.isDown) {
//       this.king.setFlipX(true)
//       this.king.body.setVelocityX(-100)
//       if (!this.iskingAttack){
//         this.king.anims.play('Run', true)
//       }
//     } else {
//       this.king.setFlipX(false)
//       this.king.body.setVelocityX(100)
//       if (!this.iskingAttack) {
//       this.king.anims.play('Run', true)
//     }
//   }
    
//   } else {
//     this.king.body.setVelocityX(0);
//     if (!this.iskingAttack) {
//       this.king.anims.play('Idle', true);
//     }
    
//   }

//   if (this.cursors.up.isDown && this.king.body.onFloor()) {
//     this.king.body.setVelocityY(-800);    
//   }

//   if(this.king.body.velocity.y < 0) {
//     this.king.setTexture("kingspritesheet", 11)
//   }
//   if(this.king.body.velocity.y > 0) {
//     this.king.setTexture("kingspritesheet", 12)
//   }

//   if(this.cursors.space.isDown && this.king.body.onFloor() && !this.iskingAttack) {
//     this.iskingAttack = true
//     this.king.anims.play('Attack',true)
//   }
// }


 

//   this.pigbox.anims.play('pigboxIdle', true)

// }
