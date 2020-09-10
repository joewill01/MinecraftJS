class DiamondChestplateItem extends Item{
	constructor() {
		this.ID = 9;
		this.name = "diamond_chestplate"; // Item name such as diamond_sword
		this.displayName = "Diamond Chestplate"; // Same as name but able to be overwritten for custom item names
		this.type = "armour"; // material, tool, food, block, armour
		this.allowedEnchants = [{"fire_protection":4},{"projectile_protection":4},{"blast_protection":4},{"protection":4},{"unbreaking":3},{"thorns":3},{"mending":1},{"curse_of_binding":1},{"curse_of_vanishing":1}];
		this.itemTexture = "diamond_chestplate.png";
		this.rarity = 0; // 0:common, 1:uncommon, 2:rare, 3:Epic > See: https://minecraft.gamepedia.com/Rarity

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 528;
		this.currentDurability = 528;

		//If Armour
		this.defense = 8;
		this.specialAllowedInventorySlots = ["chestplate"]; //helmet, chestplate, leggings, boots
	}
}