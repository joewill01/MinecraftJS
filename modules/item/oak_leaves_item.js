class OakLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 33;
		this.name = "oak_leaves"; // Item name such as diamond_sword
		this.displayName = "Oak Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 3;
		this.blockTextures = {
			'N': 'block/oak_leaves-NORMAL-BY-JOE',
			'S': 'block/oak_leaves-NORMAL-BY-JOE',
			'E': 'block/oak_leaves-NORMAL-BY-JOE',
			'W': 'block/oak_leaves-NORMAL-BY-JOE',
			'U': 'block/oak_leaves-NORMAL-BY-JOE',
			'D': 'block/oak_leaves-NORMAL-BY-JOE',
		};
	}
}