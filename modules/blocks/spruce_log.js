class SpruceLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 22;
		this.name = "spruce_log"
		this.displayName = "Spruce Log"
		this.prefferedTool = "axe";
		this.droppedItemId = 38;
		this.hardness = 2;
		this.resistance = 2;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}