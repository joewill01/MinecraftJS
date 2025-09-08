class RedstoneOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 15;
		this.name = "redstone_ore"
		this.displayName = "Redstone Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 25;
		this.dropNumberMin = 4;
		this.dropNumberMax = 5;

	}
}