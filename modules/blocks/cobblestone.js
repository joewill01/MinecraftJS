class Cobblestone extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'cobblestone.png',
			'S': 'cobblestone.png',
			'E': 'cobblestone.png',
			'W': 'cobblestone.png',
			'U': 'cobblestone.png',
			'D': 'cobblestone.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 8;
		this.name = "cobblestone"
		this.displayName = "Cobblestone"
		this.prefferedTool = "pickaxe";
		this.hardness = 2;
		this.resistance = 0.4;
		this.harvestLevel = 1;
		this.droppedItemId = 14;

	}
}