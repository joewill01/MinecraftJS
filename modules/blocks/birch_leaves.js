class BirchLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'birch_leaves.png',
			'S': 'birch_leaves.png',
			'E': 'birch_leaves.png',
			'W': 'birch_leaves.png',
			'U': 'birch_leaves.png',
			'D': 'birch_leaves.png',
		};
		super(x,y,z,textures,ctex);

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