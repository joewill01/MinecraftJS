class AcaciaLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 41;
		this.name = "acacia_leaves"; // Item name such as diamond_sword
		this.displayName = "Acacia Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 25;
		this.blockTextures = {
			'N': 'acacia_leaves.png',
			'S': 'acacia_leaves.png',
			'E': 'acacia_leaves.png',
			'W': 'acacia_leaves.png',
			'U': 'acacia_leaves.png',
			'D': 'acacia_leaves.png',
		};
	}
}