class CoalOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'coal_ore.png',
			'S': 'coal_ore.png',
			'E': 'coal_ore.png',
			'W': 'coal_ore.png',
			'U': 'coal_ore.png',
			'D': 'coal_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 12;
		this.name = "coal_ore"
		this.displayName = "Coal Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 1;
		this.droppedItemId = 26;

	}
}