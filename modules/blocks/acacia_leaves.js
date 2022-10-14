class AcaciaLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'acacia_leaves.png',
			'S': 'acacia_leaves.png',
			'E': 'acacia_leaves.png',
			'W': 'acacia_leaves.png',
			'U': 'acacia_leaves.png',
			'D': 'acacia_leaves.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 25;
		this.name = "acacia_leaves";
		this.displayName = "Acacia Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 41;
		this.solid = false;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}