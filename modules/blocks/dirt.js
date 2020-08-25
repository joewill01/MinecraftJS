class Dirt extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'dirt.png',
			'S': 'dirt.png',
			'E': 'dirt.png',
			'W': 'dirt.png',
			'U': 'dirt.png',
			'D': 'dirt.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 7;
		this.name = "dirt"
		this.displayName = "Dirt Block"
		this.prefferedTool = "shovel";

		this.hardness = 2;
		this.resistance = 0.2;
	}
}