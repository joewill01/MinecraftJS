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
			'N': 'birch_log.png',
			'S': 'birch_log.png',
			'E': 'birch_log.png',
			'W': 'birch_log.png',
			'U': 'birch_log_top.png',
			'D': 'birch_log_top.png',
		};
	}
}