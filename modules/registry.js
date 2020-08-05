class Registry{
	constructor(){
		this.textures = [];
		this.textureRegister = {};
		this.materials = [];
		this.materialRegister = {};
		this.itemRegister = {};
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
}