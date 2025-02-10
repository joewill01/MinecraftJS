class DiamondHelmetItem extends Item{
	constructor() {
		super();

		this.ID = 8;
		this.name = "diamond_helmet"; // Item name such as diamond_sword
		this.displayName = "Diamond Helmet"; // Same as name but able to be overwritten for custom item names
		this.type = "armour"; // material, tool, food, block, armour
		this.allowedEnchants = [{"fire_protection":4},{"projectile_protection":4},{"blast_protection":4},{"protection":4},{"unbreaking":3},{"respiration":3},{"aqua_affinity":1},{"thorns":3},{"mending":1},{"curse_of_binding":1},{"curse_of_vanishing":1}];
		this.itemTexture = "diamond_helmet";

		this.stackable = false;
		this.maxDurability = 363;
		this.currentDurability = 363;

		//If Armour
		this.defense = 3;
		this.specialAllowedInventorySlots = ["helmet"];
	}

}