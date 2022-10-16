class JungleLeavesItem extends Item{
	constructor(){
		super();
		this.ID = 37;
		this.name = "jungle_leaves"; // Item name such as diamond_sword
		this.displayName = "Jungle Leaves"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 21;
		this.blockTextures = {
			'N': 'jungle_leaves.png',
			'S': 'jungle_leaves.png',
			'E': 'jungle_leaves.png',
			'W': 'jungle_leaves.png',
			'U': 'jungle_leaves.png',
			'D': 'jungle_leaves.png',
		};
	}
}