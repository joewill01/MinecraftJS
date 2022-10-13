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
			'N': 'birch_leaves.png',
			'S': 'birch_leaves.png',
			'E': 'birch_leaves.png',
			'W': 'birch_leaves.png',
			'U': 'birch_leaves.png',
			'D': 'birch_leaves.png',
		};
	}
}