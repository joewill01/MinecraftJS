let hotbar = new Hotbar(0, 20, 14, 20, 17);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99ccff );
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,100,0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geom = new THREE.BoxBufferGeometry( 1.001, 1.001, 1.001);
var edges = new THREE.EdgesGeometry( geom );
var selectionCube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
selectionCube.visible = false;
selectionCube.name = "selectionCube";
scene.add( selectionCube );

var registry = new Registry();

var world = new World()
world.generate_chunk(0,0,"0_0");
world.generate_chunk(1,0,"1_0");
world.generate_chunk(0,1,"0_1");
world.generate_chunk(1,1,"1_1");
world.generate_chunk(1,-1,"1_-1");
world.generate_chunk(0,-1,"0_-1");
world.generate_chunk(-1,0,"-1_0");
world.generate_chunk(-1,-1,"-1_-1");
world.generate_chunk(-1,1,"-1_1");

var controls = new THREE.PointerLockControls(camera, renderer.domElement);

control_type = 'pointer';

if (control_type === 'touch') {
	// for touch controls
	let hammer = new Hammer(renderer.domElement);

	hammer.on("panleft panright panup pandown", function(e) {
		if (e.type === 'panleft') {
			camera.rotation.y += Math.PI / 180
		} else if (e.type === 'panright') {
			camera.rotation.y -= Math.PI / 180
		}
	})

} else if (control_type === 'pointer') {
	// for pointer controls
	canvas=document.getElementsByTagName("canvas")[0];
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

	renderer.domElement.onclick = function() {
		controls.connect();
		controls.lock();
		document.documentElement.requestFullscreen().then(result => {
			renderer.setSize( window.innerWidth, window.innerHeight );
			camera.width = window.innerWidth
			camera.height = window.innerHeight
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			navigator.keyboard.lock();
		})
	};
}


scene.add(controls.getObject());

// var setup
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;
var prevTime = performance.now();
var sprinting = false;
var ctlHeld = false;
var prevSelected = null;
var selected = null;
var lookingAt = null;

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 27: // esc
			navigator.keyboard.unlock();
			controls.unlock();
			break;
		case 87: // w
			moveForward = true;
			if(ctlHeld){
				sprinting = true;
			}
			break;
		case 65: // a
			moveLeft = true;
			break;
		case 83: // s
			moveBackward = true;
			break;
		case 68: // d
			moveRight = true;
			break;
		case 32: // space
			if ( canJump === true ) velocity.y += 8;
			canJump = false;
			break;
		case 17: //Left Ctl
			ctlHeld = true;
			if(moveForward && !moveBackward){
				sprinting = true;
			}
			break;
		case 49: // 1
			hotbar.selectItem(0);
			break;
		case 50: // 2
			hotbar.selectItem(1);
			break;
		case 51: // 3
			hotbar.selectItem(2);
			break;
		case 52: // 4
			hotbar.selectItem(3);
			break;
		case 53: // 5
			hotbar.selectItem(4);
			break;
		case 54: // 6
			hotbar.selectItem(5);
			break;
		case 55: // 7
			hotbar.selectItem(6);
			break;
		case 56: // 8
			hotbar.selectItem(7);
			break;
		case 57: // 9
			hotbar.selectItem(8);
			break;
	}

};

document.onclick = function(e){
	if(e.which == 1){// LEFT CLICK
		if(lookingAt != null){
			console.log(world.get_block(lookingAt.blockCoords.x,lookingAt.blockCoords.y,lookingAt.blockCoords.z))
		}
	}else if(e.which == 2){
		console.log("MIDDLE")
	}else if(e.which == 3){
		console.log("RIGHT")
	}
}

var onKeyUp = function ( event ) {

	switch ( event.keyCode ) {
		case 87: // w
			moveForward = false;
			sprinting = false;
			break;
		case 65: // a
			moveLeft = false;
			break;
		case 83: // s
			moveBackward = false;
			break;
		case 68: // d
			moveRight = false;
			break;
		case 17: //Left Ctl
			ctlHeld = false;
			sprinting = false;
			break;
	}
};

function getSelected(raycaster, mouse){
	mouse.x = ( (renderer.domElement.width/2) / window.innerWidth ) * 2 - 1;
	mouse.y = - ( (renderer.domElement.height/2) / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children ,true);

	if (intersects.length >= 1){
		intersects = intersects.filter((item) => !(item.object instanceof THREE.LineSegments))
	}
	
	if (intersects.length >= 1){
		if (intersects[0].distance <= 4){
			lookingAt = intersects[ 0 ]
			let pos = lookingAt.point
			let normal = lookingAt.face.normal
			//console.log(pos.x,pos.y,pos.z)
			normal.x = Math.round(normal.x)
			normal.y = Math.round(normal.y)
			normal.z = Math.round(normal.z)

			if(normal.y == -0){
				normal.y = 0;
			}

			if(normal.x==0 & normal.y==1 & normal.z==0){
				//console.log("Top")
				pos.y -= 0.5
				pos.x = Math.floor(pos.x + 0.5)
				pos.z = Math.floor(pos.z + 0.5)
			}else if(normal.x==0 & normal.y==-1 & normal.z==0){
				//console.log("Bottom")
				pos.y += 0.5
				pos.x = Math.floor(pos.x + 0.5)
				pos.z = Math.floor(pos.z + 0.5)
			}else if(normal.x==1 & normal.y==0 & normal.z==0){
				//console.log("North")
				pos.y = Math.floor(pos.y + 0.5)
				pos.x -= 0.5
				pos.z = Math.floor(pos.z + 0.5)
			}else if(normal.x==-1 & normal.y==0 & normal.z==0){
				//console.log("South")
				pos.y = Math.floor(pos.y + 0.5)
				pos.x += 0.5
				pos.z = Math.floor(pos.z + 0.5)
			}else if(normal.x==0 & normal.y==0 & normal.z==1){
				//console.log("East")
				pos.y = Math.floor(pos.y + 0.5)
				pos.x = Math.floor(pos.x + 0.5)
				pos.z -= 0.5
			}else if(normal.x==0 & normal.y==0 & normal.z==-1){
				//console.log("West")
				pos.y = Math.floor(pos.y + 0.5)
				pos.x = Math.floor(pos.x + 0.5)
				pos.z += 0.5
			}

			//Fix spazzing
			pos.x = Math.floor(pos.x + 0.00001)
			pos.z = Math.floor(pos.z + 0.00001)
			pos.y = Math.floor(pos.y + 0.00001)

			selectionCube.position.x = pos.x
			selectionCube.position.y = pos.y
			selectionCube.position.z = pos.z
			selectionCube.visible = true;
			lookingAt.blockCoords = pos
			//intersects[ 0 ].object.parent.children.forEach(element => 
			//	element.material.color.set( 0xff0000 )
			//);
		}else{
			lookingAt = null;
			selectionCube.visible = false;
		}
	}else{
		lookingAt = null;
		selectionCube.visible = false;
	}
}

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

window.addEventListener("wheel", (e) => {
	if (e.deltaY < 0) {
		hotbar.itemDown();
	} else {
		hotbar.itemUp();
	}
});


function moveCamera() {

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
	if(sprinting && camera.fov < 80){
		camera.fov ++;
	}
	if(!sprinting && camera.fov > 70){
		camera.fov -= 0.5;
	}
	camera.updateProjectionMatrix();

	velocity.y -= 9.8 * 2.5 * delta; // 100.0 = mass

	direction.z = Number( moveForward ) - Number( moveBackward );
	direction.x = Number( moveRight ) - Number( moveLeft );
	direction.normalize(); // this ensures consistent movements in all directions

	if ( moveForward || moveBackward ) velocity.z -= direction.z * 1 * delta;
	if ( moveLeft || moveRight ) velocity.x -= direction.x * 1 * delta;

	controls.moveRight( - velocity.x);
	controls.moveForward( - velocity.z);

	// check if we are on the floor level (y = 2 all the time atm)
	controls.getObject().position.y += ( velocity.y * delta ); // new behavior
	if ( controls.getObject().position.y < 23 ) {
		velocity.y = 0;
		controls.getObject().position.y = 23;
		canJump = true;
	}
	prevTime = time;
}


//REMOVE AFTER, THIS IS CODE FOR FPS COUNTER TO CHECK OPTIMISATIONS
var stats;
function createStats() {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';

  return stats;
}
stats = createStats();
document.body.appendChild( stats.domElement );

function animate() {
	moveCamera();
	stats.update();
	getSelected(raycaster, mouse);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
