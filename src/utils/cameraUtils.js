export function setupCamera(scene, player) {
  scene.cameras.main.startFollow(player, true);
}
