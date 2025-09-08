class Dirt extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 7;
		this.name = "dirt"
		this.displayName = "Dirt Block"
		this.prefferedTool = "shovel";

		this.hardness = 0.5;
		this.resistance = 0.5;
		this.droppedItemId = 12;
	}
}