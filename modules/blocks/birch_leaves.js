class BirchLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'birch_leaves-NORMAL-BY-JOE.png',
			'S': 'birch_leaves-NORMAL-BY-JOE.png',
			'E': 'birch_leaves-NORMAL-BY-JOE.png',
			'W': 'birch_leaves-NORMAL-BY-JOE.png',
			'U': 'birch_leaves-NORMAL-BY-JOE.png',
			'D': 'birch_leaves-NORMAL-BY-JOE.png',
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