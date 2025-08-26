class DarkOakLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 27;
		this.name = "dark_oak_leaves";
		this.displayName = "Dark Oak Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 43;
		this.opacity = 1;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}