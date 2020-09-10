class Item(){
	constructor() {
		this.ID = 0;
		this.name = "not_set"; // Item name such as diamond_sword
		this.displayName = "Not Named"; // Same as name but able to be overwritten for custom item names
		this.type = "material"; // material, tool, food, block, armour
		this.data = {};
		this.enchantments = {}; //eg: {"sharpness":2,"unbreaking":1}
		this.allowedEnchants = [];
		this.itemTexture = "";
		this.rarity = 0; // 0:common, 1:uncommon, 2:rare, 3:Epic > See: https://minecraft.gamepedia.com/Rarity

		this.stackable = true;
		this.maxStackSize = 64;
		this.hasDurability = true;
		this.maxDurability = 1400;
		this.currentDurability = 1400;
		this.isFuel = false;
		this.burnTime = 0; // seconds

		//If Tool
		this.toolType = "not_set"; // shovel, axe, pickaxe, shears, hoe, sword
		this.harvestLevel = 0; // 0:hand, 1:wood, 2:iron, 3:gold, 4:diamond
		this.speedMultiplier = 1; // Wood:2	Stone:4	Iron:6 Diamond:8 Netherite:9 Gold:12 Shears:1.5(5 on wool, 15 on cobwebs and leaves) Sword:1.5(15 on cobwebs)
		this.attackDamage = 0;
		this.swingSpeed = 0;

		//If Food 
		this.saturation = 0;
		this.hunger = 0;
		this.effects = [];
		this.eatSound = null;

		//If Block
		this.blockId = 0;
		this.blockTextures = {};

		//If Armour
		this.defense = 0;
		this.specialAllowedInventorySlots = []; //helmet, chestplate, leggings, boots
	}

	onUse(){//Right click on air

	}

	onPlace(){//Right click on a block

	}

	onEaten(){// When eaten

	}
}