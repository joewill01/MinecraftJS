var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99ccff );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
		block.scale.set(1,1,1);
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

// keypress detection and setting speeds

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
	if (event.keyCode === 87) {
		// w
		cameraSpeedForward = 0.1;
	} if (event.keyCode === 65) {
		// a
		cameraSpeedSide = -0.075;
	} if (event.keyCode === 83) {
		// s
		cameraSpeedForward = -0.1;
	} if (event.keyCode === 68) {
		// d
		cameraSpeedSide = 0.075;
	} if (event.keyCode === 32 && camera.position.y === 2) {
		// space
		cameraSpeedUp = 0.14;
	} if (event.keyCode === 83) {
		// l shift
	}
}

function keyUpHandler(event) {
	if (event.keyCode === 87) {
		// w
		cameraSpeedForward = 0;
	} if (event.keyCode === 65) {
		// a
		cameraSpeedSide = 0;
	} if (event.keyCode === 83) {
		// s
		cameraSpeedForward = 0;
	} if (event.keyCode === 68) {
		// d
		cameraSpeedSide = 0;
	} if (event.keyCode === 32) {
		// space
	} if (event.keyCode === 83) {
		// l shift
	}
}

// camera movement

let cameraAccelerationForward = 0;
let cameraAccelerationSide = 0;
let cameraAccelerationUp = -0.006;

let cameraSpeedForward = 0;
let cameraSpeedSide = 0;
let cameraSpeedUp = 0;


function moveCamera() {
	cameraSpeedForward += cameraAccelerationForward;
	cameraSpeedSide += cameraAccelerationSide;
	cameraSpeedUp += cameraAccelerationUp;

	camera.translateZ(-cameraSpeedForward);
	camera.translateX(cameraSpeedSide);

	// check if we are on the floor level (y = 2 all the time atm)
	if (camera.position.y + cameraSpeedUp <= 2) {
		camera.position.y = 2;
	} else {
		camera.position.y += cameraSpeedUp;
	}
}

function animate() {
	moveCamera();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
