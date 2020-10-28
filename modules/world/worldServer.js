class World{
	constructor(Chunk,worldName){
		this.world = {};
		this.chunk_instances = {};
		//noise.seed(Math.random())
		this.Chunk = Chunk
		this.worldName = worldName
	}

	get_chunk_name(x,z){
		return x.toString() + "_" + z.toString()
	}

	generate_chunk(chunkx,chunkz){
		let chunk_instance = new this.Chunk(chunkx,chunkz,this,this.worldName);
		this.chunk_instances[chunk_instance.name] = chunk_instance;
		chunk_instance.generate()
	}

	world_to_chunk_coords(x, y, z){
		let chunk_x = Math.floor(x/16);
		let chunk_z = Math.floor(z/16);

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

		let index = y*256+pos_x*16+pos_z;

		return {"chunk_x":chunk_x, "chunk_z":chunk_z, "pos_z":pos_z, "pos_x":pos_x, "index":index}
	}

	get_block_ID(x,y,z){
		if (y < 0 || y > 255) {
			return 0
		}

		let coords = this.world_to_chunk_coords(x,y,z);
		let chunk = this.world[this.get_chunk_name(coords.chunk_x, coords.chunk_z)];

		try {
			if (chunk === undefined){
				return -1
			} else {
				let ID = chunk[coords.index];
				if (chunk[coords.index] === 0) {
					return 0
				}
				if (ID !== undefined){
					return ID
				} else {
					return -1
				}
			}
		} catch(e) {
			return -1
		}
	}

	set_id(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z);
		world.world[world.get_chunk_name(coords.chunk_x,coords.chunk_z)][coords.index] = id;
	}

}

try{
	module.exports = World;
}catch(e){
	
}


