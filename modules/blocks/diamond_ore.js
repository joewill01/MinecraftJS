class DiamondOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 14;
		this.name = "diamond_ore"
		this.displayName = "Diamond Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 3;
		this.droppedItemId = 24;

	}
}