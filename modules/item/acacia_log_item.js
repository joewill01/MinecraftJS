class AcaciaLogItem extends Item{
	constructor(){
		super();
		this.ID = 40;
		this.name = "acacia_log"; // Item name such as diamond_sword
		this.displayName = "Acacia Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 24;
		this.blockTextures = {
			'N': 'acacia_log.png',
			'S': 'acacia_log.png',
			'E': 'acacia_log.png',
			'W': 'acacia_log.png',
			'U': 'acacia_log_top.png',
			'D': 'acacia_log_top.png',
		};
	}
}