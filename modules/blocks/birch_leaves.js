class BirchLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 19;
		this.name = "birch_leaves";
		this.displayName = "Birch Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 35;
		this.opacity = 1;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}