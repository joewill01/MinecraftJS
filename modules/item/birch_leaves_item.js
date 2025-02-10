class BirchLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 35;
		this.name = "birch_leaves"; // Item name such as diamond_sword
		this.displayName = "Birch Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 19;
		this.blockTextures = {
			'N': 'block/birch_leaves',
			'S': 'block/birch_leaves',
			'E': 'block/birch_leaves',
			'W': 'block/birch_leaves',
			'U': 'block/birch_leaves',
			'D': 'block/birch_leaves',
		};
	}
}