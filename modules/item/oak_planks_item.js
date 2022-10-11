class OakPlanksItem extends Item{
	constructor(){
		super();
		this.ID = 14;
		this.name = "oak"; // Item name such as diamond_sword
		this.displayName = "Oak Planks"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 8;
		this.blockTextures = {
			'N': 'oak_planks.png',
			'S': 'oak_planks.png',
			'E': 'oak_planks.png',
			'W': 'oak_planks.png',
			'U': 'oak_planks.png',
			'D': 'oak_planks.png',
		};
	}
}