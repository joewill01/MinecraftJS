class Gravel extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'gravel.png',
			'S': 'gravel.png',
			'E': 'gravel.png',
			'W': 'gravel.png',
			'U': 'gravel.png',
			'D': 'gravel.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 29;
		this.name = "gravel"
		this.displayName = "Gravel"
		this.prefferedTool = "shovel";

		this.hardness = 0.5;
		this.resistance = 0.5;
		this.droppedItemId = 45;
		this.canFall = true;
	}
}