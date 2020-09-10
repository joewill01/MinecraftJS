class WoodenPickaxeItem extends Item{
	constructor{
		this.ID = 1;
		this.name = "wooden_pickaxe"; 
		this.displayName = "Wooden Pickaxe"; 
		this.type = "tool"; // material, tool, food, block, armour
		this.allowedEnchants = [{"efficiency":5},{"fortune":3},{"silk_touch":1},{"unbreaking":3},{"mending":1},{"curse_of_vanishing":1}];
		this.itemTexture = "wooden_pickaxe.png";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 59;
		this.currentDurability = 59;
		this.isFuel = true;
		this.burnTime = 10;

		this.toolType = "pickaxe"; 
		this.harvestLevel = 1; 
		this.speedMultiplier = 2;
		this.attackDamage = 2;
		this.swingSpeed = 1.2;
	}
}