class SpruceLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'spruce_leaves.png',
			'S': 'spruce_leaves.png',
			'E': 'spruce_leaves.png',
			'W': 'spruce_leaves.png',
			'U': 'spruce_leaves.png',
			'D': 'spruce_leaves.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 23;
		this.name = "spruce_leaves";
		this.displayName = "Spruce Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 39;
		this.solid = false;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}