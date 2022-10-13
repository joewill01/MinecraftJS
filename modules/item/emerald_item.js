class EmeraldItem extends Item{
	constructor(){
		super();
		
		this.ID = 27;
		this.name = "emerald"; // Item name such as diamond_sword
		this.displayName = "Emerald"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "emerald.png";

		this.hasDurability = false;
	}
}