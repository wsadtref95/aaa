import { creatediamond, preloaddiamond, updatediamond } from './diamond.js';
import { preloadKing, createKing, updateKing } from './king.js';
import { preloadPig, createPig, updatePig } from './pig.js';
import { preloadSpikedBall, createSpikedBall, updateSpikedBall } from './spikedBall.js';
// import { preloadDoor, createDoor, updateDoor } from './door.js';


export function preload() {
    preloadKing.call(this);
    preloadPig.call(this);
    preloaddiamond.call(this);
    preloadSpikedBall.call(this);
    // preloadDoor.call(this);

    this.load.tilemapTiledJSON('map', 'map/map2.json');
    this.load.image('tiles', 'map/Terrain (32x32).png');

}

export function create() {
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('Terrain (32x32)', 'tiles');
    var bg = map.createStaticLayer('bg', tiles, 0, 0);
    var collider = map.createStaticLayer('collider', tiles, 0, 0);
    collider.setCollisionByExclusion([-1]);

    var invisibleWalls = map.createStaticLayer('invisibleWalls', tiles, 0, 0);
    invisibleWalls.setCollisionByExclusion([-1]);

    this.isDiamondCollected = false;
    this.iskingAttack = false;
    this.iskingDead = false;

    const pointObjects = map.getObjectLayer('point').objects;

    const kingObjects = pointObjects.filter(obj => obj.name === 'king');
    const pigObjects = pointObjects.filter(obj => obj.name === 'pig');
    const diamondObjects = pointObjects.filter(obj => obj.name === 'diamond');
    const spikedBallObjects = pointObjects.filter(obj => obj.name === 'spikedBall');

    kingObjects.forEach(kingObject => {
        this.king = this.physics.add.sprite(kingObject.x, kingObject.y, 'kingspritesheet');
        this.king.body.setSize(23, 31);
        this.king.anims.play('Idle');
    });

    this.pigs = this.physics.add.group();
    pigObjects.forEach(pigObject => {
        const pig = this.physics.add.sprite(pigObject.x, pigObject.y, 'pigspritesheet');
        pig.body.setSize(16, 23);
        pig.body.immovable = true;
        pig.body.setVelocityX(100);
        pig.anims.play('pigIdle');
        pig.direction = 1;
        this.pigs.add(pig);
    });

    this.diamonds = this.physics.add.group();
    diamondObjects.forEach(diamondObject => {
        const diamond = this.physics.add.sprite(diamondObject.x, diamondObject.y, 'diamondspritesheet');
        diamond.body.setSize(14, 14);
        diamond.anims.play('DiamondIdle');
        this.diamonds.add(diamond);
        diamond.body.allowGravity = false;
    });

    this.spikedBalls = this.physics.add.group();
    spikedBallObjects.forEach(spikedBallObject => {
      const spikedBall = this.physics.add.sprite(spikedBallObject.x, spikedBallObject.y, 'spikedBall');
      spikedBall.body.setSize(38, 38);
      spikedBall.body.allowGravity = false; 
      spikedBall.isDead = false;
      spikedBall.direction = 1; 
      spikedBall.startX = spikedBallObject.x; 
      spikedBall.endX = spikedBallObject.x + 200; 
      this.spikedBalls.add(spikedBall);
      


        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('spikedBall', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        spikedBall.anims.play('spin', true);
    });

    createKing.call(this, collider);
    createPig.call(this, collider);
    creatediamond.call(this, collider);


    this.physics.add.collider(this.king, collider);
    this.physics.add.collider(this.pigs, collider);
    this.physics.add.collider(this.pigs, invisibleWalls);
    this.physics.add.collider(this.spikedBalls, invisibleWalls);


    this.physics.add.overlap(this.kingAttackZone, this.pigs, (attackZone, pig) => {
        if (this.iskingAttack && !pig.isDead) {
            pig.isDead = true;
            console.log("HIT pig!");
            pig.anims.play('pigDead', true);
        }
    });

    this.physics.add.overlap(this.king, this.diamonds, (king, diamond) => {
        if (!diamond.isCollected) {
            diamond.isCollected = true;
            diamond.anims.play('DiamondCollected', true);
            diamond.on('animationcomplete', () => {
                diamond.destroy();
            });
        }
    });

    this.physics.add.overlap(this.king, this.pigs, (king, pig) => {
        if (!this.iskingDead && !pig.isDead) {
            this.iskingDead = true;
            this.king.body.setVelocity(0, -300);
            king.anims.play('Dead', true);

        }
    });

    this.physics.add.overlap(this.king, this.spikedBalls, (king, spikedBall) => {
        if (!this.iskingDead) {
            this.iskingDead = true;
            this.king.body.setVelocity(0, -300);
            king.anims.play('Dead', true);

        }
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setZoom(1.5);
    this.cameras.main.startFollow(this.king);


}

export function update() {
    updateKing.call(this);
    updatePig.call(this);
    updatediamond.call(this);
    updateSpikedBall.call(this);
}

