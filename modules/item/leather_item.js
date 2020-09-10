class LeatherItem extends Item{
	constructor(){
		super();
		
		this.ID = 6;
		this.name = "leather"; // Item name such as diamond_sword
		this.displayName = "Leather"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "leather.png";

		this.hasDurability = false;
	}
}