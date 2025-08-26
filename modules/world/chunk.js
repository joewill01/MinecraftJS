class Chunk{
	constructor(x, z){
		this.cdata = [];
		this.ctextures = [];
		this.x = x;
		this.z = z;
		this.name = x.toString() + "_" + z.toString()
		this.chunk_geom = null;
		this.stage = 0; // 0 is just made, 1 is world shaped, 2 is decorated and ready to render, can only decorate if all surrounding chunks are at stage 2

		this.worldHeightZoom = 100;
		this.worldHeightScale = 10;
		this.worldHeightRaise = 40;
		this.worldHeightOffset = 999999999999999;

		this.treeZoom = 100;
		this.treeScale = 50;
		this.treeOffset = 1000;

		// CURSOR Per-voxel persistent block light map (local coords)
		this.SIZE = 16*16*256;
		this.blocklightMap = new Uint8Array(this.SIZE);
	}

	
	
	worldShape(){
		const whz = this.worldHeightZoom;
		const whs = this.worldHeightScale;
		const whr = this.worldHeightRaise;
		const who = this.worldHeightOffset;

		for (let y = 0; y < 257; y++){
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					this.cdata.push(0);
					//console.log({"x":this.x*16 + x, "y":y, "z":this.z*16 + z})
				}
			}
		}
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let height = Math.ceil(Math.abs(noise.perlin2((this.x*16+x+who) / whz, (this.z*16 + z + who) / whz)) * whs) + whr;
				for (let y = 0; y <= height; y++){
					this.cdata[y*256 + x*16 + z] = 5
				}
			}
		}
		this.stage = 1;
	}

	decorate(){
		//If this is ran, all chunks around it have been world shaped

		// height
		const whz = this.worldHeightZoom;
		const whs = this.worldHeightScale;
		const whr = this.worldHeightRaise;
		const who = this.worldHeightOffset;

		//Trees
		const tz = this.treeZoom;
		const ts = this.treeScale;
		const to = this.treeOffset;

		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let height = Math.ceil(Math.abs(noise.perlin2((this.x*16+x+who) / whz, (this.z*16 + z + who) / whz)) * whs) + whr;
				let tree = noise.perlin2((this.x*16+x+to) / tz, (this.z*16 + z + to) / tz) > 0.4
				// console.log(tree)
				for (let y = 0; y <= height; y++){
					if(y==height){
						this.cdata[y*256 + x*16 + z] = 1
					}else if(y==height-1 || y==height-2 || y==height-3){
						this.cdata[y*256 + x*16 + z] = 7
					}else if(y==0){
						this.cdata[y*256 + x*16 + z] = 4
					}
				}

				if(tree){
					let y = height + 1
					this.cdata[y*256 + x*16 + z] = 35;
				}
			}
		}

		this.stage = 2;
	}

	buildTree(cdata, x, y, z) {
		cdata[y + x + z] = 7
		cdata[y + x + z+256] = 2
		cdata[y + x + z+512] = 2
		cdata[y + x + z+768] = 2
		cdata[y + x + z+768+1] = 3
		cdata[y + x + z+768-1] = 3
		cdata[y + x + z+768+16-1] = 3
		cdata[y + x + z+768+16+1] = 3
		cdata[y + x + z+768-16-1] = 3
		cdata[y + x + z+768-16+1] = 3
		cdata[y + x + z+768+16] = 3
		cdata[y + x + z+768-16] = 3
		cdata[y + x + z+768+2] = 3
		cdata[y + x + z+768-2] = 3
		cdata[y + x + z+768+16+2] = 3
		cdata[y + x + z+768+16-2] = 3
		cdata[y + x + z+768-16+2] = 3
		cdata[y + x + z+768-16-2] = 3
		cdata[y + x + z+768+32] = 3
		cdata[y + x + z+768-32] = 3
		cdata[y + x + z+768+32+1] = 3
		cdata[y + x + z+768+32-1] = 3
		cdata[y + x + z+768-32+1] = 3
		cdata[y + x + z+768-32-1] = 3
		cdata[y + x + z+1024] = 2
		cdata[y + x + z+1024+1] = 3
		cdata[y + x + z+1024-1] = 3
		cdata[y + x + z+1024+16-1] = 3
		cdata[y + x + z+1024-16-1] = 3
		cdata[y + x + z+1024+16+1] = 3
		cdata[y + x + z+1024-16+1] = 3
		cdata[y + x + z+1024+16] = 3
		cdata[y + x + z+1024-16] = 3
		cdata[y + x + z+1280] = 3
	}

	buildBigStick(cdata, x, y, z) {
		cdata[x+y+x+(256*1)] = 4
		cdata[x+y+x+(256*2)] = 4
		cdata[x+y+x+(256*3)] = 4
		cdata[x+y+x+(256*4)] = 4
		cdata[x+y+x+(256*5)] = 4
		cdata[x+y+x+(256*6)] = 4
		cdata[x+y+x+(256*7)] = 4
		cdata[x+y+x+(256*8)] = 4
		cdata[x+y+x+(256*9)] = 4
		cdata[x+y+x+(256*10)] = 4
		cdata[x+y+x+(256*11)] = 4
		cdata[x+y+x+(256*12)] = 4
		cdata[x+y+x+(256*13)] = 4
		cdata[x+y+x+(256*14)] = 4
		cdata[x+y+x+(256*15)] = 4
		cdata[x+y+x+(256*16)] = 4
		cdata[x+y+x+(256*17)] = 4
		cdata[x+y+x+(256*18)] = 4
		cdata[x+y+x+(256*19)] = 4
		cdata[x+y+x+(256*20)] = 4
	}

	calculateSkylight(){
		for (let perms=0;perms<16;perms++){
			for (let y = 255; y >= 0; y--){
				for (let z = 0; z < 16; z++) {
					for (let x = 0; x < 16; x++) {
						if(this.cdata[y*256 + x*16 + z]==0){
							if(y==255){
								this.chunk[y*256 + x*16 + z].skylight = 15;
							}else{
								let global_x = (this.x * 16) + x 
								let global_z = (this.z * 16) + z

								let above = world.get_block(global_x,y+1,global_z)
								if(above.skylight == 15 && above.ID == 0){
									this.chunk[y*256 + x*16 + z].skylight = 15;
								}else{
									let max;

									let left = world.get_block(global_x-1,y,global_z)
									if(left !== "undefined_chunk"){
										if((max == null || left.skylight>max.skylight) && left!=undefined){
											max = left
										}
									}

									if(max == 15){
										this.chunk[y*256 + x*16 + z].skylight = 14;
										continue;
									}

									let right = world.get_block(global_x+1,y,global_z)
									if(right !== "undefined_chunk"){
										if((max == null || right.skylight>max.skylight) && right!=undefined){
											max = right
										}
									}

									if(max == 15){
										this.chunk[y*256 + x*16 + z].skylight = 14;
										continue;
									}

									let forward = world.get_block(global_x,y,global_z+1)
									if(forward !== "undefined_chunk"){
										if((max == null || forward.skylight>max.skylight) && forward!=undefined){
											max = forward
										}
									}

									if(max == 15){
										this.chunk[y*256 + x*16 + z].skylight = 14;
										continue;
									}

									let back = world.get_block(global_x,y,global_z-1)
									if(back !== "undefined_chunk"){
										if((max == null || back.skylight>max.skylight) && back!=undefined){
											max = back
										}
									}
									this.chunk[y*256 + x*16 + z].skylight = max.skylight-1;
								}
							}
						}
					}
				}
			}
		}
	}

	// CURSOR Simple flood-fill block light from lightSource blocks
	calculateBlocklight(){
		const queue = [];
		// Seed from light sources, writing into persistent map
		for (let i=0;i<this.chunk.length;i++){
			const b = this.chunk[i];
			if(!b){ continue }
			if(b.lightSource === true){
				const coords = world.world_to_chunk_coords(b.x,b.y,b.z);
				const level = b.baseLightIntensity || 14;
				if(this.blocklightMap[coords.index] < level){
					this.blocklightMap[coords.index] = level;
				}
				queue.push({x:b.x,y:b.y,z:b.z, level});
			}
		}
		const dirs = [
			[ 1, 0, 0],[-1, 0, 0],
			[ 0, 1, 0],[ 0,-1, 0],
			[ 0, 0, 1],[ 0, 0,-1]
		];
		const neighborsTouched = {};
		while(queue.length>0){
			const cur = queue.shift();
			for (let d=0; d<6; d++){
				const nx = cur.x + dirs[d][0];
				const ny = cur.y + dirs[d][1];
				const nz = cur.z + dirs[d][2];
				const nBlock = world.get_block(nx,ny,nz);
				if(nBlock === -1){ continue }
				const candidate = cur.level - 1;
				if(candidate <= 0){ continue }
				const nCoords = world.world_to_chunk_coords(nx,ny,nz);
				const neighborChunkName = world.get_chunk_name(nCoords.chunk_x,nCoords.chunk_z);
				const neighborChunk = world.chunk_instances[neighborChunkName];
				if(!neighborChunk){ continue }
				if(neighborChunk.blocklightMap == undefined){
					neighborChunk.SIZE = 16*16*256;
					neighborChunk.blocklightMap = new Uint8Array(neighborChunk.SIZE);
				}
				if(neighborChunk.blocklightMap[nCoords.index] < candidate){
					neighborChunk.blocklightMap[nCoords.index] = candidate;
					neighborsTouched[neighborChunkName] = [nCoords.chunk_x,nCoords.chunk_z];
					queue.push({x:nx,y:ny,z:nz, level:candidate});
				}
			}
		}
		// reload touched neighbors once after propagation completes
		for (let key in neighborsTouched){
			const [nx,nz] = neighborsTouched[key];
			if(world.chunk_instances[world.get_chunk_name(nx,nz)]){
				world.reload_chunk(nx,nz);
			}
		}
	}

	// CURSOR Reload neighbor chunks if border blocks have non-zero blocklight
	reloadNeighborsIfLit(){
		let neighborsToReload = {};
		for (let i=0;i<this.chunk.length;i++){
			const b = this.chunk[i];
			if(!b || !b.blocklight || b.blocklight <= 0){ continue }
			// Determine local coords inside this chunk
			const coords = world.world_to_chunk_coords(b.x, b.y, b.z);
			if(coords.pos_x === 0){ neighborsToReload[world.get_chunk_name(this.x-1,this.z)] = [this.x-1,this.z]; }
			if(coords.pos_x === 15){ neighborsToReload[world.get_chunk_name(this.x+1,this.z)] = [this.x+1,this.z]; }
			if(coords.pos_z === 0){ neighborsToReload[world.get_chunk_name(this.x,this.z-1)] = [this.x,this.z-1]; }
			if(coords.pos_z === 15){ neighborsToReload[world.get_chunk_name(this.x,this.z+1)] = [this.x,this.z+1]; }
		}
		for (let key in neighborsToReload){
			const [nx,nz] = neighborsToReload[key];
			if(world.chunk_instances[world.get_chunk_name(nx,nz)]){
				world.reload_chunk(nx,nz);
			}
		}
	}

	render(){
		this.chunk = [];
		let chunk_geom = new THREE.Geometry();
		this.uuid = chunk_geom.uuid

		this.cdata.forEach(function(id, e) {
			let y = Math.floor(e/256)
			let x = Math.floor((e - (256*y)) / 16)
			let z = (e - (256*y) - (x*16))
			this.chunk.push(registry.getBlockInstanceFromId(id, this.x * 16 + x, y, this.z * 16 + z, this.ctextures))
		}, this);

		this.calculateSkylight()
		this.calculateBlocklight()
		this.reloadNeighborsIfLit()

		// CURSOR Apply persistent map values to blocks for shading
		for (let i=0;i<this.chunk.length;i++){
			const b = this.chunk[i];
			if(!b){ continue }
			const coords = world.world_to_chunk_coords(b.x,b.y,b.z);
			b.skylight = this.skylightMap ? (this.skylightMap[coords.index] || 0) : (b.skylight || 0);
			if(this.blocklightMap){
				// sample self and 6 neighbors to light solid faces
				let maxLight = this.blocklightMap[coords.index] || 0;
				const neighbors = [
					[ 1, 0, 0],[-1, 0, 0],
					[ 0, 1, 0],[ 0,-1, 0],
					[ 0, 0, 1],[ 0, 0,-1]
				];
				for (let d=0; d<6; d++){
					const nx = b.x + neighbors[d][0];
					const ny = b.y + neighbors[d][1];
					const nz = b.z + neighbors[d][2];
					const nCoords = world.world_to_chunk_coords(nx,ny,nz);
					const nChunk = world.chunk_instances[world.get_chunk_name(nCoords.chunk_x,nCoords.chunk_z)];
					if(nChunk && nChunk.blocklightMap){
						const lvl = nChunk.blocklightMap[nCoords.index] || 0;
						if(lvl > maxLight){ maxLight = lvl; }
					}
				}
				b.blocklight = maxLight;
			}else{
				b.blocklight = b.blocklight || 0;
			}
		}

		this.chunk.forEach(function(block, e) {
			if(!(block instanceof Air)){
	    		block.render(chunk_geom)
	    	}
		}, this);

		this.chunk_geom = chunk_geom

		chunk_geom.computeFaceNormals();
		chunk_geom.computeVertexNormals();

		let chunk_mesh = new THREE.Mesh(chunk_geom, registry.materials);
		chunk_mesh.geometry.computeFaceNormals();
		chunk_mesh.geometry.computeVertexNormals();

		chunk_mesh.name = this.name + "_mesh"
		this.chunk_mesh = chunk_mesh
		scene.add(chunk_mesh);
		this.stage = 3;
	}
}

try{
	module.exports = Chunk;
}catch(e){

}
