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
			'N': 'oak_log.png',
			'S': 'oak_log.png',
			'E': 'oak_log.png',
			'W': 'oak_log.png',
			'U': 'oak_log_top.png',
			'D': 'oak_log_top.png',
		};
	}
}