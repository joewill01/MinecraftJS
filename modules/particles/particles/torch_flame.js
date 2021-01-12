class TorchFlame extends Particle{
	constructor(x,y,z){
		super(x,y,z)
		this.textures = ["flame.png"]
		this.startSize = 0.3;
		this.targetSize = 0;
	}
}