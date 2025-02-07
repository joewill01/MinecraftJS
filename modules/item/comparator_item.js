class ComparatorItem extends Item{
	constructor(){
		super();
		this.ID = 49;
		this.name = "comparator"; // Item name such as diamond_sword
		this.displayName = "Redstone Comparator"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		this.itemTexture = "comparator.png";
		this.blockId = 33;
	}
}