class ChunkLoadManager{
	constructor(player, render_distance){
		this.player = player;
		this.prev_chunk = null;
		this.rd = render_distance;
		this.loaded = {};
		this.toUpdate = [];
	}

	initial_load(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		this.prev_chunk = [playerPos.chunk_x,playerPos.chunk_z]

		let toLoad = this.gen_diamond(playerPos.chunk_x,playerPos.chunk_z,this.rd)

		for (var i = toLoad.length - 1; i >= 0; i--) {

			this.loaded[world.get_chunk_name(toLoad[i][0],toLoad[i][1])] = [toLoad[i][0],toLoad[i][1]];
			
			world.generateChunk(toLoad[i][0],toLoad[i][1]);
			console.log("END OF CHUNK GEN!")
		}
		
		for(let y=253;y>0;y--){
			if(world.get_block_ID(player.x,y,player.z) != 0){
				player.tp(player.x,y+2.5,player.z)
				return
			}
		}
	}

	update(){
		console.log("Start of chunk update")
		console.log("toUpdate", this.toUpdate)
		if(this.toUpdate.length!=0){
			console.log("toUpdate length > 0")
			let chunk = this.toUpdate.pop()
			world.reload_chunk(chunk[0],chunk[1]);
			console.log("Reloading chunk ", chunk[0], chunk[1])
			return
		}

		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		let player_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		let update_chunks = false;
		let toLoad = this.gen_diamond(playerPos.chunk_x,playerPos.chunk_z,this.rd)

		console.log(toLoad)

		//Unload all uneccessary chunks
		for(var key in this.loaded){
			let c = this.loaded[key]
			if(!arrayInArray(c,toLoad)){
				world.unload_chunk(c[0],c[1])
				delete this.loaded[key]
				return
			}
		}

		for (var i = 0; i < toLoad.length; i++) {
			let x = toLoad[i][0];
			let z = toLoad[i][1];
			if(!Object.keys(this.loaded).includes(world.get_chunk_name(x,z))){
				this.loaded[world.get_chunk_name(x,z)] = [x,z];
				world.generateChunk(x,z);
				return
			}
		}
		this.prev_chunk = player_chunk;
	}

	gen_peaks(x,y,r){
		return [[x,r+y],[r+x,y],[x,-r+y],[-r+x,y]]
	}

	gen_line(a,b,dirx,diry){
		let to_ret = []
	    while (!arraysMatch(a,b)){
	    	a[0]+=dirx
	        a[1]+=diry
	        to_ret.push([...a])
	    }
	    return to_ret.slice(0,-1)
	}

	gen_diamond(x,y,render_distance){
		let diamond = [];
		for(let i=0;i<render_distance;i++){
			if(i==0){
				diamond.push([x,y])
			}else if(i==1){
				diamond = diamond.concat(this.gen_peaks(x,y,i))
			}else{
				let diamond_layer = [];
				let peaks = this.gen_peaks(x,y,i)
				diamond_layer = diamond_layer.concat(peaks)
				diamond_layer = diamond_layer.concat(this.gen_line([...peaks[0]],[...peaks[1]],1,-1))
	            diamond_layer = diamond_layer.concat(this.gen_line([...peaks[1]],[...peaks[2]],-1,-1))
	            diamond_layer = diamond_layer.concat(this.gen_line([...peaks[2]],[...peaks[3]],-1,1))
	            diamond_layer = diamond_layer.concat(this.gen_line([...peaks[3]],[...peaks[0]],1,1))
	            diamond = diamond.concat(diamond_layer)
			}
		}
		return diamond
	}
}
