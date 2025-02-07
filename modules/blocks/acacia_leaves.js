class AcaciaLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 25;
		this.name = "acacia_leaves";
		this.displayName = "Acacia Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 41;
		this.opacity = 1;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}