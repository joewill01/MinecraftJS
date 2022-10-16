class RedstoneOreItem extends Item{
	constructor(){
		super();
		this.ID = 21;
		this.name = "redstone_ore"; // Item name such as redstone_sword
		this.displayName = "Redstone Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 15;
		this.blockTextures = {
			'N': 'redstone_ore.png',
			'S': 'redstone_ore.png',
			'E': 'redstone_ore.png',
			'W': 'redstone_ore.png',
			'U': 'redstone_ore.png',
			'D': 'redstone_ore.png',
		};
	}
}