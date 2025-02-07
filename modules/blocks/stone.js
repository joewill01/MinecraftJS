class Stone extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 5;
		this.name = "stone"
		this.displayName = "Stone"
		this.prefferedTool = "pickaxe";

		this.hardness = 1.5;
		this.resistance = 6;
		this.replaceableByWorldGenOres = true;
		this.harvestLevel = 1;
		this.droppedItemId = 31; //should be 14

	}
}