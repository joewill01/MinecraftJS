class JungleLog extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'jungle_log.png',
			'S': 'jungle_log.png',
			'E': 'jungle_log.png',
			'W': 'jungle_log.png',
			'U': 'jungle_log_top.png',
			'D': 'jungle_log_top.png',
		};
		super(x,y,z,textures,ctex);

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