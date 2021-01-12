class Emitter{
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		this.name="NotSet"
		this.id = null;
		this.active = false;
		this.particles = [];
	}

	init(){
		this.emitter = new THREE.Object3D();
		this.emitter.position.x = this.x 
		this.emitter.position.y = this.y 
		this.emitter.position.z = this.z
		this.emitter.name = this.name
		scene.add(this.emitter)
		registry.registerEmitter(this)
		this.active = true;
	}

	tick(){
		//Check if we should emit. Determines delay
	}

	emit(){
		//Create the particle
	}	
}