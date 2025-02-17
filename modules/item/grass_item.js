class GrassItem extends Item{
	constructor(){
		super();
		
		this.ID = 50;
		this.name = "grass"; // Item name such as diamond_sword
		this.displayName = "Grass"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.itemTexture = "block/grass";
        this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

        this.blockId = 34;
	}
}