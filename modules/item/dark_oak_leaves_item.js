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
			'N': 'block/dark_oak_leaves',
			'S': 'block/dark_oak_leaves',
			'E': 'block/dark_oak_leaves',
			'W': 'block/dark_oak_leaves',
			'U': 'block/dark_oak_leaves',
			'D': 'block/dark_oak_leaves',
		};
	}
}