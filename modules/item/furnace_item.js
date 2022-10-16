class FurnaceItem extends Item{
	constructor(){
		super();
		this.ID = 17;
		this.name = "furnace"; // Item name such as diamond_sword
		this.displayName = "Furnace"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 11;
		this.blockTextures = {
			'N': 'furnace_front.png',
			'S': 'furnace_side.png',
			'E': 'furnace_side.png',
			'W': 'furnace_side.png',
			'U': 'furnace_top.png',
			'D': 'furnace_top.png',
		};
	}
}