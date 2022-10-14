class GravelItem extends Item{
	constructor(){
		super();
		this.ID = 45;
		this.name = "gravel"; // Item name such as diamond_sword
		this.displayName = "Gravel"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 29;
		this.blockTextures = {
			'N': 'gravel.png',
			'S': 'gravel.png',
			'E': 'gravel.png',
			'W': 'gravel.png',
			'U': 'gravel.png',
			'D': 'gravel.png',
		};
	}
}