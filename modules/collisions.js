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

		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		let player_chunk = [playerPos.chunk_x,playerPos.chunk_z]

		let worldCollisionResults = ray.intersectObjects( world.get_chunk_instances_array() );
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