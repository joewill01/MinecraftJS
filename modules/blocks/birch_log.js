class BirchLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 18;
		this.name = "birch_log"
		this.displayName = "Birch Log"
		this.prefferedTool = "axe";
		this.droppedItemId = 34;
		this.hardness = 2;
		this.resistance = 2;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}