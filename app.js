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
var setYHeight = 23;
var blockToPlace = 6;
var renderHitboxes = false;
var locked = false;

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var pressed = [];

let ui = new UI(document, document.getElementById("body"));

let pause_menu = new PauseMenu(ui);
let inventory = new Inventory(ui);
let hotbar = new Hotbar(ui,0, 20, 14, 20, 17);


var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x99ccff, 50, 70);
scene.background = new THREE.Color( 0x99ccff );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var player = new Player()

var geom = new THREE.BoxBufferGeometry( 1.001, 1.001, 1.001);
var edges = new THREE.EdgesGeometry( geom );
var selectionCube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
selectionCube.visible = false;
selectionCube.name = "selectionCube";
scene.add( selectionCube );

var registry = new Registry();

registry.registerEntity(player)

var world = new World()
for(let x=-4; x<=4; x++){
	for(let z=-4; z<=4; z++){
		world.generate_chunk(x,z);
	}
}

control_type = 'pointer';

if (control_type === 'touch') {
	// for touch controls
	let hammer = new Hammer(renderer.domElement);

	hammer.on("panleft panright panup pandown", function(e) {
		if (e.type === 'panleft') {
			player.camera.rotation.y += Math.PI / 180
		} else if (e.type === 'panright') {
			player.camera.rotation.y -= Math.PI / 180
		}
	})

} else if (control_type === 'pointer') {
	// for pointer controls
	canvas=document.getElementsByTagName("canvas")[0];
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

	player.controls.connect();

	renderer.domElement.onclick = function() {
		ui.captureCursor();
	};
}


ui.releaseCursor = (() => {
	player.controls.unlock();
	locked = false;
});


ui.captureCursor = (() => {
	player.controls.lock();
	locked = true;
});

ui.updateSize = (() => {
	renderer.setSize( window.innerWidth, window.innerHeight );
	player.camera.width = window.innerWidth;
	player.camera.height = window.innerHeight;
	player.camera.aspect = window.innerWidth / window.innerHeight;
	player.camera.updateProjectionMatrix();
	navigator.keyboard.lock();
});


scene.add(player.controls.getObject());

var onKeyDown = function ( event ) {
	//console.log(event.keyCode)
	if(pressed.indexOf(event.keyCode) == -1){
		pressed.push(event.keyCode)
	}
	switch ( event.keyCode ) {
		case 80: // esc but p for now
			pause_menu.toggle();
			break;
		case 70: // f
			ui.toggleFullscreen();
			break;
		case 69: //e
			inventory.toggle();
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
		case 191:// slash
			player.tp("~",100,"~")
			break;
		case 38: // up
			setYHeight ++;
			break;
		case 40: // down
			setYHeight --;
			break;
		case 116: //f5
			if(player.perspective == 1){
				player.perspective = 3;
			}else if(player.perspective == 3){
				player.perspective = 2;
			}else{
				player.perspective = 1;
			}
			break;
		case 66:
			renderHitboxes = !renderHitboxes;
			if(pressed.indexOf(114)!=-1){
				registry.entityBuffer.forEach(function(entity){
				    entity.hitbox.visible = renderHitboxes;
					entity.eyeLevelHitbox.visible = renderHitboxes;
				})
			}
			break;
	}
};

document.onclick = function(e){
	if(e.which == 1){// LEFT CLICK
		if(lookingAt != null){
			world.get_looking_at_block().break();
		}
	}else if(e.which == 2){
		console.log("MIDDLE")
		console.log(world.get_looking_at_block())
	}else if(e.which == 3){
		if(lookingAt != null){
			switch(lookingAt.face){
				case "T":
					world.set_block(lookingAt.blockCoords.x,lookingAt.blockCoords.y+1,lookingAt.blockCoords.z,blockToPlace)
					break;
				case "B":
					world.set_block(lookingAt.blockCoords.x,lookingAt.blockCoords.y-1,lookingAt.blockCoords.z,blockToPlace)
					break;
				case "N":
					world.set_block(lookingAt.blockCoords.x+1,lookingAt.blockCoords.y,lookingAt.blockCoords.z,blockToPlace)
					break;
				case "S":
					world.set_block(lookingAt.blockCoords.x-1,lookingAt.blockCoords.y,lookingAt.blockCoords.z,blockToPlace)
					break;
				case "E":
					world.set_block(lookingAt.blockCoords.x,lookingAt.blockCoords.y,lookingAt.blockCoords.z+1,blockToPlace)
					break;
				case "W":
					world.set_block(lookingAt.blockCoords.x,lookingAt.blockCoords.y,lookingAt.blockCoords.z-1,blockToPlace)
					break;
			}
		}
	}
}

var onKeyUp = function ( event ) {
	if(pressed.indexOf(event.keyCode) != -1){
		pressed.pop(pressed.indexOf(event.keyCode))
	}
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
	try{
		mouse.x = ( (renderer.domElement.width/2) / window.innerWidth ) * 2 - 1;
		mouse.y = - ( (renderer.domElement.height/2) / window.innerHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, player.camera );

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
					lookingAt.face = "T"
					pos.y -= 0.5
					pos.x = Math.floor(pos.x + 0.5)
					pos.z = Math.floor(pos.z + 0.5)
				}else if(normal.x==0 & normal.y==-1 & normal.z==0){
					//console.log("Bottom")
					lookingAt.face = "B"
					pos.y += 0.5
					pos.x = Math.floor(pos.x + 0.5)
					pos.z = Math.floor(pos.z + 0.5)
				}else if(normal.x==1 & normal.y==0 & normal.z==0){
					//console.log("North")
					lookingAt.face = "N"
					pos.y = Math.floor(pos.y + 0.5)
					pos.x -= 0.5
					pos.z = Math.floor(pos.z + 0.5)
				}else if(normal.x==-1 & normal.y==0 & normal.z==0){
					//console.log("South")
					lookingAt.face = "S"
					pos.y = Math.floor(pos.y + 0.5)
					pos.x += 0.5
					pos.z = Math.floor(pos.z + 0.5)
				}else if(normal.x==0 & normal.y==0 & normal.z==1){
					//console.log("East")
					lookingAt.face = "E"
					pos.y = Math.floor(pos.y + 0.5)
					pos.x = Math.floor(pos.x + 0.5)
					pos.z -= 0.5
				}else if(normal.x==0 & normal.y==0 & normal.z==-1){
					//console.log("West")
					lookingAt.face = "W"
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
			}else{
				lookingAt = null;
				selectionCube.visible = false;
			}
		}else{
			lookingAt = null;
			selectionCube.visible = false;
		}
	}catch{
		lookingAt = null;
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
	if ( controls.getObject().position.y  < setYHeight ) {
		velocity.y = 0;
		controls.getObject().position.y = setYHeight;
		canJump = true;
	}
	prevTime = time;

	hitbox.position.x = controls.getObject().position.x
	hitbox.position.y = controls.getObject().position.y - 0.9 + 0.2
	hitbox.position.z = controls.getObject().position.z

	eyeLevel.position.x = controls.getObject().position.x
	eyeLevel.position.y = controls.getObject().position.y
	eyeLevel.position.z = controls.getObject().position.z
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
	player.moveCamera();
	stats.update();
	getSelected(raycaster, mouse);
	requestAnimationFrame( animate );
	renderer.render( scene, player.getCamera() );
}
animate();
