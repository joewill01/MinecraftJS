class LapisLazuliItem extends Item{
	constructor(){
		super();
		
		this.ID = 28;
		this.name = "lapis_lazuli"; // Item name such as diamond_sword
		this.displayName = "Lapis Lazuli"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "lapis_lazuli.png";

		this.hasDurability = false;
	}
}