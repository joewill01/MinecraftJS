class StoneItem extends Item{
	constructor(){
		super();
		this.ID = 30;
		this.name = "stone"; // Item name such as diamond_sword
		this.displayName = "Stone"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 1;
		this.blockTextures = {
			'N': 'stone.png',
			'S': 'stone.png',
			'E': 'stone.png',
			'W': 'stone.png',
			'U': 'stone.png',
			'D': 'stone.png',
		};
	}
}