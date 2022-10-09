class OakLeaves extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'oak_leaves-NORMAL-BY-JOE.png',
			'S': 'oak_leaves-NORMAL-BY-JOE.png',
			'E': 'oak_leaves-NORMAL-BY-JOE.png',
			'W': 'oak_leaves-NORMAL-BY-JOE.png',
			'U': 'oak_leaves-NORMAL-BY-JOE.png',
			'D': 'oak_leaves-NORMAL-BY-JOE.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 3;
		this.name = "oak_leaves";
		this.displayName = "Oak Leaves"
		this.prefferedTool = "shears";

		this.solid = false;
		this.replaceableByLeaves = true;
		this.needsRandomTick = true;
		this.hardness = 0.2
		this.resistance = 0.2
	}
}