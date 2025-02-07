class JungleLog extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 20;
		this.name = "jungle_log"
		this.displayName = "Jungle Log"
		this.prefferedTool = "axe";
		this.droppedItemId = 36;
		this.hardness = 2;
		this.resistance = 2;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

	}
}