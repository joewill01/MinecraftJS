class SpruceLog extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'spruce_log.png',
			'S': 'spruce_log.png',
			'E': 'spruce_log.png',
			'W': 'spruce_log.png',
			'U': 'spruce_log_top.png',
			'D': 'spruce_log_top.png',
		};
		super(x,y,z,textures,ctex);

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