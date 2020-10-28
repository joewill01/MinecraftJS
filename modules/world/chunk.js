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
				let height = Math.ceil(Math.abs(noise.perlin2((this.x*16+x) / zoom, (this.z*16 + z) / zoom)) * scale) + raise;
				for (let y = 0; y <= height; y++){
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

	render(){

		this.chunk = [];
		let chunk_geom = new THREE.Geometry();
		this.uuid = chunk_geom.uuid

		this.cdata.forEach(function(id, e) {
			if(id == 0){
				this.chunk.push(0)
			}else{
				let y = Math.floor(e/256)
				let x = Math.floor((e - (256*y)) / 16)
				let z = (e - (256*y) - (x*16))
				this.chunk.push(registry.getBlockInstanceFromId(id, this.x * 16 + x, y, this.z * 16 + z, this.ctextures))
			}
		}, this);

		this.chunk.forEach(function(block, e) {
			if(block != 0){
	    		block.render(chunk_geom)
	    	}
		}, this);

		let chunk_mesh = new THREE.Mesh(chunk_geom, registry.materials);
		chunk_mesh.geometry.computeFaceNormals();
		chunk_mesh.geometry.computeVertexNormals();

		chunk_mesh.name = this.name + "_mesh"
		this.chunk_mesh = chunk_mesh
		scene.add(chunk_mesh);
	}
}

try{
	module.exports = Chunk;
}catch(e){

}
