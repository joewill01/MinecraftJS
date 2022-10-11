class IronOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'iron_ore.png',
			'S': 'iron_ore.png',
			'E': 'iron_ore.png',
			'W': 'iron_ore.png',
			'U': 'iron_ore.png',
			'D': 'iron_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 10;
		this.name = "iron_ore"
		this.displayName = "Iron Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 16;

	}
}