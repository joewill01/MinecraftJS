

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

	this.moveForward = function ( distance ,flip) {

		// move forward parallel to the xz-plane
		// assumes camera.up is y-up
		const vector = new THREE.Vector3();

		vec.setFromMatrixColumn( camera.matrix, 0 );

		if(!flip){
			vec.crossVectors( camera.up, vec );
		}

		var originPoint = player.hitbox.position.clone();

		let collided = false
		//For every point in the player hitbox geometry
		for (var vertexIndex = 0; vertexIndex < player.hitbox.geometry.vertices.length; vertexIndex++){
			//Calculate its position in world space
			if(vertexIndex == player.hitbox.geometry.vertices.length - 1){
				var localVertex = player.hitbox.geometry.vertices[vertexIndex].clone();
	    		var localVertex2 = player.hitbox.geometry.vertices[0].clone();
			}else{
				var localVertex = player.hitbox.geometry.vertices[vertexIndex].clone();
	    		var localVertex2 = player.hitbox.geometry.vertices[vertexIndex + 1].clone();
			}
	    	
			let globalVertex = localVertex.applyMatrix4(player.hitbox.matrix);
			let globalVertex2 = localVertex2.applyMatrix4(player.hitbox.matrix);
			//Calculate the new position of the vertex
	    	globalVertex.x = globalVertex.x + vec.x*distance
	    	globalVertex.z = globalVertex.z + vec.z*distance
	    	globalVertex2.x = globalVertex2.x + vec.x*distance
	    	globalVertex2.z = globalVertex2.z + vec.z*distance
	    	//Calculate the direction vector to the vertex from the hitbox's new position
	    	//NTS: Did not calculate the new position here
	    	let directionVector =  globalVertex.sub(globalVertex2);
	    	//Cast a ray from the hitbox's position to the geometry vertex
	    	let ray = new THREE.Raycaster( globalVertex2, directionVector.clone().normalize() );

			//Find all the items it intersects
			let collisionResults = ray.intersectObjects( world.get_chunk_instances_array() );
			//Test if we have collided with something
			if ( collisionResults.length > 0 && collisionResults[0].distance < globalVertex.length() ) 
		    {
		    	collided = true;
		    }

		}
		if(!collided){
			camera.position.addScaledVector( vec, distance );
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