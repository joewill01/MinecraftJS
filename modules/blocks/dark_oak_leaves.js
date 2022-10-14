class DarkOakLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'dark_oak_leaves.png',
			'S': 'dark_oak_leaves.png',
			'E': 'dark_oak_leaves.png',
			'W': 'dark_oak_leaves.png',
			'U': 'dark_oak_leaves.png',
			'D': 'dark_oak_leaves.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 27;
		this.name = "dark_oak_leaves";
		this.displayName = "Dark Oak Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 43;
		this.solid = false;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}