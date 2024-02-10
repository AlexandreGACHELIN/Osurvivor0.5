import Phaser from "phaser";

export class LootXP extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Appliquer le scaling ici
    this.setScale(2);

    this.xpIncrease = 10; // Cet exemple ajoute 10 à l'XP du joueur
  }
  
  // Effet de Gain d'XP
  xpEffect(player) {
    player.gainXP(this.xpIncrease);
    this.destroy(); // Détruire le loot une fois ramassé

}
}
