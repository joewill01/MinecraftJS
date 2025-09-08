class JungleLeaves extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 21;
		this.name = "jungle_leaves";
		this.displayName = "Jungle Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 37;
		this.opacity = 1;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}