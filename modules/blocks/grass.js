class Grass extends Block {
	constructor(x, y, z, ctex) {
		super(x, y, z, ctex);

		this.ID = 34;
		this.name = "grass"
		this.displayName = "Grass"

		this.hardness = 0;
		this.resistance = 0;
		this.droppedItemId = 50;

        this.solid=false;
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.hitbox = false;

        this.colourMultiplier = 0x91BD59;
		this.layersToMultiply = {"N":[0], "S":[0], "E":[1], "W":[1]};
	}
}