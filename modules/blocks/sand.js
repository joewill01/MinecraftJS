class Sand extends Block{
	constructor(x,y,z,ctex) {
		let textures = {
			'N': 'sand.png',
			'S': 'sand.png',
			'E': 'sand.png',
			'W': 'sand.png',
			'U': 'sand.png',
			'D': 'sand.png',
		};
		super(x, y, z, textures, ctex);
		this.fallingCheck()
		this.ID = 28;
		this.name = "sand"
		this.displayName = "Sand"
		this.prefferedTool = "shovel";

		this.hardness = 0.5;
		this.resistance = 0.5;
		this.droppedItemId = 44;
		this.canFall = true;
	}
}