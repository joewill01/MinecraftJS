class WoodenShovelItem extends Item{
	constructor() {
		this.ID = 2;
		this.name = "wooden_shovel"; 
		this.displayName = "Wooden Shovel"; 
		this.type = "tool";
		this.allowedEnchants = [{"efficiency":5},{"fortune":3},{"silk_touch":1},{"unbreaking":3},{"mending":1},{"curse_of_vanishing":1}];
		this.itemTexture = "wooden_shovel.png";
		this.rarity = 0;

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 59;
		this.currentDurability = 59;
		this.isFuel = true;
		this.burnTime = 10; // seconds

		//If Tool
		this.toolType = "shovel"; // shovel, axe, pickaxe, shears, hoe, sword
		this.harvestLevel = 1; // 0:hand, 1:wood, 2:iron, 3:gold, 4:diamond
		this.speedMultiplier = 2; // Wood:2	Stone:4	Iron:6 Diamond:8 Netherite:9 Gold:12 Shears:1.5(5 on wool, 15 on cobwebs and leaves) Sword:1.5(15 on cobwebs)
		this.attackDamage = 2.5;
		this.swingSpeed = 1;
	}
}