class BoneMealItem extends Item{
	constructor(){
		super();
		
		this.ID = 53;
		this.name = "bone_meal"; // Item name such as diamond_sword
		this.displayName = "Bone Meal"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.itemTexture = "item/bone_meal";

		this.hasDurability = false;
	}
}