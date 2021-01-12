class Particle{
	constructor(x,y,z){
		this.createdAt = null;
		this.lifespan = 1000;
		//determines how many texture changes it goes through
		this.animation_stages = 1;

		//Physics properties
		this.physics = false;
		this.velocity = {x:0,y:0,z:0}
		this.collides = false;
		this.bouces = false;
		this.bouceEnergyTransfer = 0;

		//Used for animating size fade
		this.baseSize = 0.2;
		this.targetSize = 0.2;

		//Used for animating position fade
		this.x = x;
		this.y = y;
		this.z = z;
		this.targetPos = {x:x,y:y,z:z};

		this.textures = [];
	}
}