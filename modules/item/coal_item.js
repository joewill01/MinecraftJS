class CoalItem extends Item{
	constructor(){
		super();
		
		this.ID = 26;
		this.name = "coal"; // Item name such as diamond_sword
		this.displayName = "Coal"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "coal.png";

		this.isFuel = true;
		this.burnTime = 80; // seconds
		this.hasDurability = false;
	}
}