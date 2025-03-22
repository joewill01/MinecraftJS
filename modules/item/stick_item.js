class StickItem extends Item{
	constructor(){
		super();
		
		this.ID = 54;
		this.name = "stick"; // Item name such as diamond_sword
		this.displayName = "Stick"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "item/stick";

		this.hasDurability = false;
	}
}