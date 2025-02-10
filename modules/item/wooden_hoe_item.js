class WoodenHoeItem extends Item{
	constructor(){
		super();
		
		this.ID = 5;
		this.name = "wooden_hoe"; 
		this.displayName = "Wooden Hoe"; 
		this.type = "tool"; // material, tool, food, block, armour
		this.allowedEnchants = [{"efficiency":5},{"fortune":3},{"silk_touch":1},{"unbreaking":3},{"mending":1},{"curse_of_vanishing":1}];
		this.itemTexture = "wooden_hoe";

		this.stackable = false;
		this.hasDurability = true;
		this.maxDurability = 59;
		this.currentDurability = 59;
		this.isFuel = true;
		this.burnTime = 10;

		this.toolType = "hoe"; 
		this.harvestLevel = 1; 
		this.speedMultiplier = 2;
		this.attackDamage = 1;
		this.swingSpeed = 1;
	}
}