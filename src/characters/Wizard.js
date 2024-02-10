import { PlayableCharacter } from "./PlayableCharacter";

export class Wizard extends PlayableCharacter {
  constructor(scene, x, y, texture, speed) {
    super(scene, x, y, texture);

    this.speed = 200;

    this.health = 100;
    this.maxHealth = 100;
    
    this.tintTimer = null; // Variable pour stocker le timer pour la teinte temporaire
    this.deadAnimationPlayed = false; // Flag to track if the "dead" animation has been played
    
    this.attack = 25;
    this.lastAttackTime = 0;
    this.attackCooldown = 1000;

    this.xp = 0; // XP actuelle
    this.xpToNextLevel = 100; // XP nécessaire pour le prochain niveau
  }

  update(scene) {
    // Ensure that the object still exists before accessing properties or calling methods
    if (!this.scene || !this.active) {
      return;
    }
    super.update(scene);
  }
  
  // Define a damage method
  damage(amount) {
    // Reduce player's health by the specified amount
    this.health -= amount;
    console.log(`Wizard takes ${amount} damage. Health: ${this.health}`);
    // Check if the player is dead
    if (this.health <= 0 && !this.deadAnimationPlayed) {
      this.deadAnimationPlayed = true; // Set flag to prevent multiple plays of the animation
      this.anims.play("dead", true);

      this.once("animationcomplete", () => {
        // Destroy the character object after the dead animation has played
        this.destroy();
      });
    }
  }

  // Méthode pour soigner le joueur
  heal(amount) {
    this.health += amount;
    this.health = Phaser.Math.Clamp(this.health, 0, this.maxHealth);
  }

  gainXP(amount) {
    this.xp += amount;
    if (this.xp >= this.xpToNextLevel) {
      // Logique pour monter de niveau
      this.xp -= this.xpToNextLevel; // Soustraire l'XP nécessaire et monter de niveau
      // Augmentez xpToNextLevel selon votre logique de jeu, ajustez la santé, etc.
    }
    // Mettre à jour la barre d'XP ici
    this.scene.updateXPBar();
  }


}
