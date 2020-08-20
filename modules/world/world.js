class World{
	constructor(){
		this.world = {};
		this.chunk_instances = {};
	}

	get_chunk_name(x,z){
		return x.toString() + "_" + z.toString()
	}

	generate_chunk(chunkx,chunkz){
		let chunk_instance = new Chunk(chunkx,chunkz)
		this.chunk_instances[chunk_instance.name] = chunk_instance
		chunk_instance.generate()
	}

	world_to_chunk_coords(x, y, z){
		let chunk_x = Math.floor(x/16)
		let chunk_z = Math.floor(z/16)

		let pos_x = null;
		let pos_z = null;

		if(x < 0){
			pos_x = (16 - Math.abs(x%16))%16
		}else{
			pos_x = Math.abs(x%16)
		}
		
		if(z < 0){
			pos_z = (16 - Math.abs(z%16))%16
		}else{
			pos_z = Math.abs(z%16)
		}

		let index = y*256+pos_x*16+pos_z

		return {"chunk_x":chunk_x, "chunk_z":chunk_z, "pos_z":pos_z, "pos_x":pos_x, "index":index}
	}

	buildTree(x,y,z) {
		blocks.push(new OakLog(x, y, z));
		blocks.push(new OakLog(x, y+1, z));
		blocks.push(new OakLog(x, y+2, z));
		blocks.push(new OakLog(x, y+3, z));
		blocks.push(new OakLeaves(x+2, y+3, z-2));
		blocks.push(new OakLeaves(x+2, y+3, z-1));
		blocks.push(new OakLeaves(x+2, y+3, z));
		blocks.push(new OakLeaves(x+2, y+3, z+1));
		blocks.push(new OakLeaves(x+2, y+3, z+2));
		blocks.push(new OakLeaves(x+1, y+3, z-2));
		blocks.push(new OakLeaves(x+1, y+3, z-1));
		blocks.push(new OakLeaves(x+1, y+3, z));
		blocks.push(new OakLeaves(x+1, y+3, z+1));
		blocks.push(new OakLeaves(x+1, y+3, z+2));
		blocks.push(new OakLeaves(x, y+3, z-2));
		blocks.push(new OakLeaves(x, y+3, z-1));
		blocks.push(new OakLeaves(x, y+3, z+1));
		blocks.push(new OakLeaves(x, y+3, z+2));
		blocks.push(new OakLeaves(x-1, y+3, z-2));
		blocks.push(new OakLeaves(x-1, y+3, z-1));
		blocks.push(new OakLeaves(x-1, y+3, z));
		blocks.push(new OakLeaves(x-1, y+3, z+1));
		blocks.push(new OakLeaves(x-1, y+3, z+2));
		blocks.push(new OakLeaves(x-2, y+3, z-2));
		blocks.push(new OakLeaves(x-2, y+3, z-1));
		blocks.push(new OakLeaves(x-2, y+3, z));
		blocks.push(new OakLeaves(x-2, y+3, z+1));
		blocks.push(new OakLeaves(x-2, y+3, z+2));
		blocks.push(new OakLog(x, y+4, z));
		blocks.push(new OakLeaves(x+2, y+4, z-2));
		blocks.push(new OakLeaves(x+2, y+4, z-1));
		blocks.push(new OakLeaves(x+2, y+4, z));
		blocks.push(new OakLeaves(x+2, y+4, z+1));
		blocks.push(new OakLeaves(x+2, y+4, z+2));
		blocks.push(new OakLeaves(x+1, y+4, z-2));
		blocks.push(new OakLeaves(x+1, y+4, z-1));
		blocks.push(new OakLeaves(x+1, y+4, z));
		blocks.push(new OakLeaves(x+1, y+4, z+1));
		blocks.push(new OakLeaves(x+1, y+4, z+2));
		blocks.push(new OakLeaves(x, y+4, z-2));
		blocks.push(new OakLeaves(x, y+4, z-1));
		blocks.push(new OakLeaves(x, y+4, z+1));
		blocks.push(new OakLeaves(x, y+4, z+2));
		blocks.push(new OakLeaves(x-1, y+4, z-2));
		blocks.push(new OakLeaves(x-1, y+4, z-1));
		blocks.push(new OakLeaves(x-1, y+4, z));
		blocks.push(new OakLeaves(x-1, y+4, z+1));
		blocks.push(new OakLeaves(x-1, y+4, z+2));
		blocks.push(new OakLeaves(x-2, y+4, z-2));
		blocks.push(new OakLeaves(x-2, y+4, z-1));
		blocks.push(new OakLeaves(x-2, y+4, z));
		blocks.push(new OakLeaves(x-2, y+4, z+1));
		blocks.push(new OakLeaves(x-2, y+4, z+2));
		blocks.push(new OakLeaves(x+1, y+5, z-1));
		blocks.push(new OakLeaves(x+1, y+5, z));
		blocks.push(new OakLeaves(x+1, y+5, z+1));
		blocks.push(new OakLeaves(x, y+5, z-1));
		blocks.push(new OakLeaves(x, y+5, z));
		blocks.push(new OakLeaves(x, y+5, z+1));
		blocks.push(new OakLeaves(x-1, y+5, z-1));
		blocks.push(new OakLeaves(x-1, y+5, z));
		blocks.push(new OakLeaves(x-1, y+5, z+1));
		blocks.push(new OakLeaves(x+1, y+6, z));
		blocks.push(new OakLeaves(x, y+6, z+1));
		blocks.push(new OakLeaves(x, y+6, z));
		blocks.push(new OakLeaves(x, y+6, z-1));
		blocks.push(new OakLeaves(x-1, y+6, z));
	}

	get_block_faces(x,y,z){
		let faces = {}
		faces.U = this.get_block_ID(x,y+1,z)
		faces.D = this.get_block_ID(x,y-1,z)
		faces.N = this.get_block_ID(x-1,y,z)
		faces.S = this.get_block_ID(x+1,y,z)
		faces.E = this.get_block_ID(x,y,z+1)
		faces.W = this.get_block_ID(x,y,z-1)
		//console.log(faces)
		return faces
	}

	get_block_ID(x,y,z){

		if(y<0 || y > 255){
			return 0
		}

		let coords = this.world_to_chunk_coords(x,y,z)

		let chunk = this.world[this.get_chunk_name(coords.chunk_x, coords.chunk_z)]
		try{
			if (chunk == undefined){
				return -1
			}else{
				let ID = chunk[coords.index]
				if(chunk[coords.index] == 0){
					return 0
				}
				if (ID != undefined){
					return ID
				}else{
					return -1
				}
			}
		}catch(e){
			return -1
		}
	}

	get_block(x,y,z){

		if(y<0 || y > 255){
			return 0
		}

		let coords = this.world_to_chunk_coords(x,y,z)

		let chunk = this.world[this.get_chunk_name(coords.chunk_x, coords.chunk_z)]
		try{
			if (chunk == undefined){
				return "undefined_chunk"
			}else{
				let block = chunk[coords.index]
				return block
			}
		}catch(e){
			return null
		}
	}

	set_id(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z)
		world.world[world.get_chunk_name(coords.chunk_x,coords.chunk_z)][coords.index] = id
	}

	reload_chunk(x, z){
		scene.remove(scene.getObjectByName(world.get_chunk_name(x,z)))
		world.chunk_instances[world.get_chunk_name(x,z)].render()
	}

	set_block(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z)
		this.set_id(x, y, z, id)
		this.reload_chunk(coords.chunk_x, coords.chunk_z);

		if(coords.pos_x == 0){
			this.reload_chunk(coords.chunk_x-1, coords.chunk_z);
		}
		if(coords.pos_x == 15){
			this.reload_chunk(coords.chunk_x+1, coords.chunk_z);
		}
		if(coords.pos_z == 0){
			this.reload_chunk(coords.chunk_x, coords.chunk_z-1);
		}
		if(coords.pos_z == 15){
			this.reload_chunk(coords.chunk_x, coords.chunk_z+1);
		}
	}

	batch_set_block(data){
		let to_update = [];
		for(let i=0; i<data.length;i++){
			let coords = this.world_to_chunk_coords(data[i].x,data[i].y,data[i].z)

			this.set_id(data[i].x, data[i].y, data[i].z, data[i].id);
			let chunk_coords = [coords.chunk_x, coords.chunk_z]
			if(!arrayInArray(chunk_coords, to_update)){
				to_update.push(chunk_coords)
			}

			if(coords.pos_x == 0){
				chunk_coords = [coords.chunk_x-1, coords.chunk_z]
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if(coords.pos_x == 15){
				chunk_coords = [coords.chunk_x+1, coords.chunk_z]
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if(coords.pos_z == 0){
				chunk_coords = [coords.chunk_x, coords.chunk_z-1]
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			}
			if(coords.pos_z == 15){
				chunk_coords = [coords.chunk_x, coords.chunk_z+1]
				if(!arrayInArray(chunk_coords, to_update)){
					to_update.push(chunk_coords)
				}
			} 
		};
		
		to_update.forEach(function(chunk) {
			this.reload_chunk(chunk[0], chunk[1])
		}, this);
	}

	get_looking_at_block(){
		let coords = this.world_to_chunk_coords(lookingAt.blockCoords.x,lookingAt.blockCoords.y,lookingAt.blockCoords.z)
		return this.chunk_instances[this.get_chunk_name(coords.chunk_x, coords.chunk_z)].chunk[coords.index]
	}
}