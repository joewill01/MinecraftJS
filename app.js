import Hotbar from "./hotbar.js";
let hotbar = new Hotbar(0, 20, 20, 20, 20);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99ccff );
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,2);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.PointerLockControls(camera, document.body);

var canvas = document.getElementsByTagName("canvas")[0];
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = function() {
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


scene.add(controls.getObject());

class Block {
	constructor(x,y,z,texture_names) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture_names = texture_names;
		this.height = 1;
		this.width = 1;
		this.depth = 1;

		var block = new THREE.Group();
		block.position.x = this.x;
		block.position.y = this.y;
		block.position.z = this.z;
		scene.add(block);

		setPlane("y",  Math.PI * 0.5, this.texture_names["side1"]); //side
		setPlane("y", -Math.PI * 0.5, this.texture_names["side2"]); //side
		setPlane("x",  Math.PI * 0.5, this.texture_names["bottom"]); //bottom
		setPlane("x", -Math.PI * 0.5, this.texture_names["top"]); //top
		setPlane("y",  0, this.texture_names["side3"]); //side
		setPlane("y",  Math.PI, this.texture_names["side4"]);// side

		function setPlane(axis, angle, texture_name) {
			var texture = new THREE.TextureLoader().load(`minecraft/textures/block/${texture_name}`);
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			var material = new THREE.MeshBasicMaterial( {map: texture,transparent: true} );

			let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
			planeGeom.translate(0, 0, 0.5);
			switch (axis) {
		    	case 'y':
		      		planeGeom.rotateY(angle);
		      		break;
		    	default:
		      		planeGeom.rotateX(angle);
		  	}
		  let plane = new THREE.Mesh(planeGeom, material);
		  block.add(plane);
		}
	}
}

/*
let BLOCKNAME_textures = {
	'side1': '.png',
	'side2': '.png',
	'side3': '.png',
	'side4': '.png',
	'top': '.png',
	'bottom': '.png'
};
 */

let grass_block_textures = {
	'side1': 'grass_block_side.png',
	'side2': 'grass_block_side.png',
	'side3': 'grass_block_side.png',
	'side4': 'grass_block_side.png',
	'top': 'grass_block_top-NORMAL-BY-JOE.png',
	'bottom': 'dirt.png'
};

let oak_log_textures = {
	'side1': 'oak_log.png',
	'side2': 'oak_log.png',
	'side3': 'oak_log.png',
	'side4': 'oak_log.png',
	'top': 'oak_log_top.png',
	'bottom': 'oak_log_top.png'
};

let oak_leaves_textures = {
	'side1': 'oak_leaves-NORMAL-BY-JOE.png',
	'side2': 'oak_leaves-NORMAL-BY-JOE.png',
	'side3': 'oak_leaves-NORMAL-BY-JOE.png',
	'side4': 'oak_leaves-NORMAL-BY-JOE.png',
	'top': 'oak_leaves-NORMAL-BY-JOE.png',
	'bottom': 'oak_leaves-NORMAL-BY-JOE.png'
};


// world 'generation'
let blocks = [];
for (let x = -8; x < 8; x++) {
	for (let z = -8; z < 8; z++) {
		blocks.push(new Block(x, 0, z, grass_block_textures))
	}
}

// random shit cause im bored

function buildTree(x,y,z) {
	blocks.push(new Block(x, y, z, oak_log_textures));
	blocks.push(new Block(x, y+1, z, oak_log_textures));
	blocks.push(new Block(x, y+2, z, oak_log_textures));
	blocks.push(new Block(x, y+3, z, oak_log_textures));
	blocks.push(new Block(x+2, y+3, z-2, oak_leaves_textures));
	blocks.push(new Block(x+2, y+3, z-1, oak_leaves_textures));
	blocks.push(new Block(x+2, y+3, z, oak_leaves_textures));
	blocks.push(new Block(x+2, y+3, z+1, oak_leaves_textures));
	blocks.push(new Block(x+2, y+3, z+2, oak_leaves_textures));
	blocks.push(new Block(x+1, y+3, z-2, oak_leaves_textures));
	blocks.push(new Block(x+1, y+3, z-1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+3, z, oak_leaves_textures));
	blocks.push(new Block(x+1, y+3, z+1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+3, z+2, oak_leaves_textures));
	blocks.push(new Block(x, y+3, z-2, oak_leaves_textures));
	blocks.push(new Block(x, y+3, z-1, oak_leaves_textures));
	blocks.push(new Block(x, y+3, z+1, oak_leaves_textures));
	blocks.push(new Block(x, y+3, z+2, oak_leaves_textures));
	blocks.push(new Block(x-1, y+3, z-2, oak_leaves_textures));
	blocks.push(new Block(x-1, y+3, z-1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+3, z, oak_leaves_textures));
	blocks.push(new Block(x-1, y+3, z+1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+3, z+2, oak_leaves_textures));
	blocks.push(new Block(x-2, y+3, z-2, oak_leaves_textures));
	blocks.push(new Block(x-2, y+3, z-1, oak_leaves_textures));
	blocks.push(new Block(x-2, y+3, z, oak_leaves_textures));
	blocks.push(new Block(x-2, y+3, z+1, oak_leaves_textures));
	blocks.push(new Block(x-2, y+3, z+2, oak_leaves_textures));
	blocks.push(new Block(x, y+4, z, oak_log_textures));
	blocks.push(new Block(x+2, y+4, z-2, oak_leaves_textures));
	blocks.push(new Block(x+2, y+4, z-1, oak_leaves_textures));
	blocks.push(new Block(x+2, y+4, z, oak_leaves_textures));
	blocks.push(new Block(x+2, y+4, z+1, oak_leaves_textures));
	blocks.push(new Block(x+2, y+4, z+2, oak_leaves_textures));
	blocks.push(new Block(x+1, y+4, z-2, oak_leaves_textures));
	blocks.push(new Block(x+1, y+4, z-1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+4, z, oak_leaves_textures));
	blocks.push(new Block(x+1, y+4, z+1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+4, z+2, oak_leaves_textures));
	blocks.push(new Block(x, y+4, z-2, oak_leaves_textures));
	blocks.push(new Block(x, y+4, z-1, oak_leaves_textures));
	blocks.push(new Block(x, y+4, z+1, oak_leaves_textures));
	blocks.push(new Block(x, y+4, z+2, oak_leaves_textures));
	blocks.push(new Block(x-1, y+4, z-2, oak_leaves_textures));
	blocks.push(new Block(x-1, y+4, z-1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+4, z, oak_leaves_textures));
	blocks.push(new Block(x-1, y+4, z+1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+4, z+2, oak_leaves_textures));
	blocks.push(new Block(x-2, y+4, z-2, oak_leaves_textures));
	blocks.push(new Block(x-2, y+4, z-1, oak_leaves_textures));
	blocks.push(new Block(x-2, y+4, z, oak_leaves_textures));
	blocks.push(new Block(x-2, y+4, z+1, oak_leaves_textures));
	blocks.push(new Block(x-2, y+4, z+2, oak_leaves_textures));
	blocks.push(new Block(x+1, y+5, z-1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+5, z, oak_leaves_textures));
	blocks.push(new Block(x+1, y+5, z+1, oak_leaves_textures));
	blocks.push(new Block(x, y+5, z-1, oak_leaves_textures));
	blocks.push(new Block(x, y+5, z, oak_leaves_textures));
	blocks.push(new Block(x, y+5, z+1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+5, z-1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+5, z, oak_leaves_textures));
	blocks.push(new Block(x-1, y+5, z+1, oak_leaves_textures));
	blocks.push(new Block(x+1, y+6, z, oak_leaves_textures));
	blocks.push(new Block(x, y+6, z+1, oak_leaves_textures));
	blocks.push(new Block(x, y+6, z, oak_leaves_textures));
	blocks.push(new Block(x, y+6, z-1, oak_leaves_textures));
	blocks.push(new Block(x-1, y+6, z, oak_leaves_textures));
}

buildTree(4,1,4);
buildTree(-4,1,-4);

blocks.push(new Block(0,1,0, oak_log_textures));
blocks.push(new Block(-1,1,1, oak_log_textures));
blocks.push(new Block(-2,1,1, oak_log_textures));
blocks.push(new Block(-2,1,2, oak_log_textures));
blocks.push(new Block(-2,1,3, oak_log_textures));

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
			break
		case 50: // 2
			hotbar.selectItem(1);
			break
		case 51: // 3
			hotbar.selectItem(2);
			break
		case 52: // 4
			hotbar.selectItem(3);
			break
		case 53: // 5
			hotbar.selectItem(4);
			break
		case 54: // 6
			hotbar.selectItem(5);
			break
		case 55: // 7
			hotbar.selectItem(6);
			break
		case 56: // 8
			hotbar.selectItem(7);
			break
		case 57: // 9
			hotbar.selectItem(8);
			break
	}

};

document.onclick = function(e){
	if(e.which == 1){// LEFT CLICK
		console.log("LEFT")
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
	mouse.x = ( (canvas.width/2) / window.innerWidth ) * 2 - 1;
	mouse.y = - ( (canvas.height/2) / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children ,true);

	if (intersects.length >= 1){
		if (intersects[0].distance <= 6){
			intersects[ 0 ].object.material.color.set( 0xff0000 );
		}
	}
}

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

window.addEventListener("wheel", (e) => {
	if (e.deltaY < 0) {
		hotbar.itemUp();
	} else {
		hotbar.itemDown();
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
