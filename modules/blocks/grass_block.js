class GrassBlock extends Block {
	constructor(x, y, z, ctex) {
		super(x, y, z, ctex);

		this.ID = 1;
		this.name = "grass_block"
		this.displayName = "Grass"
		this.prefferedTool = "shovel";

		this.hardness = 0.6;
		this.resistance = 0.6;
		this.droppedItemId = 12

		this.colourMultiplier = 0x91BD59;
		this.layersToMultiply = {"N":[1], "S":[1], "E":[1], "W":[1], "U":[0], "D":[0]};
		this.hasTransparentFaces = true;
	}
}