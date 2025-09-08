class BirchLogItem extends Item{
	constructor(){
		super();
		this.ID = 34;
		this.name = "birch_log"; // Item name such as diamond_sword
		this.displayName = "Birch Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 2;
		this.blockTextures = {
			'N': 'block/birch_log',
			'S': 'block/birch_log',
			'E': 'block/birch_log',
			'W': 'block/birch_log',
			'U': 'block/birch_log_top',
			'D': 'block/birch_log_top',
		};
	}
}