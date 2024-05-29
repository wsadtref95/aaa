export function preloadSpikedBall() {
  this.load.spritesheet('spikedBall', './assets/On (38x38).png', { frameWidth: 38, frameHeight: 38 });
}

export function createSpikedBall(collider) {

}

export function updateSpikedBall() {
  this.spikedBalls.children.iterate(spikedBall => {
      if (!spikedBall.isDead) {
          spikedBall.setVelocityX(100 * spikedBall.direction);

          if (spikedBall.x >= spikedBall.endX) {
              spikedBall.direction = -1;
          } else if (spikedBall.x <= spikedBall.startX) {
              spikedBall.direction = 1;
          }
      }
  });
}