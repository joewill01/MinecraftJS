class WoodenSwordItem extends Item{
	constructor() {
		super();
		
		this.ID = 3;
		this.name = "wooden_sword"; // Item name such as diamond_sword
		this.displayName = "Wooden Sword"; // Same as name but able to be overwritten for custom item names
		this.type = "tool"; // material, tool, food, block, armour
		this.allowedEnchants = [{"sharpness":5},{"looting":3},{"fire_aspect":2},{"unbreaking":3},{"mending":1},{"curse_of_vanishing":1},{"smite":5},{"bane_of_arthropods":5},{"knockback":2},{"sweeping_edge":3}];
		this.itemTexture = "wooden_sword.png";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 59;
		this.currentDurability = 59;
		this.isFuel = true;
		this.burnTime = 10; // seconds

		//If Tool
		this.toolType = "sword"; // shovel, axe, pickaxe, shears, hoe, sword
		this.harvestLevel = 1; // 0:hand, 1:wood, 2:iron, 3:gold, 4:diamond
		this.speedMultiplier = 2; // Wood:2	Stone:4	Iron:6 Diamond:8 Netherite:9 Gold:12 Shears:1.5(5 on wool, 15 on cobwebs and leaves) Sword:1.5(15 on cobwebs)
		this.attackDamage = 4;
		this.swingSpeed = 1.6;
	}
}