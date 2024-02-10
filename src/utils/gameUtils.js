export function handlePlayerDeath(scene) {
  scene.physics.pause();
  scene.displayGameOverText();
  scene.createRestartButton();
}