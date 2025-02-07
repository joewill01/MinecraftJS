class Bedrock extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 4;
		this.name = "bedrock"
		this.displayName = "Bedrock"

		this.hardness = Number.POSITIVE_INFINITY;
		this.resistance = 3600000;
	}
}
