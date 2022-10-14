class DarkOakLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 43;
		this.name = "dark_oak_leaves"; // Item name such as diamond_sword
		this.displayName = "Dark Oak Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 27;
		this.blockTextures = {
			'N': 'dark_oak_leaves.png',
			'S': 'dark_oak_leaves.png',
			'E': 'dark_oak_leaves.png',
			'W': 'dark_oak_leaves.png',
			'U': 'dark_oak_leaves.png',
			'D': 'dark_oak_leaves.png',
		};
	}
}