class GrassBlock extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'grass_block_side-NORMAL-BY-JOE.png',
			'S': 'grass_block_side-NORMAL-BY-JOE.png',
			'E': 'grass_block_side-NORMAL-BY-JOE.png',
			'W': 'grass_block_side-NORMAL-BY-JOE.png',
			'U': 'grass_block_top-NORMAL-BY-JOE.png',
			'D': 'dirt.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 1;
		this.name = "grass_block"
		this.displayName = "Grass"
		this.prefferedTool = "shovel";

		this.hardness = 0.6;
		this.resistance = 0.6;
		this.droppedItemId = 12;

	}
}