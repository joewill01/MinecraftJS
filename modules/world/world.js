class World{
	constructor(){
		this.world = {};
		this.chunk_instances = {};
		noise.seed(Math.random())
		this.block_particles = {};
	}

	getBlockParticles(x,y,z){
		return this.block_particles[x.toString()+ y.toString()+ z.toString()]
	}

	addBlockParticles(x,y,z,particle){
		this.block_particles[x.toString()+ y.toString()+ z.toString()] = particle
	}

	removeBlockParticles(x,y,z){
		this.block_particles[x.toString()+ y.toString()+ z.toString()].remove()
		delete this.block_particles[x.toString()+ y.toString()+ z.toString()]
	}

	get_chunk_name(x,z){
		return x.toString() + "_" + z.toString()
	}

	generate_chunk(chunkx,chunkz){
		let chunk_instance = new Chunk(chunkx,chunkz);
		this.chunk_instances[chunk_instance.name] = chunk_instance;
		chunk_instance.generate()
	}

	world_to_chunk_coords(x, y, z) {
		let chunk_x = x >> 4; // Faster division by 16
		let chunk_z = z >> 4; 
	
		let pos_x = (x & 15); // Faster modulo 16
		let pos_z = (z & 15);
	
		let index = (y << 8) | (pos_x << 4) | pos_z; // Optimized index math
	
		return { chunk_x, chunk_z, pos_x, pos_z, index };
	}

	get_block_faces(x,y,z){
		let faces = {};
		faces.U = this.get_block(x,y+1,z);
		faces.D = this.get_block(x,y-1,z);
		faces.N = this.get_block(x-1,y,z);
		faces.S = this.get_block(x+1,y,z);
		faces.E = this.get_block(x,y,z+1);
		faces.W = this.get_block(x,y,z-1);
		// console.log(faces)
		return faces
	}

	get_blocks_around_faces(x, y, z) {
		let blocks = [];
		let offsets = [
			[-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
			[ 0, 1, -1], [ 0, 1, 1], [ 1, 1, -1],
			[ 1, 1, 0],  [ 1, 1, 1], [-1, 0, -1],
			[-1, 0, 1],  [ 1, 0, -1], [ 1, 0, 1],
			[-1, -1, -1], [-1, -1, 0], [-1, -1, 1],
			[ 0, -1, -1], [ 0, -1, 1], [ 1, -1, -1],
			[ 1, -1, 0],  [ 1, -1, 1]
		];
	
		let chunkCoords = this.world_to_chunk_coords(x, y, z);
		let chunkName = this.get_chunk_name(chunkCoords.chunk_x, chunkCoords.chunk_z);
		let chunk = this.chunk_instances[chunkName];
	
		if (!chunk) return Array(20).fill(-1); // Avoid unnecessary calls
	
		for (let [dx, dy, dz] of offsets) {
			let nx = x + dx, ny = y + dy, nz = z + dz;
			let nCoords = this.world_to_chunk_coords(nx, ny, nz);
			let nChunkName = this.get_chunk_name(nCoords.chunk_x, nCoords.chunk_z);
			let nChunk = this.chunk_instances[nChunkName];
	
			if (!nChunk) {
				blocks.push(-1); // Chunk not loaded
			} else {
				blocks.push(nChunk.chunk[nCoords.index] ?? -1);
			}
		}
		return blocks;
	}
	

	get_block_coords_around_faces(x,y,z){
		let blocks = [];
		// Starting from TL move ltr to BR
		blocks.push([x-1, y+1, z-1])
		blocks.push([x-1, y+1, z])
		blocks.push([x-1, y+1, z+1])
		blocks.push([x, y+1, z-1])
		blocks.push([x, y+1, z+1])
		blocks.push([x+1, y+1, z-1])
		blocks.push([x+1, y+1, z])
		blocks.push([x+1, y+1, z+1])

		blocks.push([x-1, y, z-1])
		blocks.push([x-1, y, z+1])
		blocks.push([x+1, y, z-1])
		blocks.push([x+1, y, z+1])

		blocks.push([x-1, y-1, z-1])
		blocks.push([x-1, y-1, z])
		blocks.push([x-1, y-1, z+1])
		blocks.push([x, y-1, z-1])
		blocks.push([x, y-1, z+1])
		blocks.push([x+1, y-1, z-1])
		blocks.push([x+1, y-1, z])
		blocks.push([x+1, y-1, z+1])

		return blocks
	}

	get_block_ID(x, y, z) {
		if (y < 0 || y > 255) return 0;
	
		let coords = this.world_to_chunk_coords(x, y, z);
		let chunk = this.world[this.get_chunk_name(coords.chunk_x, coords.chunk_z)];
	
		if (!chunk) return -1; // Avoids try-catch overhead
		return chunk[coords.index] ?? -1; // Returns 0 only if explicitly set
	}

	get_block(x, y, z) {
		if (y < 0 || y > 255) return 0;
	
		let coords = this.world_to_chunk_coords(x, y, z);
		let chunk = this.chunk_instances[this.get_chunk_name(coords.chunk_x, coords.chunk_z)];
	
		return chunk ? chunk.chunk[coords.index] ?? -1 : -1;
	}

	set_id(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z);
		world.world[world.get_chunk_name(coords.chunk_x,coords.chunk_z)][coords.index] = id;
	}

	unload_chunk(x, z){
		if(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh") != undefined){
			delete this.chunk_instances[this.get_chunk_name(x,z)]
			delete this.world[this.get_chunk_name(x,z)]
			scene.remove(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh"));
		}else{}
	}

	reload_chunk(x, z){
		if(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh") != undefined){
			this.chunk_instances[this.get_chunk_name(x,z)].render();
			scene.remove(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh"));
		}else{
			//console.warn("Tryed to update chunk " + this.get_chunk_name(x,z) + ", Failed as chunk does not exist")
		}
	}

	set_block(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z);
		this.set_id(x, y, z, id);
		this.reload_chunk(coords.chunk_x, coords.chunk_z);

		if (coords.pos_x === 0) {
			this.reload_chunk(coords.chunk_x-1, coords.chunk_z);
		}
		if (coords.pos_x === 15) {
			this.reload_chunk(coords.chunk_x+1, coords.chunk_z);
		}
		if (coords.pos_z === 0) {
			this.reload_chunk(coords.chunk_x, coords.chunk_z-1);
		}
		if (coords.pos_z === 15) {
			this.reload_chunk(coords.chunk_x, coords.chunk_z+1);
		}
	}

	batch_set_block(data){
		let to_update = [];
		for (let i=0; i<data.length;i++) {
			let coords = this.world_to_chunk_coords(data[i].x,data[i].y,data[i].z);

			this.set_id(data[i].x, data[i].y, data[i].z, data[i].id);
			let chunk_coords = [coords.chunk_x, coords.chunk_z];
			if(!arrayInArray(chunk_coords, to_update)){
				to_update.push(chunk_coords)
			}

			if (coords.pos_x === 0) {
				chunk_coords = [coords.chunk_x-1, coords.chunk_z];
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if (coords.pos_x === 15) {
				chunk_coords = [coords.chunk_x+1, coords.chunk_z];
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if (coords.pos_z === 0) {
				chunk_coords = [coords.chunk_x, coords.chunk_z-1];
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if (coords.pos_z === 15) {
				chunk_coords = [coords.chunk_x, coords.chunk_z+1];
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			} 
		}
		
		to_update.forEach(function(chunk) {
			this.reload_chunk(chunk[0], chunk[1])
		}, this);
	}

	get_looking_at_block(){
		if(lookingAt != null){
			let coords = this.world_to_chunk_coords(lookingAt.blockCoords.x,lookingAt.blockCoords.y,lookingAt.blockCoords.z);
			return this.chunk_instances[this.get_chunk_name(coords.chunk_x, coords.chunk_z)].chunk[coords.index];
		}
	}

	get_chunk_instances_array(){
		let meshs = [];
		for (const [key, value] of Object.entries(this.chunk_instances)) {
		  meshs.push(value.chunk_mesh);
		}
		return meshs
	}

	get_chunk_instances_array_old(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		let chunk_name = this.get_chunk_name(playerPos.chunk_x,playerPos.chunk_z)
		return [this.chunk_instances[chunk_name].chunk_mesh]
	}
}

try{
	module.exports = World;
}catch(e){
	
}


