export class catacombsMap {
  constructor(scene) {
    this.scene = scene;

  }

  create() {
    // Créer la carte
    this.map = this.scene.make.tilemap({ key: 'catacombs' });

    // Ajouter les tilesets
    this.decorativeTileset = this.map.addTilesetImage(
      'decorative',
      'decorative'
    );
    this.mainlevbuildTileset = this.map.addTilesetImage(
      'mainlevbuild',
      'mainlevbuild'
    );
    this.torchesTileset = this.map.addTilesetImage('torches', 'torches');

    // Créer les couches
    this.groundOneLayer = this.map.createLayer(
      'ground01',
      this.mainlevbuildTileset
    );
    this.wallsLayer = this.map.createLayer('walls', this.mainlevbuildTileset);

		this.wallsLayer.setCollisionByProperty({ collider: true})
  }
}
