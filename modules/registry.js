class Registry{
	constructor(){
		this.loadedResourcesRegister = {};
		this.loadedResources = [];

		this.blockShaderMaterial;
		this.materialRegister = {};
		this.materials = [];
		this.shaderMats = [];
		
		this.itemRegister = {};

		this.emitterBuffer = [];
		this.particleBuffer = [];
		this.entityBuffer = [];

		this.last_entity_id = 0;
		this.last_emitter_id = 0;
		this.last_particle_id = 0;
	}

	loadResource(name){
		if (!this.loadedResourcesRegister.hasOwnProperty(name)){
			let texture = new THREE.TextureLoader().load(name)
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			this.loadedResources.push(texture);
			this.loadedResourcesRegister[name] = this.loadedResources.length-1;
			return this.loadedResources.length-1;
		}else{
			return this.loadedResourcesRegister[name]
		}
	}

	registerBlockShaderMaterial(texture_name,transparent){
		let texID = this.loadResource("minecraft/textures/block/"+texture_name)
		let texture = this.loadedResources[texID]
		if(!this.blockShaderMaterial){
			console.log(texture)
			let mat = new THREE.ShaderMaterial( {
				uniforms: {
					tex: { 
						value: texture,
						type: "t"
					}
				},
				vertexShader: document.getElementById( 'blockVertexShader' ).textContent,
				fragmentShader: document.getElementById( 'blockFragmentShader' ).textContent
			} );
			this.blockShaderMaterial = mat
			this.shaderMats.push(mat)
		}else{
			let new_mat = this.blockShaderMaterial.clone()
			new_mat.uniforms.tex.value = texture
			this.shaderMats.push(new_mat)
		}
		return this.shaderMats.length-1
	}

	registerMaterial(texture_name,transparent){
		let texID = this.loadResource("minecraft/textures/block/"+texture_name)
		if (!this.materialRegister.hasOwnProperty(texture_name)){
			let material = new THREE.MeshBasicMaterial( {map: this.loadedResources[texID],transparent: !transparent, side: THREE.DoubleSide} );
			this.materials.push(material);
			this.materialRegister[texture_name] = this.materials.length-1;
			return this.materials.length-1;
		}else{
			return this.materialRegister[texture_name]
		}
	}

	registerParticleMaterial(texture_name,transparent){
		let texID = this.loadResource("minecraft/textures/particle/"+texture_name)
		if (!this.materialRegister.hasOwnProperty(texture_name)){
			let material = new THREE.MeshBasicMaterial( {map: this.loadedResources[texID],transparent: transparent} );
			this.materials.push(material);
			this.materialRegister[texture_name] = this.materials.length-1;
			return this.materials.length-1;
		}else{
			return this.materialRegister[texture_name]
		}
	}

	getBlockInstanceFromId(id, x, y, z, ctex){ // MAKE THIS FIND THE BLOCK FROM A LIST OF REGISTERED BLOCKS
		switch(id){
			case 0:
				return 0;
				break;
			case 1:
				return new GrassBlock(x, y, z, ctex);
				break;
			case 2:
				return new OakLog(x, y, z, ctex);
				break;
			case 3:
				return new OakLeaves(x, y, z, ctex);
				break;
			case 4:
				return new Bedrock(x, y, z, ctex);
				break;
			case 5:
				return new Stone(x, y, z, ctex);
				break;
			case 6:
				return new StructureBlock(x, y, z, ctex);
				break;
			case 7:
				return new Dirt(x, y, z, ctex);
				break;
		}
	}

	getItemInstanceFromId(id){
		switch(id){
			case 0:
				return 0;
				break;
			case 1:
				return new WoodenPickaxeItem();
				break;
			case 2:
				return new WoodenShovelItem();
				break;
			case 3:
				return new WoodenSwordItem();
				break;
			case 4:
				return new WoodenAxeItem();
				break;
			case 5:
				return new WoodenHoeItem();
				break;
			case 6:
				return new LeatherItem();
				break;
			case 7:
				return new RawBeefItem();
				break;
			case 8:
				return new DiamondHelmetItem();
				break;
			case 9:
				return new DiamondChestplateItem();
				break;
			case 10:
				return new DiamondLeggingsItem();
				break;
			case 11:
				return new DiamondBootsItem();
				break;
			case 12:
				return new DirtBlockItem();
				break;
			case 13:
				return new SeedsItem();
				break;
		}
	}

	updateAll(){
		this.updateEntities()
		this.tickParticleEmitters()
		this.updateParticles()
	}

	registerEntity(entity){
		this.entityBuffer.push(entity);
		entity.entityId = ++this.last_entity_id;
	}

	updateEntities(){
		for(let i=0;i<this.entityBuffer.length;i++){
			this.entityBuffer[i].update();
		}
		entity_collision_check();
	}

	unRegisterEntity(entityId){
		for (var i = this.entityBuffer.length - 1; i >= 0; i--) {
			if(this.entityBuffer[i].entityId == entityId){
				this.entityBuffer.splice(i,1)
				return
			}
		}
	}

	registerEmitter(emitter){
		this.emitterBuffer.push(emitter);
		emitter.id = ++this.last_emitter_id;
	}

	tickParticleEmitters(){
		for(let i=0;i<this.emitterBuffer.length;i++){
			this.emitterBuffer[i].tick();
		}
	}

	unRegisterEmitter(emitterId){
		for (var i = this.emitterBuffer.length - 1; i >= 0; i--) {
			if(this.emitterBuffer[i].id == emitterId){
				this.emitterBuffer.splice(i,1)
				return
			}
		}
	}

	registerParticle(particle){
		this.particleBuffer.push(particle);
		particle.id = ++this.last_particle_id;
	}

	updateParticles(){
		for(let i=0;i<this.particleBuffer.length;i++){
			this.particleBuffer[i].update();
		}
	}

	unRegisterParticle(id){
		for (var i = this.particleBuffer.length - 1; i >= 0; i--) {
			if(this.particleBuffer[i].id == id){
				this.particleBuffer.splice(i,1)
				return
			}
		}
	}
}