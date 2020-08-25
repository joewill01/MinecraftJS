

THREE.PointerLockControls = function ( camera, domElement ) {

	if ( domElement === undefined ) {

		console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
		domElement = document.body;

	}

	this.domElement = domElement;
	this.isLocked = false;

	// Set to constrain the pitch of the camera
	// Range is 0 to Math.PI radians
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var lockEvent = { type: 'lock' };
	var unlockEvent = { type: 'unlock' };

	var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );

	var PI_2 = Math.PI / 2;

	var vec = new THREE.Vector3();

	function onMouseMove( event ) {

		if ( scope.isLocked === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		euler.setFromQuaternion( camera.quaternion );

		euler.y -= movementX * 0.002;
		euler.x -= movementY * 0.002;

		euler.x = Math.max( PI_2 - scope.maxPolarAngle, Math.min( PI_2 - scope.minPolarAngle, euler.x ) );

		camera.quaternion.setFromEuler( euler );

		scope.dispatchEvent( changeEvent );

	}

	function onPointerlockChange() {

		if ( scope.domElement.ownerDocument.pointerLockElement === scope.domElement ) {

			scope.dispatchEvent( lockEvent );

			scope.isLocked = true;

		} else {

			scope.dispatchEvent( unlockEvent );

			scope.isLocked = false;

		}

	}

	function onPointerlockError() {

		console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );

	}

	this.connect = function () {

		scope.domElement.ownerDocument.addEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.ownerDocument.addEventListener( 'pointerlockchange', onPointerlockChange, false );
		scope.domElement.ownerDocument.addEventListener( 'pointerlockerror', onPointerlockError, false );

	};

	this.disconnect = function () {

		scope.domElement.ownerDocument.removeEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.ownerDocument.removeEventListener( 'pointerlockchange', onPointerlockChange, false );
		scope.domElement.ownerDocument.removeEventListener( 'pointerlockerror', onPointerlockError, false );

	};

	this.dispose = function () {

		this.disconnect();

	};

	this.getObject = function () { // retaining this method for backward compatibility

		return camera;

	};

	this.getDirection = function () {

		var direction = new THREE.Vector3( 0, 0, - 1 );

		return function ( v ) {

			return v.copy( direction ).applyQuaternion( camera.quaternion );

		};

	}();

	this.move = function ( distance, flip, vertical) {

		// move forward parallel to the xz-plane
		// assumes camera.up is y-up
		vec.setFromMatrixColumn( camera.matrix, 0 );

		if(!flip){
			vec.crossVectors( camera.up, vec );
		}

		let collided_with = null;

		if(!vertical){
			let vecX = vec.clone()
			vecX.z = 0;
			vecX.x = vecX.x * distance
			collided_with = mesh_collision_check(vecX, player.hitbox)
			if(!collided_with.collidedWorld){
				camera.position.add(vecX);
			}

			let vecZ = vec.clone()
			vecZ.x = 0;
			vecZ.z = vecZ.z * distance
			collided_with = mesh_collision_check(vecZ, player.hitbox)
			if(!collided_with.collidedWorld){
				camera.position.add(vecZ);
			}
		}else{
			let vecY = vec.clone()
			vecY.z = 0;
			vecY.x = 0;
			vecY.y = distance;
			collided_with = mesh_collision_check(vecY, player.hitbox)
			if(!collided_with.collidedWorld){
				camera.position.y += distance;
			}
			else{
				canJump = true;
				player.velocity.y = 0;
			}
		}
		

		
	};

	this.lock = function () {
		this.domElement.requestPointerLock();
	};

	this.unlock = function () {

		scope.domElement.ownerDocument.exitPointerLock();

	};

	this.connect();

};

THREE.PointerLockControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.PointerLockControls.prototype.constructor = THREE.PointerLockControls;