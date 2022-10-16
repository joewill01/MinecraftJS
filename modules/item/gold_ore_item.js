class GoldOreItem extends Item{
	constructor(){
		super();
		this.ID = 19;
		this.name = "gold_ore"; // Item name such as diamond_sword
		this.displayName = "Gold Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 13;
		this.blockTextures = {
			'N': 'gold_ore.png',
			'S': 'gold_ore.png',
			'E': 'gold_ore.png',
			'W': 'gold_ore.png',
			'U': 'gold_ore.png',
			'D': 'gold_ore.png',
		};
	}
}