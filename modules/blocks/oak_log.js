class OakLog extends Block{
	constructor(x,y,z){
		let textures = {
			'N': 'oak_log.png',
			'S': 'oak_log.png',
			'E': 'oak_log.png',
			'W': 'oak_log.png',
			'U': 'oak_log_top.png',
			'D': 'oak_log_top.png',
		};
		super(x,y,z,textures);

		this.ID = 2;
		this.name = "oak_log"
		this.prefferedTool = "axe";

		this.hardness = 4;
		this.resistance = 0.4;

		this.rotatable = true;
		this.allowedRotations = ["N","S","E","W","D","U"]

		this.render();
	}
}