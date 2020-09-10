class WoodenAxeItem extends Item{
	constructor{
		this.ID = 4;
		this.name = "wooden_axe"; 
		this.displayName = "Wooden Axe"; 
		this.type = "tool"; // material, tool, food, block, armour
		this.allowedEnchants = [{"efficiency":5},{"fortune":3},{"silk_touch":1},{"unbreaking":3},{"mending":1},{"curse_of_vanishing":1},{"sharpness":5},{"smite":5},{"bane_of_arthropods":5},{"cleaving":3}];
		this.itemTexture = "wooden_axe.png";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 59;
		this.currentDurability = 59;
		this.isFuel = true;
		this.burnTime = 10;

		this.toolType = "axe"; 
		this.harvestLevel = 1; 
		this.speedMultiplier = 2;
		this.attackDamage = 7;
		this.swingSpeed = 0.8;
	}
}