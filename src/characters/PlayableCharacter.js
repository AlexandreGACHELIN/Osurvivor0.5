export class PlayableCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.44, 0.44);
    this.setPushable(false);
    this.body.setSize(this.width * 0.1, this.height * 0.4);
    this.body.setOffset(50, 80); // Default body offset
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = this.speed;
    let velocityX = 0;
    let velocityY = 0;

		if (this.health > 0) {
			if (
				this.cursors.left.isDown ||
				this.scene.input.keyboard.addKey('Q').isDown
			) {
				velocityX = -speed; // Move left
				this.scaleX = -1; // Flip sprite horizontally
				this.body.offset.x = 65;
			}
			if (
				this.cursors.right.isDown ||
				this.scene.input.keyboard.addKey('D').isDown
			) {
				velocityX = speed; // Move right
				this.scaleX = 1; // Reset sprite flip
				this.body.offset.x = 50;
			}
			if (
				this.cursors.up.isDown ||
				this.scene.input.keyboard.addKey('Z').isDown
			) {
				velocityY = -speed; // Move up
			}
			if (
				this.cursors.down.isDown ||
				this.scene.input.keyboard.addKey('S').isDown
			) {
				velocityY = speed; // Move down
			}
	
			// Handle diagonal movement
			if (
				(this.cursors.left.isDown ||
					this.scene.input.keyboard.addKey('Q').isDown) &&
				(this.cursors.up.isDown || this.scene.input.keyboard.addKey('Z').isDown)
			) {
				velocityX *= Math.cos(Math.PI / 4);
				velocityY *= Math.sin(Math.PI / 4);
			}
			if (
				(this.cursors.right.isDown ||
					this.scene.input.keyboard.addKey('D').isDown) &&
				(this.cursors.up.isDown || this.scene.input.keyboard.addKey('Z').isDown)
			) {
				velocityX *= Math.cos(Math.PI / 4);
				velocityY *= Math.sin(Math.PI / 4);
			}
			if (
				(this.cursors.left.isDown ||
					this.scene.input.keyboard.addKey('Q').isDown) &&
				(this.cursors.down.isDown || this.scene.input.keyboard.addKey('S').isDown)
			) {
				velocityX *= Math.cos(Math.PI / 4);
				velocityY *= Math.sin(Math.PI / 4);
			}
			if (
				(this.cursors.right.isDown ||
					this.scene.input.keyboard.addKey('D').isDown) &&
				(this.cursors.down.isDown || this.scene.input.keyboard.addKey('S').isDown)
			) {
				velocityX *= Math.cos(Math.PI / 4);
				velocityY *= Math.sin(Math.PI / 4);
			}
	
			// Apply velocity
			this.setVelocity(velocityX, velocityY);
	
			// Play animation
			if (velocityX !== 0 || velocityY !== 0) {
				this.anims.play('walk-side', true);
			} else if (this.health > 0) {
				this.anims.play('idle', true);
			}
		}

   
  }
}
