/**
 * Définit les collisions pour une scène particulière.
 */
export function setupColliders(scene, player, map, zombies) {
  scene.physics.add.collider(player, map.wallsLayer);
  scene.physics.add.collider(zombies, map.wallsLayer);
  scene.physics.add.collider(zombies, zombies);
  scene.physics.add.collider(
    zombies,
    player,
    scene.handleZombiePlayerCollision,
    null,
    scene
  );
}

/**
 * Gère les interactions entre le joueur et les zombies.
 * @param {Phaser.GameObjects.Sprite} player Le sprite représentant le joueur.
 * @param {Phaser.GameObjects.Sprite} zombie Le sprite représentant le zombie.
 * @param {Scene} scene La scène courante.
 */
export function handleZombiePlayerCollision(player, zombie, scene) {
  // Modification de l'état de la collision
  scene.isCollision = true;
  // Changement de la couleur du personnage en rouge
  player.setTintFill(0xff0000);

  if (!player.damageTimer || scene.time.now > player.damageTimer) {
    player.damage(5);
    player.damageTimer = scene.time.now + 250;
    scene.updateHealthBar(player);
  }
}

/**
 * Définit les chevauchements (overlaps) pour une scène particulière.
 */
export function setupOverlaps(scene, player, lootsPV, lootsXP) {
  // Chevauchement pour les potions de PV
  scene.physics.add.overlap(player, scene.lootsPV, (player, lootPV) => {
    console.log("LootPV overlap detected");
    lootPV.healEffect(player);
  });

  // Chevauchement pour les gemmes d'XP
  scene.physics.add.overlap(player, scene.lootsXP, (player, lootXP) => {
    console.log("LootXP overlap detected");
    lootXP.xpEffect(player);
  });
}