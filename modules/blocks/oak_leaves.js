class OakLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 3;
		this.name = "oak_leaves";
		this.displayName = "Oak Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 33;
		this.opacity = 0;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
		this.colourMultiplier = 0x5E9D34;
		this.layersToMultiply = {"N":[0], "S":[0], "E":[0], "W":[0], "U":[0], "D":[0]};
	}
}