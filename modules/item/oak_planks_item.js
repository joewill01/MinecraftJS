class OakPlanksItem extends Item{
	constructor(){
		super();
		this.ID = 14;
		this.name = "oak_planks"; // Item name such as diamond_sword
		this.displayName = "Oak Planks"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 8;
		this.blockTextures = {
			'N': 'block/oak_planks',
			'S': 'block/oak_planks',
			'E': 'block/oak_planks',
			'W': 'block/oak_planks',
			'U': 'block/oak_planks',
			'D': 'block/oak_planks',
		};
	}
}