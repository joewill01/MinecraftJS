class Particle{
	constructor(x,y,z){
		this.createdAt = null;
		this.lifespan = 2000;
		//determines how many texture changes it goes through
		this.animation_stages = 1;
		this.prev_animation_stage = 0;

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
		this.startPos = {x:x,y:y,z:z};
		this.targetPos = {x:x,y:y,z:z};

		this.textures = [];
	}

	init(){
		this.animation_stages = this.textures.length
		this.createdAt = performance.now();
		let geometry = new THREE.PlaneBufferGeometry( this.baseSize, this.baseSize, this.baseSize );

		let mat_index = registry.registerParticleMaterial(this.textures[0], true)
		let material = registry.materials[mat_index]
		
		this.particleMesh = new THREE.Mesh( geometry, material );
		let tex_index = registry.registerParticleTexture(this.textures[0])
		let newTex = registry.textures[tex_index]
		this.particleMesh.material.map = newTex;
		this.particleMesh.material.map.needsUpdate = true;
		this.particleMesh.position.set(this.x,this.y,this.z)
		scene.add( this.particleMesh );

		registry.registerParticle(this)
		this.postInit()
	}

	update(){
		let aliveFor = performance.now() - this.createdAt
		let amountLeft = this.lifespan - aliveFor
		if (amountLeft < 0){
			amountLeft = 0;
			this.remove()
			return
		}
		if(this.worldSpace == "2d"){
			this.particleMesh.lookAt(player.camera.position)

			let stage = Math.floor(aliveFor/(this.lifespan/this.animation_stages))
			if(stage > this.animation_stages){
				stage = this.animation_stages-1
			}
			if(stage != this.prev_animation_stage){
				let tex_index = registry.registerParticleTexture(this.textures[parseInt(stage)])
				let newTex = registry.textures[tex_index]
				this.particleMesh.material.map = newTex;
				this.particleMesh.material.map.needsUpdate = true;
				this.prev_animation_stage = stage;
			}

			let dec_through_anim = aliveFor / this.lifespan
			if(dec_through_anim > 1){
				dec_through_anim = 1;
			}

			if(this.x!=this.targetPos.x||this.y!=this.targetPos.y||this.z!=this.targetPos.z){
				this.x = this.startPos.x + ((this.targetPos.x-this.startPos.x)*dec_through_anim)
				this.y = this.startPos.y + ((this.targetPos.y-this.startPos.y)*dec_through_anim)
				this.z = this.startPos.z + ((this.targetPos.z-this.startPos.z)*dec_through_anim)
				this.particleMesh.position.set(this.x,this.y,this.z)
			}

			if(this.baseSize != this.targetSize){
				if(this.baseSize == 0){
					this.baseSize = 0.001;
				}
				let targetScale = this.targetSize/this.baseSize
				let new_scale;
				if(targetScale<=0){
					new_scale = 1-((1 - targetScale)*dec_through_anim)
				}else{
					new_scale = (targetScale - 1)*dec_through_anim
				}
				this.particleMesh.scale.set(new_scale,new_scale,new_scale)
			}
				
		}else{// Handle 3d particles?

		}
		this.customUpdate();
	}

	customUpdate(){
		//Stuff only the extended particle does
	}

	remove(){
		registry.unRegisterParticle(this.id)
		scene.remove(this.particleMesh)
		this.particleMesh.geometry.dispose()
		this.particleMesh.geometry = undefined;
		this.particleMesh.material.dispose()
		this.particleMesh.material = undefined;
		if (this.particleMesh.texture)
        {
            this.particleMesh.texture.dispose();
            this.particleMesh.texture = undefined;
        }
		this.particleMesh = null;
	}

	postInit(){
		
	}
}