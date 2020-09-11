//Vars for movement
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = true;
var direction = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pressed = [];

//Misc Vars
var prevTime = performance.now();
var sprinting = false;
var ctlHeld = false;
var prevSelected = null;
var selected = null;
var lookingAt = null;
var blockToPlace = 6;// will call hotbar.selected
var renderHitboxes = false;
var locked = false;

//Vars for breaking blocks
var m1Pressed = false;
var currentItem = null;

let ui = new UI(document, document.getElementById("body"));

let pause_menu = new PauseMenu(ui);
let hotbar = new Hotbar(ui,0, 20, 14, 20, 17);
let inventory = new Inventory(ui, hotbar);

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x99ccff, 50, 70);
scene.background = new THREE.Color( 0x99ccff );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//SELECTION CUBE AND BREAK ANIMATION
var geom = new THREE.BoxBufferGeometry( 1.001, 1.001, 1.001);
var edges = new THREE.EdgesGeometry( geom );
var selectionCube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
selectionCube.visible = false;
selectionCube.name = "selectionCube";

let breakCubeGeometry = new THREE.CubeGeometry(1.0009, 1.0009, 1.0009);
var breaktextures = [];
for(let i=0;i<=9;i++){
	breaktextures.push(new THREE.ImageUtils.loadTexture("minecraft/textures/block/destroy_stage_"+i.toString()+".png"))
}

for (var i = 0; i < breaktextures.length; i++) {
    breaktextures[i].magFilter = THREE.NearestFilter;
	breaktextures[i].minFilter = THREE.NearestFilter;
}

let breakCubeMat = new THREE.MeshPhongMaterial({"map":breaktextures[0],"opacity":0.5})
breakCubeMat.transparent = true;
var breakCube = new THREE.Mesh(breakCubeGeometry, breakCubeMat);
breakCube.needsUpdate = true;
breakCube.visible = false;
selectionCube.add(breakCube);
scene.add( selectionCube );

var registry = new Registry();

var world = new World()

/*
for(let x=-3; x<=3; x++){
	for(let z=-3; z<=3; z++){
		world.generate_chunk(x,z);
	}
}
 */

world.generate_chunk(0,0);

var player = new Player()

var item = new RawBeefItem()
var item_entity = new ItemEntity(0,50,0,item)

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

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    ui.hand.setPosition(event.clientX - 16, event.clientY - 16);
    inventory.mousemove(event.clientX - 16, event.clientY - 16)
}, true);

document.addEventListener('contextmenu', event => event.preventDefault());

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
			if ( canJump === true ) player.velocity.y += 8;
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
			player.velocity.y = 0;
			player.tp(0,100,0)
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
				    if(entity.eyeLevelHitbox != undefined){
				    	entity.eyeLevelHitbox.visible = renderHitboxes;
				    }
				})
			}
			break;
	}
};

document.onmousedown = function(e){
	if(e.which == 1){// LEFT CLICK
		m1Pressed = true;
	}else if(e.which == 2){
		console.log("MIDDLE")
		blockToPlace = world.get_looking_at_block().ID
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

document.onmouseup = function(e){
	if(e.which == 1){// LEFT CLICK
		m1Pressed = false;
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
		var intersects = raycaster.intersectObjects( world.get_chunk_instances_array() ,true);

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
	getSelected(raycaster, mouse);
	registry.updateEntities();

	stats.update();
	requestAnimationFrame( animate );
	renderer.render( scene, player.getCamera() );
}
animate();
