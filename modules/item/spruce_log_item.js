class SpruceLogItem extends Item{
	constructor(){
		super();
		this.ID = 38;
		this.name = "spruce_log"; // Item name such as diamond_sword
		this.displayName = "Spruce Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 22;
		this.blockTextures = {
			'N': 'block/spruce_log',
			'S': 'block/spruce_log',
			'E': 'block/spruce_log',
			'W': 'block/spruce_log',
			'U': 'block/spruce_log_top',
			'D': 'block/spruce_log_top',
		};
	}
}