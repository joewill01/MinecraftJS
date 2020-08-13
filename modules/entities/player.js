class Player extends Entity{
	constructor(){
		super(0.6, 1.8, 1.6, 0, 100, 0);

		this.thirdPerson = false;

		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.thirdPersonCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.set(this.x,this.y,this.z);
		this.controls = new THREE.PointerLockControls(this.camera, renderer.domElement);
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
			velocity.x -= velocity.x * 16.0 * delta;
			velocity.z -= velocity.z * 16.0 * delta;
		}else{
			velocity.x -= velocity.x * 10.0 * delta;
			velocity.z -= velocity.z * 10.0 * delta;
		}
		
		//Change the FOV of the camera to show you are sprinting
		if(sprinting && this.camera.fov < 80){
			this.camera.fov ++;
		}
		if(!sprinting && this.camera.fov > 70){
			this.camera.fov -= 0.5;
		}
		this.camera.updateProjectionMatrix();

		velocity.y -= 9.8 * 2.5 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 1 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 1 * delta;

		this.controls.moveRight( - velocity.x);
		this.controls.moveForward( - velocity.z);

		// check if we are on the floor level (y = 2 all the time atm)
		this.controls.getObject().position.y += ( velocity.y * delta ); // new behavior
		if ( this.controls.getObject().position.y < setYHeight ) {
			velocity.y = 0;
			this.controls.getObject().position.y = setYHeight;
			canJump = true;
		}
		prevTime = time;

		this.hitbox.position.x = this.camera.position.x
		this.hitbox.position.y = this.camera.position.y - this.hitboxHeight/2 + (this.hitboxHeight - this.eyeLevel)
		this.hitbox.position.z = this.camera.position.z

		this.eyeLevelHitbox.position.x = this.camera.position.x
		this.eyeLevelHitbox.position.y = this.camera.position.y
		this.eyeLevelHitbox.position.z = this.camera.position.z

		this.thirdPersonCamera.position.x = this.camera.position.x
		this.thirdPersonCamera.position.y = this.camera.position.y + 2
		this.thirdPersonCamera.position.z = this.camera.position.z

		this.thirdPersonCamera.rotation.x = this.camera.rotation.x
		this.thirdPersonCamera.rotation.y = this.camera.rotation.y 
		this.thirdPersonCamera.rotation.z = this.camera.rotation.z  
	}

	getCamera(){
		if(!this.thirdPerson){
			return this.camera;
		}else{
			return this.thirdPersonCamera;
		}
	}
}