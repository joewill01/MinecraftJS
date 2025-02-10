class OakLogItem extends Item{
	constructor(){
		super();
		this.ID = 32;
		this.name = "oak_log"; // Item name such as diamond_sword
		this.displayName = "Oak Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 2;
		this.blockTextures = {
			'N': 'block/oak_log',
			'S': 'block/oak_log',
			'E': 'block/oak_log',
			'W': 'block/oak_log',
			'U': 'block/oak_log_top',
			'D': 'block/oak_log_top',
		};
	}
}