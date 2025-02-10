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
			'N': 'block/stone',
			'S': 'block/stone',
			'E': 'block/stone',
			'W': 'block/stone',
			'U': 'block/stone',
			'D': 'block/stone',
		};
	}
}