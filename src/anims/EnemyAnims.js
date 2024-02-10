const createZombieAnims = (anims) => {
  if (!anims.exists('zombie-walk-side')) {
    anims.create({
      key: 'zombie-walk-side',
      frames: anims.generateFrameNumbers('zombieWalk', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

		anims.create({
      key: 'zombie-dead',
      frames: anims.generateFrameNumbers('zombieDead', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
};

export { createZombieAnims };
