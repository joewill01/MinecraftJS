class DirtBlockItem extends Item{
	constructor(){
		super();
		this.ID = 12;
		this.name = "dirt_block"; // Item name such as diamond_sword
		this.displayName = "Dirt Block"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 7;
		this.blockTextures = {
			'N': 'dirt.png',
			'S': 'dirt.png',
			'E': 'dirt.png',
			'W': 'dirt.png',
			'U': 'dirt.png',
			'D': 'dirt.png',
		};
	}
}