class Registry{
	constructor(){
		this.last_entity_id = 0;
		this.last_emitter_id = 0;
		this.last_particle_id = 0;

		this.textures = [];
		this.textureRegister = {};

		this.materials = [];
		this.materialRegister = {};

		this.itemRegister = {};

		this.emitterBuffer = [];
		this.particleRegister = {};
		this.particleBuffer = [];

		this.entityBuffer = [];
	}

	_registerBlockTexture(texName){
		if (!this.textureRegister.hasOwnProperty(texName)){
			let texture = new THREE.TextureLoader().load(`minecraft/textures/block/${texName}`)
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			this.textures.push(texture);
			this.textureRegister[texName] = this.textures.length-1;
			return this.textures.length-1;
		}else{
			return this.textureRegister[texName]
		}
	}

	registerMaterial(texture_name,transparent){
		let texID = this._registerBlockTexture(texture_name)
		if (!this.materialRegister.hasOwnProperty(texture_name)){
			let material = new THREE.MeshBasicMaterial( {
				map: this.textures[texID],
				transparent: transparent, 
				side: THREE.DoubleSide,
				vertexColors: THREE.VertexColors
			});
			this.materials.push(material);
			this.materialRegister[texture_name] = this.materials.length-1;
			return this.materials.length-1;
		}else{
			return this.materialRegister[texture_name]
		}
	}

	registerParticleTexture(texName){
		if (!this.particleRegister.hasOwnProperty(texName)){
			let texture = new THREE.TextureLoader().load(`minecraft/textures/particle/${texName}`)
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			this.textures.push(texture);
			this.particleRegister[texName] = this.textures.length-1;
			return this.textures.length-1;
		}else{
			return this.particleRegister[texName]
		}
	}

	registerParticleMaterial(texture_name,transparent){
		let texID = this.registerParticleTexture(texture_name)
		if (!this.materialRegister.hasOwnProperty(texture_name)){
			let material = new THREE.MeshBasicMaterial( {map: this.textures[texID],transparent: transparent} );
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
				return new Air(x,y,z);
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
			case 8:
				return new Cobblestone(x,y,z,ctex);
				break;
			case 9:
				return new OakPlanks(x,y,z,ctex);
				break;
			case 10:
				return new IronOre(x,y,z,ctex);
				break;
			case 11:
				return new Furnace(x,y,z,ctex);
				break;
			case 12:
				return new CoalOre(x,y,z,ctex);
				break;
			case 13:
				return new GoldOre(x,y,z,ctex);
				break;
			case 14:
				return new DiamondOre(x,y,z,ctex);
				break;
			case 15:
				return new RedstoneOre(x,y,z,ctex);
				break;
			case 16:
				return new EmeraldOre(x,y,z,ctex);
				break;
			case 17:
				return new LapisLazuliOre(x,y,z,ctex);
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
				return new DirtItem();
				break;
			case 13:
				return new SeedsItem();
				break;
			case 14:
				return new CobblestoneItem();
				break;
			case 15:
				return new OakPlanksItem();
				break;
			case 16:
				return new IronOreItem();
				break;
			case 17:
				return new FurnaceItem();
				break;
			case 18:
				return new CoalOreItem();
				break;
			case 19:
				return new GoldOreItem();
				break;
			case 20:
				return new DiamondOreItem();
				break;
			case 21:
				return new RedstoneOreItem();
				break;
			case 22:
				return new EmeraldOreItem();
				break;
			case 23:
				return LapisLazuliOreItem();
				break;
			case 24:
				return new DiamondItem();
				break;
			case 25:
				return new RedstoneItem();
				break;
			case 26:
				return new CoalItem();
				break;
			case 27:
				return new EmeraldItem();
				break;
			case 28:
				return new LapisLazuliItem();
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