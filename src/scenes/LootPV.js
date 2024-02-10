import Phaser from "phaser";

export class LootPV extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Appliquer le scaling ici
    this.setScale(3);

    this.pvIncrease = 10; // Cet exemple ajoute 10 à la puissance du joueur
  }

  // Effet de Heal
  healEffect(player) {
    console.log("Healing effect triggered");
    player.heal(this.pvIncrease); // Utilisez la méthode heal de Wizard pour incrémenter la santé
    this.destroy(); // Détruire le loot une fois ramassé

}
}
