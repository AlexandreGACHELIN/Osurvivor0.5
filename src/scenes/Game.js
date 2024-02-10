import { Scene } from "phaser";
import { createZombieAnims } from "../anims/EnemyAnims";
import { createWizardAnims } from "../anims/CharacterAnims";
import { createWeaponAnims } from "../anims/weaponAnims";
import { Zombie } from "../enemies/Zombie";
import { Wizard } from "../characters/Wizard";
import {
  createRestartButton,
  displayGameOverText,
} from "../utils/gameOverUtils";
import { handlePlayerDeath } from "../utils/gameUtils";
import { setupCamera } from "../utils/cameraUtils";
import {
  handleZombiePlayerCollision,
  setupColliders,setupOverlaps
} from "../utils/colliderUtils";
import { catacombsMap } from "../stages/CatacombsMap";
import { LootPV } from "./LootPV";
import { LootXP } from "./LootXP";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.gamePaused = false;

    this.isCollision = false;

    this.playerHealth = 100; // Santé initiale du joueur
    this.playerMaxHealth = 100; // Santé maximale du joueur
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.map = new catacombsMap(this);
    this.map.create();
    this.createAnimations();
    this.createPlayer();
    this.createZombies();
    this.createXPBar();
    this.createLootsPV();
    this.createLootsXP();
    setupColliders(this, this.player, this.map, this.zombies);
    setupCamera(this, this.player);
    setupOverlaps(this, this.player, this.lootsPV, this.lootsXP);

    // CODE ALEX
    //Spawn Enemy toutes les 5 secondes
    this.spawnEvent = this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true,
    });

    //Barre de vie
    this.healthBar = this.add.graphics();
    this.updateHealthBar();

    //Pause sur Echap
    this.input.keyboard.on("keydown-ESC", () => {
      this.gamePaused = !this.gamePaused;
      if (this.gamePaused) {
        this.pauseGame();
      } else {
        this.resumeGame();
      }
    });

    this.lootsPV.children.iterate((child) => child.setActive(true).setVisible(true));
    this.lootsXP.children.iterate((child) => child.setActive(true).setVisible(true));
  }

  update(time, delta) {
    if (this.gamePaused) return;

    // console.log('FPS', this.game.loop.actualFps);

    // const frameRate = 1000 / delta;
    // console.log('FPS', frameRate);

    this.player.update();
    this.zombies.getChildren().forEach((zombie) => {
      zombie.update();
    });

    if (this.player.health <= 0) {
      handlePlayerDeath(this);
    }

    if (!this.isCollision) {
      this.player.clearTint();
    }
    this.isCollision = false;

    // <ALEX CODE>
    // Nouvelle méthode pour gérer l'attaque automatique éclair
    this.handleAutoAttack(time);

    this.updateHealthBar();
    this.updateHealthBarPosition();

    // </ALEX CODE>
  }

  //Réglage Mode Pause
  pauseGame() {
    if (this.spawnEvent) this.spawnEvent.paused = true;
    this.anims.pauseAll();
    this.physics.pause();
    this.displayPauseText(); // Affiche le texte de pause correctement centré
  }

  //Réglage Mode Resumes
  resumeGame() {
    if (this.spawnEvent) this.spawnEvent.paused = false;
    this.physics.resume();
    this.anims.resumeAll();
    if (this.pauseText) {
      this.pauseText.destroy(); // Supprime ou cache le texte de pause
      this.pauseText = null; // Assurez-vous de réinitialiser la référence à null
    }
  }

  //Ecran pause
  displayPauseText() {
    // Supprime le texte de pause précédent s'il existe
    if (this.pauseText) {
      this.pauseText.destroy();
    }
    this.pauseText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Pause", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#ff0000",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(100);
  }

  createAnimations() {
    createZombieAnims(this.anims);
    createWizardAnims(this.anims);
    createWeaponAnims(this.anims);
  }

  createPlayer() {
    this.player = new Wizard(this, 959 / 2, 640 / 2, "wizardWalk", 300);
    this.add.existing(this.player);
  }

  createZombies() {
    this.zombies = this.physics.add.group({
      classType: Zombie,
    });
  }

  createLootsPV() {
    this.lootsPV = this.physics.add.group({
      classType: LootPV,
      runChildUpdate: true,
    });
  }

  createLootsXP() {
    this.lootsXP = this.physics.add.group({
      classType: LootXP,
      runChildUpdate: true,
    });
  }

  createXPBar() {
    // Initialisation de la barre d'XP, similaire à la barre de santé
    this.xpBarBackground = this.add.graphics({
      fillStyle: { color: 0x808080 },
    });
    this.xpBarFill = this.add.graphics({ fillStyle: { color: 0xffff00 } }); // Jaune pour l'XP

    // Fixer la barre d'XP à la caméra
    this.xpBarBackground.setScrollFactor(0);
    this.xpBarFill.setScrollFactor(0);

    this.updateXPBar();
  }

  updateXPBar() {
    // Nettoyer les graphiques avant de dessiner la mise à jour
    this.xpBarBackground.clear();
    this.xpBarFill.clear();

    let barWidth = 200; // Largeur de la barre d'XP
    let barHeight = 20; // Hauteur de la barre d'XP
    let barX = 50; // Position X de la barre d'XP sur l'écran
    let barY = this.scale.height - 50; // Position Y de la barre d'XP sur l'écran

    // Dessiner le fond de la barre d'XP
    this.xpBarBackground.fillRect(barX, barY, barWidth, barHeight);

    // Calculer le remplissage de la barre d'XP basé sur le XP actuel
    let fillWidth = barWidth * (this.player.xp / this.player.xpToNextLevel);
    this.xpBarFill.fillRect(barX, barY, fillWidth, barHeight);
  }

  handleZombiePlayerCollision(player, zombie) {
    handleZombiePlayerCollision(player, zombie, this);
  }

  displayGameOverText() {
    displayGameOverText(this, this.player);
  }

  createRestartButton() {
    createRestartButton(this, this.player);
  }

  // </ALEX CODE>

  // Réglage du spawn d'enemys
  spawnEnemies() {
    const nombreEnnemis = Phaser.Math.Between(1, 5);
    for (let i = 0; i < nombreEnnemis; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const y = Phaser.Math.Between(0, this.scale.height);
      if (this.player.health > 0) {
        this.zombies.create(x, y, "zombie", this.player);
      }
    }
  }

  // Méthode pour régler les dégâts du joueur en jeu
  setPlayerDamage(attack) {
    this.player.attack = attack;
  }

  playerTakeDamage(amount) {
    this.playerHealth -= amount;
    if (this.playerHealth < 0) {
      this.playerHealth = 0;
    }
    this.updateHealthBar();
  }

  handleAutoAttack(time) {
    // Trouver l'ennemi le plus proche et sa distance
    let closestEnemy = null;
    let closestDistance = Infinity;

    this.zombies.children.each((zombie) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        zombie.x,
        zombie.y
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = zombie;
      }
    });

    // Attaque si l'ennemi est dans la portée et que le cooldown est passé
    if (
      closestEnemy &&
      closestDistance < 1000 &&
      time > this.player.lastAttackTime + this.player.attackCooldown
    ) {
      this.attackClosestEnemy(closestEnemy);
      this.createProjectile(
        this.player.x,
        this.player.y,
        closestEnemy.x,
        closestEnemy.y
      );
      this.player.lastAttackTime = time;
    }
  }

  createProjectile(x1, y1, x2, y2) {
    // Create the projectile sprite at the starting position (x1, y1)
    let projectile = this.physics.add.sprite(x1, y1, "projectile");

    // Calculate angle between player and enemy
    let angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);

    projectile.rotation = angle;

    // Set velocity of the projectile based on the angle and desired speed
    let speed = 200; // Adjust as needed
    projectile.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    projectile.setSize(10, 10);

    // Play the projectile animation
    projectile.play("projectile-anim"); // Start playing the animation

    // Set collision detection between the projectile and the enemies
    this.physics.add.overlap(projectile, this.zombies, (projectile, enemy) => {
      // Handle collision between projectile and enemy
      this.handleProjectileCollision(projectile, enemy);
    });

    // Set a timer to destroy the projectile after a certain delay
    this.time.delayedCall(1000, () => {
      projectile.destroy();
    });
  }

  // Handle collision between projectile and enemy
  handleProjectileCollision(projectile, enemy) {
    enemy.setTintFill(0xffffff);
    setTimeout(() => {
      enemy.clearTint(); // Reset tint to normal (white)
    }, 100); // 100 milliseconds
    enemy.takeDamage(this.player.attack);
    projectile.destroy();
  }

  //Attaque auto Player vers Enemy + conditions mort Enemy
  attackClosestEnemy(closestEnemy) {
    // closestEnemy.setTint(0xff0000);
    // closestEnemy.takeDamage(this.player.attack);
    if (closestEnemy.health >= 0) {
      this.createProjectile(
        this.player.x,
        this.player.y,
        closestEnemy.x,
        closestEnemy.y
      );
      this.player.lastAttackTime = this.time.now; // Utilisez this.time.now pour Phaser 3
    }
  }

  //MàJ Barre de Vie
  updateHealthBar() {
    this.healthBar.clear();
    let x = this.player.x - 20;
    let y = this.player.y - -90; // Ajusté pour mieux positionner la barre de vie

    // Fond de la barre de vie
    this.healthBar.fillStyle(0x808080);
    this.healthBar.fillRect(x, y, 40, 5);

    // Barre de santé actuelle
    this.healthBar.fillStyle(0xff0000);
    let healthWidth = 40 * (this.player.health / this.player.maxHealth); // Utilisez les propriétés health et maxHealth du joueur
    this.healthBar.fillRect(x, y, healthWidth, 5);
  }

  //MàJ Position Barre de vie
  updateHealthBarPosition() {
    // Met à jour simplement la position de la barre de vie sans redessiner
    this.updateHealthBar(); // Redessine la barre de vie avec sa nouvelle position et valeur de santé
  }

  // </ALEX CODE>
}
