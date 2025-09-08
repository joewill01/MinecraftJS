class SpruceLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 39;
		this.name = "spruce_leaves"; // Item name such as diamond_sword
		this.displayName = "Spruce Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 23;
		this.blockTextures = {
			'N': 'block/spruce_leaves',
			'S': 'block/spruce_leaves',
			'E': 'block/spruce_leaves',
			'W': 'block/spruce_leaves',
			'U': 'block/spruce_leaves',
			'D': 'block/spruce_leaves',
		};
	}
}