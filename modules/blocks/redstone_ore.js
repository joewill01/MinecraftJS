class RedstoneOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'redstone_ore.png',
			'S': 'redstone_ore.png',
			'E': 'redstone_ore.png',
			'W': 'redstone_ore.png',
			'U': 'redstone_ore.png',
			'D': 'redstone_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 15;
		this.name = "redstone_ore"
		this.displayName = "Redstone Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 21;

	}
}