function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class World{
	constructor(){
		noise.seed(Math.random())

		this.chunkSize = 16;
		this.chunkSliceSize = this.chunkSize * this.chunkSize;
    this.chunks = {};
    this.chunkIdToMesh = {};
    this.faces = [
		  { // left - north
		    uvRow: 0,
		    dir: [ -1,  0,  0, ],
		    corners: [
		      { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
		      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
		      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
		      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
		    ],
		  },
		  { // right - south
		    uvRow: 0,
		    dir: [  1,  0,  0, ],
		    corners: [
		      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
		      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
		      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
		      { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
		    ],
		  },
		  { // bottom
		    uvRow: 1,
		    dir: [  0, -1,  0, ],
		    corners: [
		      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
		      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
		      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
		      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
		    ],
		  },
		  { // top
		    uvRow: 2,
		    dir: [  0,  1,  0, ],
		    corners: [
		      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
		      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
		      { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
		      { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
		    ],
		  },
		  { // back - west
		    uvRow: 0,
		    dir: [  0,  0, -1, ],
		    corners: [
		      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
		      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
		      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
		      { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
		    ],
		  },
		  { // front - east
		    uvRow: 0,
		    dir: [  0,  0,  1, ],
		    corners: [
		      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
		      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
		      { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
		      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
		    ],
		  },
		];
	}

	computeChunkId(x,z) { //Takes in world coords
		const {chunkSize} = this;
		const chunkX = Math.floor(x / chunkSize);
		const chunkZ = Math.floor(z / chunkSize);
		return this.get_chunk_name(chunkX, chunkZ);
	}

	get_chunk_name(chunkX,chunkZ){ //Takes in chunk coords
		return chunkX.toString() + "_" + chunkZ.toString()
	}

	computeVoxelOffset(x, y, z) {
    const {chunkSize, chunkSliceSize} = this;
    const voxelX = THREE.Math.euclideanModulo(x, chunkSize) | 0;
    const voxelY = THREE.Math.euclideanModulo(y, 256) | 0;
    const voxelZ = THREE.Math.euclideanModulo(z, chunkSize) | 0;
    return voxelY * chunkSliceSize +
           voxelZ * chunkSize +
           voxelX;
  }

  getChunkForVoxel(x, y, z) {
    return this.chunks[this.computeChunkId(x, z)];
  }

  setVoxel(x, y, z, v) {
    let chunk = this.getChunkForVoxel(x, y, z);
    if (!chunk) {
      return 0;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    chunk[voxelOffset] = v;
  }

  getVoxel(x, y, z) {
    const chunk = this.getChunkForVoxel(x, y, z);
    if (!chunk) {
      return 'no chunk bro';
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return chunk[voxelOffset];
  }


	generateGeometryDataForChunk(chunkX, chunkY, chunkZ) {
    const {chunkSize} = this;
    const positions = [];
    const normals = [];
    const indices = [];
    const colours = [];
    const uvs = [];
    const block_ids = [];
    const corners_ao = [];
    const startX = chunkX * chunkSize;
    const startY = chunkY * 255;
    const startZ = chunkZ * chunkSize;

    for (let y = 0; y < 255; ++y) {
      const voxelY = startY + y;
      for (let z = 0; z < chunkSize; ++z) {
        const voxelZ = startZ + z;
        for (let x = 0; x < chunkSize; ++x) {
          const voxelX = startX + x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
          if (voxel) {
            // There is a voxel here but do we need faces for it?
            const singletonBlockInstance = registry.registerSingletonBlockInstance(voxel);
            const blocks_around = this.get_faces_for_aos(voxelX, voxelY, voxelZ);

            for (const {dir, corners} of this.faces) {
            	

              const neighbor = this.getVoxel(
                  voxelX + dir[0],
                  voxelY + dir[1],
                  voxelZ + dir[2]);

              if (!neighbor && neighbor != 'no chunk bro') {
              	let faces_for_ao = [];
              	let AOMultiplier = 0;

              	if (arraysMatch([-1,0,0], dir)) {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['N'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.16;
	                faces_for_ao = [
										blocks_around[5],
										blocks_around[10],
										blocks_around[17],
										blocks_around[3],
										blocks_around[15],
										blocks_around[0],
										blocks_around[8],
										blocks_around[12]
									];
	                

	            	} else if (arraysMatch([1,0,0], dir)) {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['S'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.16;
	                faces_for_ao = [
										blocks_around[2],
										blocks_around[9],
										blocks_around[14],
										blocks_around[4],
										blocks_around[16],
										blocks_around[7],
										blocks_around[11],
										blocks_around[19]
									];
	                
	              } else if (arraysMatch([0,-1,0], dir)) {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['D'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.2;
	                faces_for_ao = [
										blocks_around[14],
										blocks_around[13],
										blocks_around[12],
										blocks_around[16],
										blocks_around[15],
										blocks_around[19],
										blocks_around[18],
										blocks_around[17]
									];
	            	} else if (arraysMatch([0,1,0], dir)) {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['U'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.2;
	                faces_for_ao = [
										blocks_around[0],
										blocks_around[1],
										blocks_around[2],
										blocks_around[3],
										blocks_around[4],
										blocks_around[5],
										blocks_around[6],
										blocks_around[7]
									]; 
	            	} else if (arraysMatch([0,0,-1], dir)) {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['W'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.16;
									faces_for_ao = [blocks_around[0],
										blocks_around[8],
										blocks_around[12],
										blocks_around[1],
										blocks_around[13],
										blocks_around[2],
										blocks_around[9],
										blocks_around[14]
									];
	            	} else {
	                block_ids.push(registry.registerMaterial(singletonBlockInstance.texture_names['E'], singletonBlockInstance.opacity != 2))
									AOMultiplier = 0.16;
									faces_for_ao = [
										blocks_around[7],
										blocks_around[11],
										blocks_around[19],
										blocks_around[6],
										blocks_around[18],
										blocks_around[5],
										blocks_around[10],
										blocks_around[17]
									];
	            	}
                // this voxel has no neighbor in this direction so we need a face.
                const ndx = positions.length / 3;
                for (const {pos, uv} of corners) {
                  positions.push(pos[0] + x - 0.5, pos[1] + y - 0.5, pos[2] + z - 0.5);
                  normals.push(...dir);
                  uvs.push((uv[0]), (uv[1]));
                }
                indices.push(
                  ndx, ndx + 1, ndx + 2,
                  ndx + 2, ndx + 1, ndx + 3,
                );
                colours.push(0, 0, 0);


            		//tl
								let tlBlockCount = ((faces_for_ao[0] != 0 && faces_for_ao[0] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[1] != 0 && faces_for_ao[1] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[3] != 0 && faces_for_ao[3] != 'no chunk bro') ? 1 : 0)
								//tr
								let blBlockCount = ((faces_for_ao[1] != 0 && faces_for_ao[1] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[2] != 0 && faces_for_ao[2] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[4] != 0 && faces_for_ao[4] != 'no chunk bro') ? 1 : 0)
								//br
								let brBlockCount = ((faces_for_ao[4] != 0 && faces_for_ao[4] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[6] != 0 && faces_for_ao[6] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[7] != 0 && faces_for_ao[7] != 'no chunk bro') ? 1 : 0)
								//bl
								let trBlockCount = ((faces_for_ao[3] != 0 && faces_for_ao[3] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[5] != 0 && faces_for_ao[5] != 'no chunk bro') ? 1 : 0) + ((faces_for_ao[6] != 0 && faces_for_ao[6] != 'no chunk bro') ? 1 : 0)
								
								//trBlockCount brBlockCount blBlockCount tlBlockCount


                let [tl, tr, bl, br] = [randInt(0,2), randInt(0,2), randInt(0,2), randInt(0,2)]
                corners_ao.push(tlBlockCount*AOMultiplier, trBlockCount*AOMultiplier, blBlockCount*AOMultiplier, brBlockCount*AOMultiplier);
                corners_ao.push(tlBlockCount*AOMultiplier, trBlockCount*AOMultiplier, blBlockCount*AOMultiplier, brBlockCount*AOMultiplier);
                corners_ao.push(tlBlockCount*AOMultiplier, trBlockCount*AOMultiplier, blBlockCount*AOMultiplier, brBlockCount*AOMultiplier);
                corners_ao.push(tlBlockCount*AOMultiplier, trBlockCount*AOMultiplier, blBlockCount*AOMultiplier, brBlockCount*AOMultiplier);
              }
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      uvs,
      indices,
      block_ids,
      colours,
      corners_ao
    };
  }

  generate(chunkX, chunkZ, chunkSize){
		let zoom = 100
		let scale = 10
		let raise = 40
		let offset = 999999999999999


		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let height = Math.ceil(Math.abs(noise.perlin2((chunkX*chunkSize+x+offset) / zoom, (chunkZ*chunkSize + z + offset) / zoom)) * scale) + raise;
				for (let y = 0; y <= height; y++){
					if(y==0){
						this.setVoxel(x, y, z, 4);
					}

					if(y==height){
						this.setVoxel((chunkX*chunkSize)+x, y, (chunkZ*chunkSize)+z, 1);
					}else if(y==height-1 || y==height-2 || y==height-3){
						this.setVoxel((chunkX*chunkSize)+x, y, (chunkZ*chunkSize)+z, 7);
					}else if(y==0){
						this.setVoxel((chunkX*chunkSize)+x, y, (chunkZ*chunkSize)+z, 4);
					}else{
						this.setVoxel((chunkX*chunkSize)+x, y, (chunkZ*chunkSize)+z, 5);
					}
				}
			}
		}
	}

  generateChunk(chunkX, chunkZ){
  	if (this.get_chunk_name(chunkX, chunkZ) in this.chunks){
  		console.log("attempt to load chunk that is already loaded, reloading");
  		this.reload_chunk(chunkX, chunkZ)
  		return
  	}
    const chunkId = this.get_chunk_name(chunkX, chunkZ)
    const {chunkSize} = this;
    let chunk = new Uint8Array(chunkSize * 255 * chunkSize);
    this.chunks[chunkId] = chunk;

    
    this.generate(chunkX, chunkZ, chunkSize);

    this.updateChunkGeometry(chunkX,0,chunkZ);
    const offsets = [
      [0,1],
      [1,0],
      [-1,0],
      [0,-1]
    ]
    for (let offset of offsets){
      this.updateChunkGeometry((chunkX+offset[0]), 0, (chunkZ+offset[1]), true)
    }
  }


	get_block_faces(x,y,z){
		let faces = {};
		faces.U = this.getVoxel(x,y+1,z);
		faces.D = this.getVoxel(x,y-1,z);
		faces.N = this.getVoxel(x-1,y,z);
		faces.S = this.getVoxel(x+1,y,z);
		faces.E = this.getVoxel(x,y,z+1);
		faces.W = this.getVoxel(x,y,z-1);
		// console.log(faces)
		return faces
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


	updateChunkGeometry(x, y, z, reloadOnly){

		function vertexShader() {
	    return `
	      varying vec2 vUv;

	      attribute vec4 corner;

	      varying vec4 corners;

	      void main() {
	          vUv = uv;

	          corners = corner;

	          gl_Position =   projectionMatrix * 
	                          modelViewMatrix * 
	                          vec4(position,1.0);
	      }
	    `
	  }

	  function fragmentShader(){
	     return `
	        uniform sampler2D texture1;

	        varying vec2 vUv;

	        varying vec4 corners;

	        vec4 colorTop = vec4(0,0,0,0);
	        vec4 colorBottom = vec4(0,0,0,0);
	        vec4 col = vec4(0,0,0,0);

	        void main() {

	            colorTop = mix(vec4(0,0,0,corners[0]), vec4(0,0,0,corners[1]), vUv.x);
	            colorBottom = mix(vec4(0,0,0,corners[2]), vec4(0,0,0, corners[3]), vUv.x);
	            col = mix(colorTop, colorBottom, vUv.y);

	            //gl_FragColor = texture2D(texture1, vUv);
	            if (texture2D(texture1, vUv).a == 0.0){
	              gl_FragColor = texture2D(texture1, vUv);
	            }else{
	              gl_FragColor = mix(vec4(texture2D(texture1, vUv).rgb, 1.0), col, col.a);
	            }
	            
	        }
	      `
	  }


	  const glass_texture = new THREE.TextureLoader().load('minecraft/textures/block/glass.png')
	  var glass_uniforms = {
	    texture1: { type: "t", value: glass_texture }
	  };
	  const glass_material = new THREE.ShaderMaterial({
	    uniforms: glass_uniforms,
	    fragmentShader: fragmentShader(),
	    vertexShader: vertexShader(),
	    transparent: true
	  })
	  glass_texture.magFilter = THREE.NearestFilter;
	  glass_texture.minFilter = THREE.NearestFilter;

	  const cobblestone_texture = new THREE.TextureLoader().load('minecraft/textures/block/cobblestone.png')
	  var cobble_uniforms = {
	    texture1: { type: "t", value: cobblestone_texture }
	  };
	  const cobblestone_material = new THREE.ShaderMaterial({
	    uniforms: cobble_uniforms,
	    fragmentShader: fragmentShader(),
	    vertexShader: vertexShader(),
	  })
	  cobblestone_texture.magFilter = THREE.NearestFilter;
	  cobblestone_texture.minFilter = THREE.NearestFilter;

	  const grass_texture = new THREE.TextureLoader().load('minecraft/textures/block/grass_block_side.png')
	  var grass_uniforms = {
	    texture1: { type: "t", value: grass_texture }
	  };
	  const grass_material = new THREE.ShaderMaterial({
	    uniforms: grass_uniforms,
	    fragmentShader: fragmentShader(),
	    vertexShader: vertexShader(),
	  })
	  grass_texture.magFilter = THREE.NearestFilter;
	  grass_texture.minFilter = THREE.NearestFilter;

	  const bedrock_texture = new THREE.TextureLoader().load('minecraft/textures/block/bedrock.png')
	  var bedrock_uniforms = {
	    texture1: { type: "t", value: bedrock_texture }
	  };
	  const bedrock_material = new THREE.ShaderMaterial({
	    uniforms: bedrock_uniforms,
	    fragmentShader: fragmentShader(),
	    vertexShader: vertexShader(),
	  })
	  bedrock_texture.magFilter = THREE.NearestFilter;
	  bedrock_texture.minFilter = THREE.NearestFilter;

	  const orange_concrete_powder_texture = new THREE.TextureLoader().load('minecraft/textures/block/orange_concrete_powder.png')
	  var orange_concrete_powder_uniforms = {
	    texture1: { type: "t", value: orange_concrete_powder_texture }
	  };
	  const orange_concrete_powder_material = new THREE.ShaderMaterial({
	    uniforms: orange_concrete_powder_uniforms,
	    fragmentShader: fragmentShader(),
	    vertexShader: vertexShader(),
	  })
	  orange_concrete_powder_texture.magFilter = THREE.NearestFilter;
	  orange_concrete_powder_texture.minFilter = THREE.NearestFilter;

		const {chunkSize, chunkSliceSize} = this;
    const chunkX = x;
    const chunkZ = z;
    const chunkId = this.get_chunk_name(x, z);
    let mesh = this.chunkIdToMesh[chunkId];
    if (!mesh) {
      if(reloadOnly){
        return
      }
      const geometry = new THREE.BufferGeometry();
      const positionNumComponents = 3;
      const normalNumComponents = 3;
      const uvNumComponents = 2;
      const colorComponents = 3;
      const cornerComponents = 4;

      geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(0), positionNumComponents));
      geometry.setAttribute(
          'normal',
          new THREE.BufferAttribute(new Float32Array(0), normalNumComponents));
      geometry.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(0), uvNumComponents));
      geometry.setAttribute(
          'color',
          new THREE.BufferAttribute(new Float32Array(0), colorComponents));
      geometry.setAttribute(
          'corner',
          new THREE.BufferAttribute(new Float32Array(0), cornerComponents))

      mesh = new THREE.Mesh(geometry, registry.materials);
      mesh.name = chunkId + "_mesh";
      this.chunkIdToMesh[chunkId] = mesh;
      scene.add(mesh);
      mesh.position.set(x * chunkSize, 0, z * chunkSize);
    }

    const {positions, normals, uvs, indices, block_ids, colors, corners_ao} = this.generateGeometryDataForChunk(chunkX, 0, chunkZ);
    const geometry = mesh.geometry;

    //Setup texture groups for geometry
    const offset = 6
    let currentIndex = 0
    let prev = null
    let count = 0
    geometry.clearGroups()
    for(let block_id of block_ids){
      if (block_id != prev) {
        if (prev != null) {
          // Add group and reset
          geometry.addGroup(currentIndex, count*offset, prev);
          prev = block_id
          currentIndex += (count*offset)
          count = 1
        }else{
          // Reset
          prev = block_id
          count = 1
        }
      }else{
        count+=1;
        prev = block_id
      }
    }
    geometry.addGroup(currentIndex, count*offset, prev);  

    geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.getAttribute('position').needsUpdate = true;

    geometry.setAttribute('normal',new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.getAttribute('normal').needsUpdate = true;

    geometry.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.getAttribute('uv').needsUpdate = true;

    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geometry.getAttribute('color').needsUpdate = true;

    geometry.setAttribute('corner', new THREE.BufferAttribute(new Float32Array(corners_ao), 4));
    geometry.getAttribute('corner').needsUpdate = true;

    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
  }


	unload_chunk(x, z){
		if(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh") != undefined){
			delete this.chunkIdToMesh[this.get_chunk_name(x,z)]
			delete this.chunks[this.get_chunk_name(x,z)]
			scene.remove(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh"));
		}
	}

	reload_chunk(x, z){
		if(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh") != undefined){
			this.updateChunkGeometry(x, 0, z, true);
		}
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

	set_block(x, y, z, id){
		let coords = this.world_to_chunk_coords(x,y,z);
		this.setVoxel(x, y, z, id);
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



	//OLD
	get_faces_for_aos(x,y,z){
		let blocks = [];
		// Starting from TL move ltr to BR
		blocks.push(this.getVoxel(x-1, y+1, z-1))
		blocks.push(this.getVoxel(x-1, y+1, z))
		blocks.push(this.getVoxel(x-1, y+1, z+1))
		blocks.push(this.getVoxel(x, y+1, z-1))
		blocks.push(this.getVoxel(x, y+1, z+1))
		blocks.push(this.getVoxel(x+1, y+1, z-1))
		blocks.push(this.getVoxel(x+1, y+1, z))
		blocks.push(this.getVoxel(x+1, y+1, z+1))

		blocks.push(this.getVoxel(x-1, y, z-1))
		blocks.push(this.getVoxel(x-1, y, z+1))
		blocks.push(this.getVoxel(x+1, y, z-1))
		blocks.push(this.getVoxel(x+1, y, z+1))

		blocks.push(this.getVoxel(x-1, y-1, z-1))
		blocks.push(this.getVoxel(x-1, y-1, z))
		blocks.push(this.getVoxel(x-1, y-1, z+1))
		blocks.push(this.getVoxel(x, y-1, z-1))
		blocks.push(this.getVoxel(x, y-1, z+1))
		blocks.push(this.getVoxel(x+1, y-1, z-1))
		blocks.push(this.getVoxel(x+1, y-1, z))
		blocks.push(this.getVoxel(x+1, y-1, z+1))

		return blocks
	}

	//OLD
	get_block_ID(x,y,z){
		return this.getVoxel(x,y,z)
	}

	//OLD
	get_block(x, y, z) {
		return this.getVoxel(x,y,z)
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


