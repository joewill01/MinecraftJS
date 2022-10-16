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
			'N': 'lapis_ore.png',
			'S': 'lapis_ore.png',
			'E': 'lapis_ore.png',
			'W': 'lapis_ore.png',
			'U': 'lapis_ore.png',
			'D': 'lapis_ore.png',
		};
	}
}