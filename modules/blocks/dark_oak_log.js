class DarkOakLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 26;
		this.name = "dark_oak_log"
		this.displayName = "Dark Oak Log"
		this.prefferedTool = "axe";
		this.droppedItemId = 42;
		this.hardness = 2;
		this.resistance = 2;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}