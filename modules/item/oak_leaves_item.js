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
			'N': 'oak_leaves-NORMAL-BY-JOE.png',
			'S': 'oak_leaves-NORMAL-BY-JOE.png',
			'E': 'oak_leaves-NORMAL-BY-JOE.png',
			'W': 'oak_leaves-NORMAL-BY-JOE.png',
			'U': 'oak_leaves-NORMAL-BY-JOE.png',
			'D': 'oak_leaves-NORMAL-BY-JOE.png',
		};
	}
}