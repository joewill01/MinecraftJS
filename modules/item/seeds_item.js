class SeedsItem extends Item{
	constructor(){
		super();
		
		this.ID = 13;
		this.name = "seeds"; // Item name such as diamond_sword
		this.displayName = "Seeds"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "wheat_seeds";

		this.hasDurability = false;
	}
}