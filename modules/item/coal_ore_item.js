class CoalOreItem extends Item{
	constructor(){
		super();
		this.ID = 18;
		this.name = "coal_ore"; // Item name such as diamond_sword
		this.displayName = "Coal Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 12;
		this.blockTextures = {
			'N': 'block/coal_ore',
			'S': 'block/coal_ore',
			'E': 'block/coal_ore',
			'W': 'block/coal_ore',
			'U': 'block/coal_ore',
			'D': 'block/coal_ore',
		};
	}
}