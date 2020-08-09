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
		let stone = [1,20];
		let dirt = [21,24];
		for (let y = 0; y < 257; y++){
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					if(y==24 & x==0 & z == 0){
						this.cdata.push(4)
					}
					if (y == 0){
						this.cdata.push(4)
					}else if(y >= stone[0] && y <= stone[1]){
						this.cdata.push(5)
					}else if(y == stone[1]+1){
						this.cdata.push(1)
					}else{
						this.cdata.push(0)
					}
				}
			}
		}
		world.world[this.name] = this.cdata
		this.render()
	}

	render(){

		let chunk = [];
		let chunk_geom = new THREE.Geometry();
		this.uuid = chunk_geom.uuid

		this.cdata.forEach(function(id, e) {
			if(id == 0){
				chunk.push(0)
			}else{
				let y = Math.floor(e/256)
				let x = Math.floor((e - (256*y)) / 16)
				let z = (e - (256*y) - (x*16))
				chunk.push(registry.getBlockInstanceFromId(id, this.x * 16 + x, y, this.z * 16 + z, this.ctextures))
			}
		}, this);

		chunk.forEach(function(block, e) {
			if(block != 0){
	    		block.render(chunk_geom)
	    	}
		}, this);

		let chunk_mesh = new THREE.Mesh(chunk_geom, registry.materials);
		chunk_mesh.geometry.computeFaceNormals();
		chunk_mesh.geometry.computeVertexNormals();

		chunk_mesh.name = this.name
		scene.add(chunk_mesh);
	}
}
