class CobblestoneItem extends Item{
	constructor(){
		super();
		this.ID = 14;
		this.name = "cobblestone"; // Item name such as diamond_sword
		this.displayName = "Cobblestone"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 8;
		this.blockTextures = {
			'N': 'block/cobblestone',
			'S': 'block/cobblestone',
			'E': 'block/cobblestone',
			'W': 'block/cobblestone',
			'U': 'block/cobblestone',
			'D': 'block/cobblestone',
		};
	}
}