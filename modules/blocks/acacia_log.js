class AcaciaLog extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'acacia_log.png',
			'S': 'acacia_log.png',
			'E': 'acacia_log.png',
			'W': 'acacia_log.png',
			'U': 'acacia_log_top.png',
			'D': 'acacia_log_top.png',
		};
		super(x,y,z,textures,ctex);

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