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
			'N': 'iron_ore.png',
			'S': 'iron_ore.png',
			'E': 'iron_ore.png',
			'W': 'iron_ore.png',
			'U': 'iron_ore.png',
			'D': 'iron_ore.png',
		};
	}
}