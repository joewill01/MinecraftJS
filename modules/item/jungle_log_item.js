class JungleLogItem extends Item{
	constructor(){
		super();
		this.ID = 36;
		this.name = "jungle_log"; // Item name such as diamond_sword
		this.displayName = "Jungle Log"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 20;
		this.blockTextures = {
			'N': 'jungle_log.png',
			'S': 'jungle_log.png',
			'E': 'jungle_log.png',
			'W': 'jungle_log.png',
			'U': 'jungle_log_top.png',
			'D': 'jungle_log_top.png',
		};
	}
}