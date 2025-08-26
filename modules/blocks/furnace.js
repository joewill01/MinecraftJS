class Furnace extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 11;
		this.name = "furnace"
		this.displayName = "Furnace"
		this.prefferedTool = "pickaxe";
		this.hardness = 3; //should be 3.5 but code is being fucky
		this.resistance = 3; //ditto
		this.harvestLevel = 1;
		this.droppedItemId = 17;

	}
}