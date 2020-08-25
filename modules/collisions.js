function mesh_collision_check(vec, mesh){
	var originPoint = mesh.position.clone();

	let collided = {"collidedWorld":false}
	//For every point in the player hitbox geometry
	for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++){
		//Calculate its position in world space
		if(vertexIndex == mesh.geometry.vertices.length - 1){
			var localVertex = mesh.geometry.vertices[vertexIndex].clone();
    		var localVertex2 = mesh.geometry.vertices[0].clone();
		}else{
			var localVertex = mesh.geometry.vertices[vertexIndex].clone();
    		var localVertex2 = mesh.geometry.vertices[vertexIndex + 1].clone();
		}
    	
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
		let allCollisionResults = ray.intersectObjects( scene.children,  true );
		let worldCollisionResults = ray.intersectObjects( world.get_chunk_instances_array() );
		//Test if we have collided with something
		if ( worldCollisionResults.length > 0 && worldCollisionResults[0].distance < globalVertex.length() ) 
	    {
	    	collided.collidedWorld = true;
	    	collided.worldCollisions = worldCollisionResults
	    }
	    if ( allCollisionResults.length > 0 && allCollisionResults[0].distance < globalVertex.length() ) 
	    {
	    	collided.allCollisions = allCollisionResults
	    }
	}
	return collided
}