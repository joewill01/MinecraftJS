class Stone extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'stone.png',
			'S': 'stone.png',
			'E': 'stone.png',
			'W': 'stone.png',
			'U': 'stone.png',
			'D': 'stone.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 5;
		this.name = "stone"
		this.displayName = "Stone"
		this.prefferedTool = "pickaxe";

		this.hardness = 1.5;
		this.resistance = 0.4;
		this.replaceableByWorldGenOres = true;
		this.harvestLevel = 1; 

	}
}