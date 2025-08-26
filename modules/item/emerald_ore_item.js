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
			'N': 'block/emerald_ore',
			'S': 'block/emerald_ore',
			'E': 'block/emerald_ore',
			'W': 'block/emerald_ore',
			'U': 'block/emerald_ore',
			'D': 'block/emerald_ore',
		};
	}
}