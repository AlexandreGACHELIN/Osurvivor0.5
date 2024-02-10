const createWeaponAnims = (anims) => {
  if (!anims.exists('projectile-anim')) {
    anims.create({
      key: 'projectile-anim', // Set a unique key for the animation
      frames: anims.generateFrameNumbers('projectile', {
        start: 0,
        end: 5,
      }), // Specify the range of frames
      frameRate: 16, // Adjust frame rate as needed
      repeat: -1, // Set to -1 to loop the animation indefinitely
    });
  }
};

export { createWeaponAnims };
