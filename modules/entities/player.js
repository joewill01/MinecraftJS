class Player extends Entity{
	constructor(){
		super(0.6, 1.8, 1.6, 0, 100, 0);

		this.perspective = 1;

		this.velocity = new THREE.Vector3();

		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.thirdPersonCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.secondPersonCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.set(this.x,this.y,this.z);
		this.controls = new THREE.PointerLockControls(this.camera, renderer.domElement);

		// this.move = this.move.bind(this);
		// document.addEventListener("mousemove", this.move, true);
		this.camera.add(this.thirdPersonCamera)
		this.camera.add(this.secondPersonCamera)
	}

	tp(x,y,z){
		if(x.toString().includes("~")){
			if(x.toString().length != 1){
				this.camera.position.x += parseInt(x.toString().slice(1));
			}
		}else{
			this.camera.position.x = x;
		}

		if(y.toString().includes("~")){
			if(y.toString().length != 1){
				this.camera.position.y += parseInt(y.toString().slice(1));
			}
		}else{
			this.camera.position.y = y;
		}

		if(z.toString().includes("~")){
			if(z.toString().length != 1){
				this.camera.position.z += parseInt(z.toString().slice(1));
			}
		}else{
			this.camera.position.z = z;
		}
	}


	moveCamera() {

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		//Change speed if sprinting
		if (!sprinting){
			this.velocity.x -= this.velocity.x * 16.0 * delta;
			this.velocity.z -= this.velocity.z * 16.0 * delta;
		}else{
			this.velocity.x -= this.velocity.x * 10.0 * delta;
			this.velocity.z -= this.velocity.z * 10.0 * delta;
		}
		
		//Change the FOV of the camera to show you are sprinting
		if(sprinting && this.camera.fov < 80){
			this.camera.fov ++;
		}
		if(!sprinting && this.camera.fov > 70){
			this.camera.fov -= 0.5;
		}
		this.camera.updateProjectionMatrix();

		this.velocity.y -= 9.8 * 2.5 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) this.velocity.z -= direction.z * 1 * delta;
		if ( moveLeft || moveRight ) this.velocity.x -= direction.x * 1 * delta;

		this.controls.move( - this.velocity.x, true, false);
		this.controls.move( - this.velocity.z, false, false);
		this.controls.move(   this.velocity.y * delta, false, true);

		prevTime = time;

		this.eyeLevelHitbox.position.x = this.camera.position.x
		this.eyeLevelHitbox.position.y = this.camera.position.y
		this.eyeLevelHitbox.position.z = this.camera.position.z

		this.hitbox.position.x = this.camera.position.x
		this.hitbox.position.y = this.camera.position.y - this.hitboxHeight/2 + (this.hitboxHeight - this.eyeLevel)
		this.hitbox.position.z = this.camera.position.z

		//Do a raycast here to see how far away the nearsest block is and then set the z to that if its less than 5
		this.thirdPersonCamera.position.z = 5
		this.thirdPersonCamera.lookAt(this.camera.position)

		this.secondPersonCamera.position.z = -5
		this.secondPersonCamera.lookAt(this.camera.position)

		this.x = this.camera.position.x
		this.y = this.camera.position.y
		this.z = this.camera.position.z

	}

	getCamera(){
		if(this.perspective == 1){
			return this.camera;
		}else if (this.perspective == 3){
			return this.thirdPersonCamera;
		}else{
			return this.secondPersonCamera;
		}
	}

	getSurroundingChunks(){
		let coords = world.world_to_chunk_coords(this.x,this.y,this.z)
		let surrounding = [];

		surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z))
		if(Math.floor(coords.pos_x) == 0){
			surrounding.push(world.get_chunk_name(coords.chunk_x-1, coords.chunk_z))
		}else if(Math.floor(coords.pos_x) == 15){
			surrounding.push(world.get_chunk_name(coords.chunk_x+1, coords.chunk_z))
		}if(Math.floor(coords.pos_z) == 0){
			surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z-1))
		}if(Math.floor(coords.pos_z) == 15){
			surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z+1))
		}
		return surrounding
	}
}



