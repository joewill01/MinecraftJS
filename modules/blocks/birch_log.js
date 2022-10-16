class BirchLog extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'birch_log.png',
			'S': 'birch_log.png',
			'E': 'birch_log.png',
			'W': 'birch_log.png',
			'U': 'birch_log_top.png',
			'D': 'birch_log_top.png',
		};
		super(x,y,z,textures,ctex);

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