var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x99ccff );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,2);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var controls = new THREE.PointerLockControls(camera, document.body);

var canvas = document.getElementsByTagName("canvas")[0]
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = function() {
  	controls.connect();
	controls.lock();
}

scene.add(controls.getObject());


class Block {
	constructor(x,y,z,texture_name) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture_name = texture_name;
		this.height = 1;
		this.width = 1;
		this.depth = 1;

		var texture = new THREE.TextureLoader().load(`minecraft/textures/block/${this.texture_name}`);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		var material = new THREE.MeshBasicMaterial( {map: texture,transparent: true} );

		var block = new THREE.Group();
		block.scale.set(1,1,1);
		block.position.x = this.x;
		block.position.y = this.y;
		block.position.z = this.z;
		scene.add(block);

		setPlane("y",  Math.PI * 0.5); //side
		setPlane("y", -Math.PI * 0.5); //side
		setPlane("x",  Math.PI * 0.5); //bottom
		setPlane("x", -Math.PI * 0.5); //top
		setPlane("y",  0, 0x0000ff); //side
		setPlane("y",  Math.PI);// side

		function setPlane(axis, angle) {
			
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

let blocks = [];

for (let x = -8; x < 8; x++) {
	for (let z = -8; z < 8; z++) {
		blocks.push(new Block(x, 0, z, 'grass_block_top-NORMAL-BY-JOE.png'))
	}
}

function buildTree(x,y,z) {
	blocks.push(new Block(x, y, z, 'oak_log.png'));
	blocks.push(new Block(x, y+1, z, 'oak_log.png'));
	blocks.push(new Block(x, y+2, z, 'oak_log.png'));
	blocks.push(new Block(x, y+3, z, 'oak_log.png'));
	blocks.push(new Block(x+2, y+3, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+3, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+3, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+3, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+3, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+3, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+3, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+3, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+3, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+3, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+3, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+3, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+3, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+3, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+3, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+3, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+3, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+3, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+3, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+3, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+3, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+3, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+3, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+3, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+4, z, 'oak_log.png'));
	blocks.push(new Block(x+2, y+4, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+4, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+4, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+4, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+2, y+4, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+4, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+4, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+4, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+4, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+4, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+4, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+4, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+4, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+4, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+4, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+4, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+4, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+4, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+4, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+4, z-2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+4, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+4, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+4, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-2, y+4, z+2, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+5, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+5, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+5, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+5, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+5, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+5, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+5, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+5, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+5, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x+1, y+6, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+6, z+1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+6, z, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x, y+6, z-1, 'oak_leaves-NORMAL-BY-JOE.png'));
	blocks.push(new Block(x-1, y+6, z, 'oak_leaves-NORMAL-BY-JOE.png'));
}

buildTree(4,1,4);

blocks.push(new Block(0,1,0, 'dark_oak_planks.png'));
blocks.push(new Block(-1,1,1, 'dark_oak_planks.png'));
blocks.push(new Block(-2,1,1, 'dark_oak_planks.png'));
blocks.push(new Block(-2,1,2, 'dark_oak_planks.png'));
blocks.push(new Block(-2,1,3, 'dark_oak_planks.png'));

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

	let direction = new THREE.Vector3;
	camera.getWorldDirection(direction);
	let sideDirection = {'x': direction['z'], 'y': 0, 'z': direction['x']};
	direction = {'x': direction['x'], 'y': 0, 'z': direction['z']};

	camera.translateZ(-cameraSpeedForward);
	camera.translateX(cameraSpeedSide);

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




