function mesh_collision_check(vec, mesh, entity){
	var originPoint = mesh.position.clone();

	let collided = {"collidedWorld":false,"allCollisions":[],"worldCollisions":[]}
	//For every point in the player hitbox geometry

	//top, bottom, vertical_link, cross_axis
	vertex_pos = [[0,1],[1,4],[4,5],[5,0],  [2,3],[3,6],[6,7],[7,2],  [0,2],[1,3],[4,6],[5,7],  [2,5],[7,4],[6,1],[3,0]]

	for (var vertex = 0; vertex < vertex_pos.length; vertex++){

		//Calculate its position in world space
		var localVertex = mesh.geometry.vertices[vertex_pos[vertex][0]].clone();
		var localVertex2 = mesh.geometry.vertices[vertex_pos[vertex][1]].clone();
    	
		let globalVertex = localVertex.applyMatrix4(mesh.matrix);
		let globalVertex2 = localVertex2.applyMatrix4(mesh.matrix);
		//Calculate the new position of the vertex
    	globalVertex.x = globalVertex.x + vec.x
    	globalVertex.z = globalVertex.z + vec.z
    	globalVertex.y = globalVertex.y + vec.y
    	globalVertex2.x = globalVertex2.x + vec.x
    	globalVertex2.z = globalVertex2.z + vec.z
    	globalVertex2.y = globalVertex2.y + vec.y

    	//Calculate the direction vector to the vertex from the hitbox's new position
    	//NTS: Did not calculate the new position here
    	let directionVector =  globalVertex.sub(globalVertex2);
    	//Cast a ray from the hitbox's position to the geometry vertex
    	let ray = new THREE.Raycaster( globalVertex2, directionVector.clone().normalize() );

		//Find all the items it intersects

		let visible_blocks = entity.boxes.filter(block => block[0].collidable==true).map(block => block[0])

		let worldCollisionResults = ray.intersectObjects( visible_blocks );
		//Test if we have collided with something
		if ( worldCollisionResults.length > 0 && worldCollisionResults[0].distance < globalVertex.length() ) 
	    {
	    	collided.collidedWorld = true;
	    	collided.worldCollisions = collided.worldCollisions.concat(worldCollisionResults.filter((item) => collided.worldCollisions.indexOf(item) < 0))
	    }
	}
	return collided
}


function entity_collision_check(){
	let cols = {};
	for(let i=0; i<registry.entityBuffer.length;i++){
		let entity = registry.entityBuffer[i]
		cols[entity.entityId] = []
		for(let y=0; y<registry.entityBuffer.length;y++){
			let entity2 = registry.entityBuffer[y]
			if(y!=i){
				let intersects = cubeIntersects({x:entity.x,y:entity.y,z:entity.z},
								{x:entity2.x,y:entity2.y,z:entity2.z},
								{x:entity.hitboxWidth,y:entity.hitboxHeight,z:entity.hitboxWidth},
								{x:entity2.hitboxWidth,y:entity2.hitboxHeight,z:entity2.hitboxWidth});

				//console.log(intersects)

				if(intersects.collided){
					cols[entity.entityId].push(registry.entityBuffer[y])
				}
			}
		}
	}
	collidingEntities = cols;
}

function sweptAABB(cube, cubeVelocity, collider, entity){

	// b1 = cube
	// b2 = box

	let normalx;
	let normaly;
	let normalz;

	box = collider
	let xInvEntry, yInvEntry, zInvEntry;
	let xInvExit, yInvExit, zInvExit;

	if (cubeVelocity.x > 0) {
		xInvEntry = (box.position.x - 0.5) - (cube.position.x + (entity.hitboxWidth / 2));
		xInvExit = (box.position.x + 0.5) - (cube.position.x - (entity.hitboxWidth / 2));
	}else{
		xInvEntry = (box.position.x + 0.5) - (cube.position.x - (entity.hitboxWidth / 2));
		xInvExit =  (box.position.x - 0.5) - (cube.position.x + (entity.hitboxWidth / 2));
	}

	if (cubeVelocity.y > 0) {
		yInvEntry = (box.position.y - 0.5) - (cube.position.y + (entity.hitboxHeight / 2));
		yInvExit = (box.position.y + 0.5) - (cube.position.y - (entity.hitboxHeight / 2));
		if (cube.position.y == -1.4) {
			yInvEntry = 0;
			yInvExit = 2.8;
		}
	}else{
		yInvEntry = (box.position.y + 0.5) - (cube.position.y - (entity.hitboxHeight / 2));
		yInvExit =  (box.position.y - 0.5) - (cube.position.y + (entity.hitboxHeight / 2));
		if (cube.position.y == 1.4) {
			yInvEntry = 0;
			yInvExit = -2.8;
		}
	}

	if (cubeVelocity.z > 0) {
		zInvEntry = (box.position.z - 0.5) - (cube.position.z + (entity.hitboxWidth / 2));
		zInvExit = (box.position.z + 0.5) - (cube.position.z - (entity.hitboxWidth / 2));
	}else{
		zInvEntry = (box.position.z + 0.5) - (cube.position.z - (entity.hitboxWidth / 2));
		zInvExit =  (box.position.z - 0.5) - (cube.position.z + (entity.hitboxWidth / 2));
	}

	let xEntry, yEntry, zEntry; 
	let xExit, yExit, zExit; 

	if (cubeVelocity.x == 0) { 
		xEntry = -Infinity; 
		xExit = Infinity; 
	} else {
		xEntry = xInvEntry / cubeVelocity.x; 
		xExit = xInvExit / cubeVelocity.x;
	}

	if (cubeVelocity.y == 0) { 
		yEntry = -Infinity; 
		yExit = Infinity; 
	} else {
		yEntry = yInvEntry / cubeVelocity.y; 
		yExit = yInvExit / cubeVelocity.y;
	}

	if (cubeVelocity.z == 0) { 
		zEntry = -Infinity; 
		zExit = Infinity; 
	} else {
		zEntry = zInvEntry / cubeVelocity.z; 
		zExit = zInvExit / cubeVelocity.z;
	}


	if (yEntry > 1) entryY = -Infinity;
	if (xEntry > 1) entryX = -Infinity;
	if (zEntry > 1) entryX = -Infinity;
	let entryTime = Math.max(xEntry, yEntry, zEntry);
	let exitTime = Math.min(xExit, yExit, zExit);

	// console.log(entryTime, exitTime);

	if (entryTime > exitTime) return {'entryTime':1, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}}; // This check was correct.
	if (xEntry < 0 && yEntry < 0 && zEntry < 0) return {'entryTime':1, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}};

	let cubeMaxX = (cube.position.x + ((entity.hitboxWidth / 2) - 0.0001))
	let cubeMinX = (cube.position.x - ((entity.hitboxWidth / 2) - 0.0001))
	let cubeMaxY = (cube.position.y + ((entity.hitboxHeight / 2) - 0.0001))
	let cubeMinY = (cube.position.y - ((entity.hitboxHeight / 2) - 0.0001))
	let cubeMaxZ = (cube.position.z + ((entity.hitboxWidth / 2) - 0.0001))
	let cubeMinZ = (cube.position.z - ((entity.hitboxWidth / 2) - 0.0001))

	let boxMaxX = (box.position.x + 0.5)
	let boxMinX = (box.position.x - 0.5)
	let boxMaxY = (box.position.y + 0.5)
	let boxMinY = (box.position.y - 0.5)
	let boxMaxZ = (box.position.z + 0.5)
	let boxMinZ = (box.position.z - 0.5)

	if (xEntry < 0) {
	    // Check that the bounding box started overlapped or not.
	    if (boxMaxX < cubeMinX || boxMinX > cubeMaxX) return {'entryTime':1, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}};
	}
	if (yEntry < 0) {
	    // Check that the bounding box started overlapped or not.
	    if (boxMaxY < cubeMinY || boxMinY > cubeMaxY) return {'entryTime':1, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}};
	}
	if (zEntry < 0) {
	    // Check that the bounding box started overlapped or not.
	    if (boxMaxZ < cubeMinZ || boxMinZ > cubeMaxZ) return {'entryTime':1, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}};
	}


	if (xEntry > yEntry) {
        if(xEntry > zEntry){
            normalx = cubeVelocity.x >= 0 ? -1 : 1;
            normaly = 0;
            normalz = 0;
        }else{
            normalz = cubeVelocity.z >= 0 ? -1 : 1;
            normalx = 0;
            normaly = 0;
        }
    } else {
        if (yEntry > zEntry) {
            normaly = cubeVelocity.y >= 0 ? -1 : 1;
            normalx = 0;
            normalz = 0;

        } else {
            normalz = cubeVelocity.z >= 0 ? -1 : 1;
            normalx = 0;
            normaly = 0;
        }
    }

	return {'entryTime':entryTime, 'normal': {'x': normalx, 'y':normaly, 'z':normalz}}; 

}