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
			'N': 'spruce_log.png',
			'S': 'spruce_log.png',
			'E': 'spruce_log.png',
			'W': 'spruce_log.png',
			'U': 'spruce_log_top.png',
			'D': 'spruce_log_top.png',
		};
	}
}