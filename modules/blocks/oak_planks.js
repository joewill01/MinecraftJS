class OakPlanks extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 9;
		this.name = "oak_planks"
		this.displayName = "Oak Planks"
		this.prefferedTool = "axe";

		this.hardness = 2;
		this.resistance = 3;
		this.droppedItemId = 15;

	}
}