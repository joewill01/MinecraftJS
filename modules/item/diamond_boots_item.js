class DiamondBootsItem extends Item{
	constructor() {
		super();

		this.ID = 11;
		this.name = "diamond_boots"; // Item name such as diamond_sword
		this.displayName = "Diamond Boots"; // Same as name but able to be overwritten for custom item names
		this.type = "armour"; // material, tool, food, block, armour
		this.allowedEnchants = [{"fire_protection":4},{"projectile_protection":4},{"blast_protection":4},{"protection":4},{"unbreaking":3},{"thorns":3},{"mending":1},{"curse_of_binding":1},{"curse_of_vanishing":1},{"feather_falling":4},{"depth_strider":3},{"soul_speed":3},{"frost_walker":2}];
		this.itemTexture = "diamond_boots.png";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 429;
		this.currentDurability = 429;

		//If Armour
		this.defense = 3;
		this.specialAllowedInventorySlots = ["boots"]; //helmet, chestplate, leggings, boots
	}
}