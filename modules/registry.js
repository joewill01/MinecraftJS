class Registry{
	constructor(){
		this.textures = [];
		this.textureRegister = {};
		this.materials = [];
		this.materialRegister = {};
		this.itemRegister = {};

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
		}
	}

	registerEntity(entity){
		this.entityBuffer.push(entity);
		entity.entityId = this.entityBuffer.length
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
}