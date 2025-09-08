class DarkOakLogItem extends Item{
	constructor(){
		super();
		this.ID = 42;
		this.name = "dark_oak_log"; // Item name such as diamond_sword
		this.displayName = "Dark Oak Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 26;
		this.blockTextures = {
			'N': 'block/dark_oak_log',
			'S': 'block/dark_oak_log',
			'E': 'block/dark_oak_log',
			'W': 'block/dark_oak_log',
			'U': 'block/dark_oak_log_top',
			'D': 'block/dark_oak_log_top',
		};
	}
}