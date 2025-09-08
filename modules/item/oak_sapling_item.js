class OakSaplingItem extends Item{
	constructor(){
		super();
		this.ID = 52;
		this.name = "oak_sapling"; // Item name such as diamond_sword
		this.displayName = "Oak Sapling"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		this.itemTexture = "block/oak_sapling";
		this.blockId = 36;
	}
}