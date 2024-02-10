import Phaser from "phaser";
import { LootPV } from "../scenes/LootPV";
import { LootXP } from "../scenes/LootXP";

export class Zombie extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, character) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.character = character;

    this.anims.play("zombie-walk-side", true);

    this.body.setSize(this.width * 0.15, this.height * 0.5);

    this.health = 50;
  }

  update() {
    this.setVelocity(0);

    const characterPositionX = this.character.x;
    const zombiePositionX = this.x;
    const directionX = characterPositionX - zombiePositionX;

    if (this.health > 0) {
      if (directionX !== 0) {
        this.scene.physics.moveToObject(this, this.character, 60);
      } else {
        this.anims.stop();
      }

      if (directionX > 0) {
        this.anims.play("zombie-walk-side", true);
        this.scaleX = 1;
        this.body.offset.x = 50;
        this.body.offset.y = 50;
      } else {
        this.anims.play("zombie-walk-side", true);
        this.scaleX = -1;
        this.body.offset.x = 65;
      }
    }
  }

  takeDamage(attack) {
    this.health -= attack;

    if (this.health <= 0) {
      const lootType = Phaser.Math.Between(0, 100) < 80 ? 'xp' : 'pv'; // 80% XP, 20% PV
      if (lootType === 'xp') {
          new LootXP(this.scene, this.x, this.y + 90, 'lootXP');
      } else {
          new LootPV(this.scene, this.x, this.y + 90, 'lootPV');
      }
      this.anims.play("zombie-dead");
      this.once("animationcomplete", () => {
        this.destroy();
      });
    }
  }
}
