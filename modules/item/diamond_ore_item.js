class DiamondOreItem extends Item{
	constructor(){
		super();
		this.ID = 20;
		this.name = "diamond_ore"; // Item name such as diamond_sword
		this.displayName = "Diamond Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 14;
		this.blockTextures = {
			'N': 'diamond_ore.png',
			'S': 'diamond_ore.png',
			'E': 'diamond_ore.png',
			'W': 'diamond_ore.png',
			'U': 'diamond_ore.png',
			'D': 'diamond_ore.png',
		};
	}
}