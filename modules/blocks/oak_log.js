class OakLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 2;
		this.name = "oak_log"
		this.displayName = "Oak Log"
		this.prefferedTool = "axe";

		this.hardness = 2;
		this.resistance = 2;
		this.droppedItemId = 32;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}