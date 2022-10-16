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
      return 0;
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
            for (const {dir, corners} of this.faces) {
              const neighbor = this.getVoxel(
                  voxelX + dir[0],
                  voxelY + dir[1],
                  voxelZ + dir[2]);
              if (!neighbor) {
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
                block_ids.push(voxel)
                colours.push(0, 0, 0);
                let [tl, tr, bl, br] = [randInt(0,2), randInt(0,2), randInt(0,2), randInt(0,2)]
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
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

  generateChunk(chunkX, chunkZ){
    const chunkId = this.get_chunk_name(chunkX, chunkZ)
    const {chunkSize} = this;
    let chunk = new Uint8Array(chunkSize * 255 * chunkSize);
    this.chunks[chunkId] = chunk;

    for (let y = 0; y < 255; ++y) {
      for (let z = chunkZ*chunkSize; z < (chunkZ*chunkSize) + chunkSize; ++z) {
        for (let x = chunkX*chunkSize; x < (chunkX*chunkSize) + chunkSize; ++x) {
            const height = (Math.sin(x / chunkSize * Math.PI * 2) + Math.sin(z / chunkSize * Math.PI * 3)) * (chunkSize / 6) + (chunkSize / 2);
          
            if (y < height+30) {
              this.setVoxel(x, y, z, 5)
            }
        }
      }
    }

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

	            colorTop = mix(vec4(0,0,0,corners[0]*0.5), vec4(0,0,0,corners[1]*0.5), vUv.x);
	            colorBottom = mix(vec4(0,0,0,corners[2]*0.5), vec4(0,0,0, corners[3]*0.5), vUv.x);
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
    const chunkX = Math.floor(x / chunkSize);
    const chunkZ = Math.floor(z / chunkSize);
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

      mesh = new THREE.Mesh(geometry, [
        glass_material, 
        glass_material, 
        cobblestone_material, 
        grass_material, 
        bedrock_material,
        orange_concrete_powder_material
      ]);
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
			delete this.chunks[this.get_chunk_name(x,z)]
			scene.remove(scene.getObjectByName(this.get_chunk_name(x,z)+"_mesh"));
		}else{}
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
	get_blocks_around_faces(x,y,z){
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


