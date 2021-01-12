class Particle{
	constructor(x,y,z){
		this.createdAt = null;
		this.lifespan = 1000;
		//determines how many texture changes it goes through
		this.animation_stages = 1;

		this.worldSpace = "2d";

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

	init(){
		let geometry = new THREE.PlaneBufferGeometry( this.baseSize, this.baseSize, this.baseSize );

		let tex = THREE.ImageUtils.loadTexture('minecraft/textures/particle/' + this.textures[0])
		tex.magFilter = THREE.NearestFilter;
		tex.minFilter = THREE.NearestFilter;
		
		let material = new THREE.MeshBasicMaterial( {map: tex, side: THREE.DoubleSide, transparent: true} );
		this.particleMesh = new THREE.Mesh( geometry, material );
		this.particleMesh.position.set(this.x,this.y,this.z)
		scene.add( this.particleMesh );

		registry.registerParticle(this)
	}

	update(){
		if(this.worldSpace == "2d"){
			this.particleMesh.lookAt(player.camera.position)
		}
	}
}