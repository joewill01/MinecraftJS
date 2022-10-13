class RedstoneItem extends Item{
	constructor(){
		super();
		
		this.ID = 25;
		this.name = "redstone"; // Item name such as diamond_sword
		this.displayName = "Redstone"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "redstone.png";

		this.hasDurability = false;
	}
}