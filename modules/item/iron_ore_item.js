class IronOreItem extends Item{
	constructor(){
		super();
		this.ID = 16;
		this.name = "iron_ore"; // Item name such as diamond_sword
		this.displayName = "Iron Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 10;
		this.blockTextures = {
			'N': 'block/iron_ore',
			'S': 'block/iron_ore',
			'E': 'block/iron_ore',
			'W': 'block/iron_ore',
			'U': 'block/iron_ore',
			'D': 'block/iron_ore',
		};
	}
}