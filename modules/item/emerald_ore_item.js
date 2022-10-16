class EmeraldOreItem extends Item{
	constructor(){
		super();
		this.ID = 22;
		this.name = "emerald_ore"; // Item name such as emerald_sword
		this.displayName = "Emerald Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 16;
		this.blockTextures = {
			'N': 'emerald_ore.png',
			'S': 'emerald_ore.png',
			'E': 'emerald_ore.png',
			'W': 'emerald_ore.png',
			'U': 'emerald_ore.png',
			'D': 'emerald_ore.png',
		};
	}
}