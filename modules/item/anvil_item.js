class AnvilItem extends Item{
	constructor(){
		super();
		this.ID = 47;
		this.name = "anvil"; // Item name such as diamond_sword
		this.displayName = "Anvil"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 31;
		this.itemTexture = "anvil.png";
	}
}