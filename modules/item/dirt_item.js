class DirtItem extends Item{
	constructor(){
		super();
		this.ID = 12;
		this.name = "dirt"; // Item name such as diamond_sword
		this.displayName = "Dirt"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 7;
		this.blockTextures = {
			'N': 'block/dirt',
			'S': 'block/dirt',
			'E': 'block/dirt',
			'W': 'block/dirt',
			'U': 'block/dirt',
			'D': 'block/dirt',
		};
	}
}