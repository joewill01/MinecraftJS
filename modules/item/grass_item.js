class GrassItem extends Item{
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
			'N': 'grass_block_side.png',
			'S': 'grass_block_side.png',
			'E': 'grass_block_side.png',
			'W': 'grass_block_side.png',
			'U': 'grass_block_top-NORMAL-BY-JOE.png',
			'D': 'dirt.png',
		};
	}
}