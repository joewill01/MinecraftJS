class Dev extends Block{
	constructor(x,y,z){
		let textures = {
			'N': 'oak_leaves-NORMAL-BY-JOE.png',
			'S': 'oak_log.png',
			'E': 'oak_log_top.png',
			'W': 'grass_block_side.png',
			'U': 'honeycomb_block.png',
			'D': 'honeycomb_block.png',
		};
		super(x,y,z,textures);

		this.ID = Infinity;
		this.name = "dev"
		this.placeable = false;
		this.solid = false;		
	}
}