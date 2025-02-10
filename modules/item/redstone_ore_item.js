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
			'N': 'block/redstone_ore',
			'S': 'block/redstone_ore',
			'E': 'block/redstone_ore',
			'W': 'block/redstone_ore',
			'U': 'block/redstone_ore',
			'D': 'block/redstone_ore',
		};
	}
}