class EmeraldOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'emerald_ore.png',
			'S': 'emerald_ore.png',
			'E': 'emerald_ore.png',
			'W': 'emerald_ore.png',
			'U': 'emerald_ore.png',
			'D': 'emerald_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 16;
		this.name = "emerald_ore"
		this.displayName = "Emerald Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 22;

	}
}