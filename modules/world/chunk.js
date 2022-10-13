class Chunk{
	constructor(x, z){
		this.cdata = [];
		this.ctextures = [];
		this.x = x;
		this.z = z;
		this.name = x.toString() + "_" + z.toString()
		this.chunk_geom = null;
	}

	generate(){
		let zoom = 100
		let scale = 10
		let raise = 40
		let offset = 999999999999999

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
				let height = Math.ceil(Math.abs(noise.perlin2((this.x*16+x+offset) / zoom, (this.z*16 + z + offset) / zoom)) * scale) + raise;
				for (let y = 0; y <= height; y++){
					if(y==0){
						this.cdata[y*256 + x*16 + z] = 4
					}

					if(y==height){
						this.cdata[y*256 + x*16 + z] = 1
					}else if(y==height-1 || y==height-2 || y==height-3){
						this.cdata[y*256 + x*16 + z] = 7
					}else if(y==0){
						this.cdata[y*256 + x*16 + z] = 4
					}else{
						this.cdata[y*256 + x*16 + z] = 5
					}
				}
			}
		}

		world.world[this.name] = this.cdata
		this.render()
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

	async render(){
		this.chunk = [];
		let chunk_geom = new THREE.Geometry();
		let chunk_geom_buffer = new THREE.BufferGeometry();
		const positions = [];
	    const normals = [];
	    const indices = [];
	    const uvs = [];
		this.uuid = chunk_geom.uuid

		this.cdata.forEach(function(id, e) {
			let y = Math.floor(e/256)
			let x = Math.floor((e - (256*y)) / 16)
			let z = (e - (256*y) - (x*16))
			this.chunk.push(registry.getBlockInstanceFromId(id, this.x * 16 + x, y, this.z * 16 + z, this.ctextures))
		}, this);

		// this.calculateSkylight()
		this.chunk.forEach(function(block, e) {
			if(!(block instanceof Air)){
	    		block.render(chunk_geom, positions, normals, indices, uvs, chunk_geom_buffer)
	    	}
		}, this);

		console.log(registry.materials)

		//console.log(positions)
		//console.log(normals)
		//console.log(indices)

		this.chunk_geom = chunk_geom

		chunk_geom.computeFaceNormals();
		chunk_geom.computeVertexNormals();

		const material = new THREE.MeshBasicMaterial({color: 'green'});
		const positionNumComponents = 3;
		const normalNumComponents = 3;
		chunk_geom_buffer.setAttribute(
		    'position',
		    new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
		chunk_geom_buffer.setAttribute(
		    'normal',
		    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
		chunk_geom_buffer.setAttribute(
		    'uv',
		    new THREE.BufferAttribute(new Float32Array(uvs), 2));
		chunk_geom_buffer.setIndex(indices);
		chunk_geom_buffer.addGroup((0),8, 1)
		chunk_geom_buffer.addGroup((8),24, 2)
		const mesh = new THREE.Mesh(chunk_geom_buffer, registry.materials);
		scene.add(mesh);

		// let chunk_mesh = new THREE.Mesh(chunk_geom_buffer, registry.materials);
		// chunk_mesh.geometry.computeFaceNormals();
		// chunk_mesh.geometry.computeVertexNormals();

		// chunk_mesh.name = this.name + "_mesh"
		// this.chunk_mesh = chunk_mesh
		// scene.add(chunk_mesh);
	}
}

try{
	module.exports = Chunk;
}catch(e){

}
