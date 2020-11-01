function arrayInArray(arrayA, arrayB){
    prizes = [[1, 3], [1, 4]],
    includes = arrayB.some(a => arrayA.every((v, i) => v === a[i]));

	return includes;
}


function checkCollision(A,B){//A is a hitbox mesh, B is a list of collidable objects
	const position = A.geometry.attributes.position;
	const vector = new THREE.Vector3();

	let collided = [];

	for(let i=0;i<72;i+=3){
		console.log(i)
	}


	for ( let i = 0, l = position.count; i < l; i ++ ){

		vector.fromBufferAttribute( position, i );
		vector.applyMatrix4( A.matrixWorld );
		let localVertex = vector.clone();
		let globalVertex = localVertex.applyMatrix4(A.matrix);

		let directionVector = globalVertex.sub( A.position );
		let ray = new THREE.Raycaster( A.position, directionVector.clone().normalize() );
		let collisionResults = ray.intersectObjects( B );

		collisionResults = collisionResults.filter((item) => (item.object.uuid!=A.uuid))
		collisionResults = collisionResults.filter((item) => (item.object.uuid!=player.eyeLevelHitbox.uuid))
		collisionResults = collisionResults.filter((item) => (item.object.uuid!=selectionCube.uuid))

	    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
	    {
	    	collided = collided.concat(collisionResults)
	    }
	}

	if(collided.length == 0){
		return null
	}else{
		return collided
	}
	
}


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cubeIntersects(c1pos, c2pos, c1size, c2size){//{x,y,z}*4
	let lengthx = Math.abs(c1pos.x - c2pos.x);
	let lengthy = Math.abs(c1pos.y - c2pos.y);
	let lengthz = Math.abs(c1pos.z - c2pos.z);
	let gapx = lengthx - c1size.x/2 - c2size.x/2;
	let gapy = lengthy - c1size.y/2 - c2size.y/2;
	let gapz = lengthz - c1size.z/2 - c2size.z/2;

	//console.log(c1pos.y,c2pos.y,c1size.y/2,c2size.y/2,lengthy,gapy)

	if(gapx<=0 && gapy<=0 && gapz <=0){
		return {collided:true}
	}else{
		return {collided:false}
	}
	
}

function mod(n, m) {
  return ((n % m) + m) % m;
}