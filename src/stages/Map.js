export class Map {
  constructor(scene) {
    this.scene = scene;

    // Déclaration des couches de collision comme propriétés publiques
    this.wallsLayer = null;
    this.plantLayer = null;
    this.potLayer = null;
  }

  create() {
    // Créer la carte
    this.map = this.scene.make.tilemap({ key: 'survivor' });

    // Ajouter les tilesets
    this.grassTileset = this.map.addTilesetImage('grass', 'grass');
    this.plantTileset = this.map.addTilesetImage('plant', 'plant');
    this.propsTileset = this.map.addTilesetImage('props', 'props');
    this.wallTileset = this.map.addTilesetImage('wall', 'wall');

    // Créer les couches
    this.groundLayer = this.map.createLayer('ground-layer', this.grassTileset);
    this.wallsLayer = this.map.createLayer('walls-layer', this.wallTileset);
    this.plantLayer = this.map.createLayer('plant-layer', this.plantTileset);
    this.potLayer = this.map.createLayer('pot-layer', this.propsTileset);

    // Définir les collisions
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.plantLayer.setCollisionByProperty({ collides: true });
    this.potLayer.setCollisionByProperty({ collides: true });
  }
}
