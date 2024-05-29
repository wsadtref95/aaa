export function preloadSpikedBallc() {
  this.load.spritesheet('spikedBallc', './assets/On (38x38)red.png', { frameWidth: 38, frameHeight: 38 });
}

export function createSpikedBallc(collider) {

}

export function updateSpikedBallc() {
  this.spikedBallsc.children.iterate(spikedBallc => {
      if (!spikedBallc.isDead) {
          spikedBallc.setVelocityX(200 * spikedBallc.direction);

          if (spikedBallc.x >= spikedBallc.endX) {
              spikedBallc.direction = -1;
          } else if (spikedBallc.x <= spikedBallc.startX) {
              spikedBallc.direction = 1;
          }
      }
  });
}