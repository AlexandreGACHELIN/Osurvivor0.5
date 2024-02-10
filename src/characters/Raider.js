import { PlayableCharacter } from "./PlayableCharacter";

export class Raider extends PlayableCharacter {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
  }

  update() {
		super.update();
  }
}
