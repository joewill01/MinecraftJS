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
			'N': 'block/acacia_leaves',
			'S': 'block/acacia_leaves',
			'E': 'block/acacia_leaves',
			'W': 'block/acacia_leaves',
			'U': 'block/acacia_leaves',
			'D': 'block/acacia_leaves',
		};
	}
}