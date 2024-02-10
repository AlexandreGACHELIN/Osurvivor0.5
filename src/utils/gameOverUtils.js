export function displayGameOverText(scene, player) {
  player.once('animationcomplete', () => {
		scene.anims.pauseAll();
    scene.add
      .text(player.x, player.y, 'Game Over', {
        fontFamily: 'Arial',
        fontSize: 48,
        color: '#ff0000',
      })
      .setOrigin(0.5);
  });
}

export function createRestartButton(scene, player) {
	player.once('animationcomplete', () => {
    const restartButton = scene.add
      .text(player.x, player.y + 50, 'Restart', {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5);
    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
			scene.anims.resumeAll();
      scene.scene.restart();
    });
  });
}