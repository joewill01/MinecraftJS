class Bedrock extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'bedrock.png',
			'S': 'bedrock.png',
			'E': 'bedrock.png',
			'W': 'bedrock.png',
			'U': 'bedrock.png',
			'D': 'bedrock.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 4;
		this.name = "bedrock"
		this.displayName = "Bedrock"

		this.hardness = -1;
		this.resistance = 0;
	}
}
