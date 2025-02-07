class Cobblestone extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 8;
		this.name = "cobblestone"
		this.displayName = "Cobblestone"
		this.prefferedTool = "pickaxe";
		this.hardness = 2;
		this.resistance = 0.4;
		this.harvestLevel = 1;
		this.droppedItemId = 14;

	}
}