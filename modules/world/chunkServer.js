class Chunk{
	constructor(x, z,world,worldName){
		this.cdata = [];
		this.ctextures = [];
		this.x = x;
		this.z = z;
		this.name = x.toString() + "_" + z.toString()
		this.chunk_geom = null;
		this.world = world;
		this.worldName = worldName;
	}

	generate(){
		var fs = require('fs');
		let zoom = 100
		let scale = 10
		let raise = 40

		for (let y = 0; y < 257; y++){
			for (let x = 0; x < 16; x++) {
				for (let z = 0; z < 16; z++) {
					this.cdata.push(0);
				}
			}
		}
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				let height = 60;
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

		this.world.world[this.name] = this.cdata

		fs.writeFile("./saves/"+this.worldName+"/data/"+this.name+".dat", JSON.stringify(this.cdata), function(){});
	}
}

try{
	module.exports = Chunk;
}catch(e){

}
