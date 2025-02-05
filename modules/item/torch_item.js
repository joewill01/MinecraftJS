class TorchItem extends Item{
	constructor(){
		super();
		this.ID = 46;
		this.name = "torch"; // Item name such as diamond_sword
		this.displayName = "Torch"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "2d"; // 2d/3d 

		this.hasDurability = false;

		this.itemTexture = "torch.png";
		this.blockId = 30;
	}
}