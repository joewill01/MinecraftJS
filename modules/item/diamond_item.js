class DiamondItem extends Item{
	constructor(){
		super();
		
		this.ID = 24;
		this.name = "diamond"; // Item name such as diamond_sword
		this.displayName = "Diamond"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "diamond.png";

		this.hasDurability = false;
	}
}