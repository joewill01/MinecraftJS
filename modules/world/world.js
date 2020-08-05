class World{
	constructor(){
		this.world = {};
	}

	generate_chunk(chunkx,chunkz,name){
		let chunk = [];
		let chunk_textures = [];

		//TEMPORARY GENERATION
		let stone = [1,20];
		let dirt = [21,24];
		for (let y = 0; y < 257; y++){
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					if(y==24 & x==4 & z == 4){
						chunk.push(new Bedrock(chunkx * 16 + x, y, chunkz * 16 + z,chunk_textures))
					}
					if (y == 0){
						chunk.push(new Bedrock(chunkx * 16 + x, y, chunkz * 16 + z,chunk_textures))
					}else if(y >= stone[0] && y <= stone[1]){
						chunk.push(new Stone(chunkx * 16 + x, y, chunkz * 16 + z,chunk_textures))
					}else if(y == stone[1]+1){
						chunk.push(new GrassBlock(chunkx * 16 + x, y, chunkz * 16 + z,chunk_textures))
					}else{
						chunk.push(0)
					}
				}
			}
		}
		this.world[name] = chunk;
		this.render_chunk(chunk,chunk_textures);
	}

	render_chunk(chunk_data, ctex){
		let chunk_geom = new THREE.Geometry();
		chunk_data.forEach(function(block,e) {
	    	if(block != 0){
	    		block.render(chunk_geom)
	    	}
		});

		let chunk = new THREE.Mesh(chunk_geom, registry.materials);
		chunk.geometry.computeFaceNormals();
		chunk.geometry.computeVertexNormals();

		scene.add(chunk);
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

		let chunk_x = Math.floor(x/16)
		let chunk_z = Math.floor(z/16)

		let pos_x = x%16
		let pos_z = z%16

		let chunk_name = chunk_x.toString() + "_" + chunk_z.toString()
		let chunk = this.world[chunk_name]
		try{
			if (chunk == undefined){
				return 0
			}else{
				//console.log(pos_x*16+pos_z)
				let ID = chunk[y*256+x*16+z].ID
				if(chunk[y*256+x*16+z] == 0){
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
}