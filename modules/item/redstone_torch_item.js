class RedstoneTorchItem extends Item{
	constructor(){
		super();
		this.ID = 48;
		this.name = "redstone_torch"; // Item name such as diamond_sword
		this.displayName = "Redstone Torch"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		this.itemTexture = "block/redstone_torch";
		this.blockId = 32;
	}
}