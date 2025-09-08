class LapisLazuliOreItem extends Item{
	constructor(){
		super();
		this.ID = 23;
		this.name = "lapis_lazuli_ore"; // Item name such as lapis_sword
		this.displayName = "Lapis Lazuli Ore"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 17;
		this.blockTextures = {
			'N': 'block/lapis_ore',
			'S': 'block/lapis_ore',
			'E': 'block/lapis_ore',
			'W': 'block/lapis_ore',
			'U': 'block/lapis_ore',
			'D': 'block/lapis_ore',
		};
	}
}