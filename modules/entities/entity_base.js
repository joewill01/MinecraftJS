class Entity {
	constructor(hw, hh, el, x, y, z, name) {
		this.hitboxWidth = hw;
		this.hitboxHeight = hh;
		this.eyeLevel = el;
		this.x = x;
		this.y = y;
		this.z = z;
		this.velocity = new THREE.Vector3();
		this.vec = new THREE.Vector3();
		this.mass = 0.3;
		this.terminalVelocity = 50;

		let geom = new THREE.CubeGeometry( this.hitboxWidth, this.hitboxHeight, this.hitboxWidth);
		let mat = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
		this.detectable = new THREE.Mesh( geom, mat);
		this.detectable.visible = false;
		this.detectable.name= name+"-detectable"
		this.detectable.position.x = this.x
		this.detectable.position.y = this.y
		this.detectable.position.z = this.z
		this.detectable.entity = this;
		scene.add( this.detectable );

		geom = new THREE.CubeGeometry( this.hitboxWidth, this.hitboxHeight, this.hitboxWidth);
		let wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe:true } );
		this.hitbox = new THREE.Mesh( geom, wireMaterial);
		this.hitbox.visible = renderHitboxes;
		this.hitbox.name= name+"-hitbox"
		this.hitbox.position.x = this.x
		this.hitbox.position.y = this.y
		this.hitbox.position.z = this.z
		scene.add( this.hitbox );

		if(el !== false){
			geom = new THREE.CubeGeometry( this.hitboxWidth+0.0001, 0.02, this.hitboxWidth+0.0001);
			wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe:true } );
			this.eyeLevelHitbox = new THREE.Mesh( geom, wireMaterial);
			this.eyeLevelHitbox.visible = renderHitboxes;
			this.eyeLevelHitbox.name=name+"-eye-level"
			scene.add( this.eyeLevelHitbox );
		}

		registry.registerEntity(this)
	}

	update(){
		
	}

	move(x, y, z, toMove){
		

		this.vec.setFromMatrixColumn( toMove.matrix, 0 );

		let flipVec = this.vec.clone()
		flipVec.crossVectors( toMove.up, flipVec );

		let collided_with = null;

		let vecX = this.vec.clone()
		let flipVecX = flipVec.clone()
		vecX.z = 0;
		flipVecX.z = 0;
		vecX.x = vecX.x * x
		flipVecX.x = flipVecX.x * z
		collided_with = mesh_collision_check(vecX.add(flipVecX), this.hitbox)
		this.handleCollisions(collided_with);
		if(!collided_with.collidedWorld){
			toMove.position.add(vecX);
		}else{
			this.velocity.z *= 0.001
			this.velocity.x *= 0.001
		}

		let vecZ = this.vec.clone()
		let flipVecZ = flipVec.clone()
		vecZ.x = 0;
		flipVecZ.x = 0;
		vecZ.z = vecZ.z * x
		flipVecZ.z = flipVecZ.z * z
		collided_with = mesh_collision_check(vecZ.add(flipVecZ), this.hitbox)
		this.handleCollisions(collided_with);
		if(!collided_with.collidedWorld){
			toMove.position.add(vecZ);
		}else{
			this.velocity.z *= 0.001
			this.velocity.x *= 0.001
		}

		let vecY = this.vec.clone()
		vecY.z = 0;
		vecY.x = 0;
		vecY.y = y;
		collided_with = mesh_collision_check(vecY, this.hitbox)
		this.handleCollisions(collided_with);
		if(!collided_with.collidedWorld){
			toMove.position.y += y;
		}
		else{
			this.velocity.y *= 0.001;
			this.onHitGround();
		}


		if(this.eyeLevelHitbox != undefined){
			this.eyeLevelHitbox.position.x = toMove.position.x
			this.eyeLevelHitbox.position.y = toMove.position.y
			this.eyeLevelHitbox.position.z = toMove.position.z

			this.hitbox.position.x = this.camera.position.x
			this.hitbox.position.y = this.camera.position.y - this.hitboxHeight/2 + (this.hitboxHeight - this.eyeLevel)
			this.hitbox.position.z = this.camera.position.z
		}else{
			this.hitbox.position.x = toMove.position.x
			this.hitbox.position.y = toMove.position.y
			this.hitbox.position.z = toMove.position.z
		}

		this.detectable.position.x = this.hitbox.position.x
		this.detectable.position.y = this.hitbox.position.y
		this.detectable.position.z = this.hitbox.position.z

	}

	handleCollisions(coll){
		
	}

	onHitGround(){

	}
}