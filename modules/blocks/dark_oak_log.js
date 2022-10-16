class DarkOakLog extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'dark_oak_log.png',
			'S': 'dark_oak_log.png',
			'E': 'dark_oak_log.png',
			'W': 'dark_oak_log.png',
			'U': 'dark_oak_log_top.png',
			'D': 'dark_oak_log_top.png',
		};
		super(x,y,z,textures,ctex);

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