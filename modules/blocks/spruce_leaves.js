class SpruceLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 23;
		this.name = "spruce_leaves";
		this.displayName = "Spruce Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 39;
		this.opacity = 1;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}