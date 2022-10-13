class DiamondOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'diamond_ore.png',
			'S': 'diamond_ore.png',
			'E': 'diamond_ore.png',
			'W': 'diamond_ore.png',
			'U': 'diamond_ore.png',
			'D': 'diamond_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 14;
		this.name = "diamond_ore"
		this.displayName = "Diamond Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 3;
		this.droppedItemId = 20;

	}
}