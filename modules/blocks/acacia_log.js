class AcaciaLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 24;
		this.name = "acacia_log"
		this.displayName = "Acacia Log"
		this.prefferedTool = "axe";
		this.droppedItemId = 40;
		this.hardness = 2;
		this.resistance = 2;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}