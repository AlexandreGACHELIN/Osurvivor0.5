import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    //  Chargement du chemin pour les assets
    this.load.setPath("assets");

    // Chargement des images pour les tuiles de la carte
    this.load.image("decorative", "tileset/decorative.png");
    this.load.image("mainlevbuild", "tileset/mainlevbuild.png");
    this.load.image("torches", "tileset/decorative.png");
    this.load.image(
      "lootPV",
      "Pack/items and trap_animation/flasks/flasks_1_1.png"
    );
    this.load.image(
      "lootXP",
      "Pack/items and trap_animation/box_1/box_1_1.png"
    );

    // Chargement des données de la carte
    this.load.tilemapTiledJSON("catacombs", "tileset/catacombs_map.json");

    // Chargement des sprite pour le raider
    this.load.spritesheet("raiderWalk", "characters/raider/Walk.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("raiderIdle", "characters/raider/Idle_2.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    // Chargement des sprite pour le wizard
    this.load.spritesheet("wizardWalk", "characters/wizard/Walk.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("wizardIdle", "characters/wizard/Idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("wizardDead", "characters/wizard/Dead.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    // Chargement des sprite pour le Zombie
    this.load.spritesheet("zombieWalk", "enemies/zombie/Walk.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet("zombieDead", "enemies/zombie/Dead.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    // Chargement du sprite de projectile
    this.load.spritesheet("projectile", "weapons/Charge_2.png", {
      frameWidth: 64,
      frameHeight: 128,
    });
  }

  create() {
    this.scene.start("Game");
  }
}
