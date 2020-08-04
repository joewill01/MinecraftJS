let hotbar = new Hotbar(0, 20, 14, 20, 17);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99ccff );
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,2);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geom = new THREE.BoxBufferGeometry( 1.001, 1.001, 1.001);
var edges = new THREE.EdgesGeometry( geom );
var selectionCube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
selectionCube.visible = false;
selectionCube.name = "selectionCube";
scene.add( selectionCube );

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


// world 'generation'
let blocks = [];
for (let x = -8; x < 8; x++) {
	for (let z = -8; z < 8; z++) {
		blocks.push(new GrassBlock(x, 0, z))
	}
}

// random shit cause im bored
function buildTree(x,y,z) {
	blocks.push(new OakLog(x, y, z));
	blocks.push(new OakLog(x, y+1, z));
	blocks.push(new OakLog(x, y+2, z));
	blocks.push(new OakLog(x, y+3, z));
	blocks.push(new OakLeaves(x+2, y+3, z-2));
	blocks.push(new OakLeaves(x+2, y+3, z-1));
	blocks.push(new OakLeaves(x+2, y+3, z));
	blocks.push(new OakLeaves(x+2, y+3, z+1));
	blocks.push(new OakLeaves(x+2, y+3, z+2));
	blocks.push(new OakLeaves(x+1, y+3, z-2));
	blocks.push(new OakLeaves(x+1, y+3, z-1));
	blocks.push(new OakLeaves(x+1, y+3, z));
	blocks.push(new OakLeaves(x+1, y+3, z+1));
	blocks.push(new OakLeaves(x+1, y+3, z+2));
	blocks.push(new OakLeaves(x, y+3, z-2));
	blocks.push(new OakLeaves(x, y+3, z-1));
	blocks.push(new OakLeaves(x, y+3, z+1));
	blocks.push(new OakLeaves(x, y+3, z+2));
	blocks.push(new OakLeaves(x-1, y+3, z-2));
	blocks.push(new OakLeaves(x-1, y+3, z-1));
	blocks.push(new OakLeaves(x-1, y+3, z));
	blocks.push(new OakLeaves(x-1, y+3, z+1));
	blocks.push(new OakLeaves(x-1, y+3, z+2));
	blocks.push(new OakLeaves(x-2, y+3, z-2));
	blocks.push(new OakLeaves(x-2, y+3, z-1));
	blocks.push(new OakLeaves(x-2, y+3, z));
	blocks.push(new OakLeaves(x-2, y+3, z+1));
	blocks.push(new OakLeaves(x-2, y+3, z+2));
	blocks.push(new OakLog(x, y+4, z));
	blocks.push(new OakLeaves(x+2, y+4, z-2));
	blocks.push(new OakLeaves(x+2, y+4, z-1));
	blocks.push(new OakLeaves(x+2, y+4, z));
	blocks.push(new OakLeaves(x+2, y+4, z+1));
	blocks.push(new OakLeaves(x+2, y+4, z+2));
	blocks.push(new OakLeaves(x+1, y+4, z-2));
	blocks.push(new OakLeaves(x+1, y+4, z-1));
	blocks.push(new OakLeaves(x+1, y+4, z));
	blocks.push(new OakLeaves(x+1, y+4, z+1));
	blocks.push(new OakLeaves(x+1, y+4, z+2));
	blocks.push(new OakLeaves(x, y+4, z-2));
	blocks.push(new OakLeaves(x, y+4, z-1));
	blocks.push(new OakLeaves(x, y+4, z+1));
	blocks.push(new OakLeaves(x, y+4, z+2));
	blocks.push(new OakLeaves(x-1, y+4, z-2));
	blocks.push(new OakLeaves(x-1, y+4, z-1));
	blocks.push(new OakLeaves(x-1, y+4, z));
	blocks.push(new OakLeaves(x-1, y+4, z+1));
	blocks.push(new OakLeaves(x-1, y+4, z+2));
	blocks.push(new OakLeaves(x-2, y+4, z-2));
	blocks.push(new OakLeaves(x-2, y+4, z-1));
	blocks.push(new OakLeaves(x-2, y+4, z));
	blocks.push(new OakLeaves(x-2, y+4, z+1));
	blocks.push(new OakLeaves(x-2, y+4, z+2));
	blocks.push(new OakLeaves(x+1, y+5, z-1));
	blocks.push(new OakLeaves(x+1, y+5, z));
	blocks.push(new OakLeaves(x+1, y+5, z+1));
	blocks.push(new OakLeaves(x, y+5, z-1));
	blocks.push(new OakLeaves(x, y+5, z));
	blocks.push(new OakLeaves(x, y+5, z+1));
	blocks.push(new OakLeaves(x-1, y+5, z-1));
	blocks.push(new OakLeaves(x-1, y+5, z));
	blocks.push(new OakLeaves(x-1, y+5, z+1));
	blocks.push(new OakLeaves(x+1, y+6, z));
	blocks.push(new OakLeaves(x, y+6, z+1));
	blocks.push(new OakLeaves(x, y+6, z));
	blocks.push(new OakLeaves(x, y+6, z-1));
	blocks.push(new OakLeaves(x-1, y+6, z));
}

buildTree(4,1,4);
buildTree(-4,1,-4);

blocks.push(new OakLog(-1,1,1));
blocks.push(new OakLog(-2,1,1));
blocks.push(new OakLog(-2,1,2));
blocks.push(new OakLog(-2,1,3));

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
			console.log(lookingAt.parent)
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
			lookingAt = intersects[ 0 ].object
			let pos = lookingAt.parent.position
			selectionCube.position.x = pos.x
			selectionCube.position.y = pos.y
			selectionCube.position.z = pos.z
			selectionCube.visible = true;
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
	if ( controls.getObject().position.y < 2 ) {
		velocity.y = 0;
		controls.getObject().position.y = 2;
		canJump = true;
	}
	prevTime = time;
}

function animate() {
	moveCamera();
	getSelected(raycaster, mouse);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
