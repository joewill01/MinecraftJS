class DiamondLeggingsItem extends Item{
	constructor() {
		super();
		
		this.ID = 10;
		this.name = "diamond_leggings"; // Item name such as diamond_sword
		this.displayName = "Diamond Leggings"; // Same as name but able to be overwritten for custom item names
		this.type = "armour"; // material, tool, food, block, armour
		this.allowedEnchants = [{"fire_protection":4},{"projectile_protection":4},{"blast_protection":4},{"protection":4},{"unbreaking":3},{"thorns":3},{"mending":1},{"curse_of_binding":1},{"curse_of_vanishing":1}];
		this.itemTexture = "diamond_leggings";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 495;
		this.currentDurability = 495;

		//If Armour
		this.defense = 6;
		this.specialAllowedInventorySlots = ["leggings"]; //helmet, chestplate, leggings, boots
	}
}