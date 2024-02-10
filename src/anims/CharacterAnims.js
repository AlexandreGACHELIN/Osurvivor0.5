const createRaiderAnims = (anims) => {
  if (!anims.exists('walk-side')) {
    anims.create({
      key: 'walk-side',
      frames: anims.generateFrameNumbers('raiderWalk', {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!anims.exists('idle')) {
    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers('raiderIdle', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
};

const createWizardAnims = (anims) => {
  if (!anims.exists('walk-side')) {
    anims.create({
      key: 'walk-side',
      frames: anims.generateFrameNumbers('wizardWalk', {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  if (!anims.exists('idle')) {
    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers('wizardIdle', {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  if (!anims.exists('dead')) {
    anims.create({
      key: 'dead',
      frames: anims.generateFrameNumbers('wizardDead', {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: 0,
    });
  }
};

export { createRaiderAnims, createWizardAnims };
