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
		this.hasGravity = true;

		let geom = new THREE.CubeGeometry( this.hitboxWidth, this.hitboxHeight, this.hitboxWidth);
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

		let hitboxGeom = new THREE.CubeGeometry( 1.001,1.001,1.001 );
		let mat = new THREE.MeshBasicMaterial({ color: 0x888888, visible:false });

		this.boxes = [
			//Floor
			[new THREE.Mesh(hitboxGeom,mat), 0,0,0],
			[new THREE.Mesh(hitboxGeom,mat), 1,0,0],
			[new THREE.Mesh(hitboxGeom,mat), 0,0,1],
			[new THREE.Mesh(hitboxGeom,mat), 1,0,1],

			//Ceiling
			[new THREE.Mesh(hitboxGeom,mat), 0,3,0],
			[new THREE.Mesh(hitboxGeom,mat), 1,3,0],
			[new THREE.Mesh(hitboxGeom,mat), 0,3,1],
			[new THREE.Mesh(hitboxGeom,mat), 1,3,1],

			//Center1
			[new THREE.Mesh(hitboxGeom,mat), 0,1,0],
			[new THREE.Mesh(hitboxGeom,mat), 1,1,0],
			[new THREE.Mesh(hitboxGeom,mat), 0,1,1],
			[new THREE.Mesh(hitboxGeom,mat), 1,1,1],

			//Center2
			[new THREE.Mesh(hitboxGeom,mat), 0,2,0],
			[new THREE.Mesh(hitboxGeom,mat), 1,2,0],
			[new THREE.Mesh(hitboxGeom,mat), 0,2,1],
			[new THREE.Mesh(hitboxGeom,mat), 1,2,1],

			//Left
			[new THREE.Mesh(hitboxGeom,mat), -1,1,0],
			[new THREE.Mesh(hitboxGeom,mat), -1,1,1],
			[new THREE.Mesh(hitboxGeom,mat), -1,2,0],
			[new THREE.Mesh(hitboxGeom,mat), -1,2,1],

			//Right
			[new THREE.Mesh(hitboxGeom,mat), 2,1,0],
			[new THREE.Mesh(hitboxGeom,mat), 2,1,1],
			[new THREE.Mesh(hitboxGeom,mat), 2,2,0],
			[new THREE.Mesh(hitboxGeom,mat), 2,2,1],

			//Front
			[new THREE.Mesh(hitboxGeom,mat), 0,1,-1],
			[new THREE.Mesh(hitboxGeom,mat), 1,1,-1],
			[new THREE.Mesh(hitboxGeom,mat), 0,2,-1],
			[new THREE.Mesh(hitboxGeom,mat), 1,2,-1],

			//Back
			[new THREE.Mesh(hitboxGeom,mat), 0,1,2],
			[new THREE.Mesh(hitboxGeom,mat), 1,1,2],
			[new THREE.Mesh(hitboxGeom,mat), 0,2,2],
			[new THREE.Mesh(hitboxGeom,mat), 1,2,2],

		]

		this.boxes.forEach((box, index) => {
		  	scene.add( box[0] );
		})
	
		registry.registerEntity(this)
	}

	update(){
		this.updateCollBoxes();
	}

	updateCollBoxes(){
		this.boxes.forEach((boxData, index) => {
			let box = boxData[0]
			let x = Math.floor(this.hitbox.position.x)+boxData[1]
			let y = Math.floor(this.hitbox.position.y-1.4)+boxData[2]
			let z = Math.floor(this.hitbox.position.z)+boxData[3]
		  	box.position.set(x,y,z);
			const block_at_pos = world.get_block(x,y,z)
		  	if(block_at_pos.ID != 0 && block_at_pos.hitbox == true){
		  		box.visible = false;
		  		box.collidable = true;
		  	}else{
		  		box.visible = false;
		  		box.collidable = false;
		  	}
		})
	}

	move(x, y, z, toMove){

		this.vec.setFromMatrixColumn( toMove.matrix, 0 );

		let flipVec = this.vec.clone()
		flipVec.crossVectors( toMove.up, flipVec );

		let moveVec = new THREE.Vector3(0,0,0);

		let vecX = this.vec.clone()
		let flipVecX = flipVec.clone()
		vecX.z = 0;
		flipVecX.z = 0;
		vecX.x = vecX.x * x
		flipVecX.x = flipVecX.x * z
		
		let vecZ = this.vec.clone()
		let flipVecZ = flipVec.clone()
		vecZ.x = 0;
		flipVecZ.x = 0;
		vecZ.z = vecZ.z * x
		flipVecZ.z = flipVecZ.z * z

		moveVec.x = vecX.add(flipVecX).x;
		moveVec.z = vecZ.add(flipVecZ).z;
		moveVec.y = y;

		let collisionTime;
		let colliders = this.boxes.filter(block => block[0].collidable==true).map(block => block[0])

		if (colliders.length == 0) {
			toMove.position.x += moveVec.x;
			toMove.position.y += moveVec.y;
			toMove.position.z += moveVec.z;

		} else {
			//STAGE 1
			let times = []
			for (var i = colliders.length - 1; i >= 0; i--) {
				times.push(sweptAABB(this.hitbox, moveVec, colliders[i], this));
			}

			collisionTime = times.reduce((prev, curr) => {
				return prev.entryTime < curr.entryTime ? prev : curr;
			})

			if (collisionTime.entryTime > 1) {collisionTime.entryTime = 1}

			toMove.position.x += moveVec.x * collisionTime.entryTime
			toMove.position.y += moveVec.y * collisionTime.entryTime
			toMove.position.z += moveVec.z * collisionTime.entryTime

			//STAGE 2
			let remainingTime = 1 - collisionTime.entryTime;

			moveVec.x *= remainingTime;
			moveVec.y *= remainingTime;
			moveVec.z *= remainingTime;

			if (remainingTime > 0) {
				if (collisionTime.normal.x != 0) {
					moveVec.x = 0;
				}
				if (collisionTime.normal.y != 0) {
					moveVec.y = 0;
					this.velocity.y = 0;
					this.onHitGround();
				}
				if (collisionTime.normal.z != 0) {
					moveVec.z = 0;
				}
			}

			times = []
			for (var i = colliders.length - 1; i >= 0; i--) {
				times.push(sweptAABB(this.hitbox, moveVec, colliders[i], this));
			}

			collisionTime = times.reduce((prev, curr) => {
				return prev.entryTime < curr.entryTime ? prev : curr;
			})

			if (collisionTime.entryTime > 1) {collisionTime.entryTime = 1}

			toMove.position.x += moveVec.x * collisionTime.entryTime
			toMove.position.y += moveVec.y * collisionTime.entryTime
			toMove.position.z += moveVec.z * collisionTime.entryTime

			//STAGE 3
			remainingTime = 1 - collisionTime.entryTime;

			moveVec.x *= remainingTime;
			moveVec.y *= remainingTime;
			moveVec.z *= remainingTime;

			if (remainingTime > 0) {
				if (collisionTime.normal.x != 0) {
					moveVec.x = 0;
				}
				if (collisionTime.normal.y != 0) {
					moveVec.y = 0;
					this.velocity.y = 0;
					this.onHitGround();
				}
				if (collisionTime.normal.z != 0) {
					moveVec.z = 0;
				}
			}

			times = []
			for (var i = colliders.length - 1; i >= 0; i--) {
				times.push(sweptAABB(this.hitbox, moveVec, colliders[i], this));
			}

			collisionTime = times.reduce((prev, curr) => {
				return prev.entryTime < curr.entryTime ? prev : curr;
			})

			if (collisionTime.entryTime > 1) {collisionTime.entryTime = 1}

			toMove.position.x += moveVec.x * collisionTime.entryTime
			toMove.position.y += moveVec.y * collisionTime.entryTime
			toMove.position.z += moveVec.z * collisionTime.entryTime



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
	}

	handleCollisions(coll){
		
	}

	onHitGround(){

	}

	cleanup(){
		
	}
}