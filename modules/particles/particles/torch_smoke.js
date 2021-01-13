class TorchSmoke extends Particle{
	constructor(x,y,z){
		super(x,y,z)
		this.textures = [
		    "generic_7.png",
		    "generic_6.png",
		    "generic_5.png",
		    "generic_4.png",
		    "generic_3.png",
		    "generic_2.png",
		    "generic_1.png",
		    "generic_0.png"
		  ]
		this.baseSize = 0.2;
		this.targetSize = 0.2;
		this.targetPos.y = this.y+1.5;
	}

	postInit(){
		let hue = randomIntFromInterval(20,250)/255;
		this.particleMesh.material.color.setRGB(hue,hue,hue)
	}
}