class PoppyItem extends Item{
	constructor(){
		super();
		this.ID = 51;
		this.name = "poppy"; // Item name such as diamond_sword
		this.displayName = "Poppy"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		this.itemTexture = "block/poppy";
		this.blockId = 35;
	}
}