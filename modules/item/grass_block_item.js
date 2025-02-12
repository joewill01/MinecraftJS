class GrassBlockItem extends Item{
	constructor(){
		super();
		this.ID = 29;
		this.name = "grass"; // Item name such as diamond_sword
		this.displayName = "Grass"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 1;
		this.blockTextures = {
			'N': 'block/grass_block_side',
			'S': 'block/grass_block_side',
			'E': 'block/grass_block_side',
			'W': 'block/grass_block_side',
			'U': 'block/grass_block_top-NORMAL-BY-JOE',
			'D': 'block/dirt',
		};
	}
}