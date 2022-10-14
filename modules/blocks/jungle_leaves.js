class JungleLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'jungle_leaves.png',
			'S': 'jungle_leaves.png',
			'E': 'jungle_leaves.png',
			'W': 'jungle_leaves.png',
			'U': 'jungle_leaves.png',
			'D': 'jungle_leaves.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 21;
		this.name = "jungle_leaves";
		this.displayName = "Jungle Leaves"
		this.prefferedTool = "shears";
		this.droppedItemId = 37;
		this.solid = false;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}