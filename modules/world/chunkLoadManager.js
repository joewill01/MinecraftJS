class ChunkLoadManager{
	constructor(player, render_distance){
		this.player = player;
		this.prev_chunk = null;
		this.rd = render_distance;
		this.loaded = {};
	}

	initial_load(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		this.prev_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		let toLoad = this.gen_diamond(playerPos.chunk_x,playerPos.chunk_z,3)
		for (var i = toLoad.length - 1; i >= 0; i--) {
			this.loaded[world.get_chunk_name(toLoad[i][0],toLoad[i][1])] = [toLoad[i][0],toLoad[i][1]];
			world.generate_chunk(toLoad[i][0],toLoad[i][1]);
		}
		
		for(let y=256;y>0;y--){
			if(world.get_block_ID(player.x,y,player.z) != 0){
				player.tp(player.x,y+2.5,player.z)
				return
			}
		}
	}

	update_old(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		let player_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		let update_chunks = false;
		if(player_chunk[0] != this.prev_chunk[0] || player_chunk[1] != this.prev_chunk[1]){
			update_chunks = true;
		}
		if(update_chunks){
			let new_x_bounds = [playerPos.chunk_x-Math.floor(this.rd/2),playerPos.chunk_x+Math.floor(this.rd/2)]
			let new_z_bounds = [playerPos.chunk_z-Math.floor(this.rd/2),playerPos.chunk_z+Math.floor(this.rd/2)]

			//Unload all uneccessary chunks
			for(var key in this.loaded){
				let c = this.loaded[key]
				if(c[0] < new_x_bounds[0] || c[0] > new_x_bounds[1] || c[1] < new_z_bounds[0] || c[1] > new_z_bounds[1]){
					world.unload_chunk(c[0],c[1])
					delete this.loaded[key]
				}
			}

			//Load all new needed chunks
			for(let x=playerPos.chunk_x-Math.floor(this.rd/2);x<=playerPos.chunk_x+Math.floor(this.rd/2);x++){
				for(let z=playerPos.chunk_z-Math.floor(this.rd/2);z<=playerPos.chunk_z+Math.floor(this.rd/2);z++){
					if(!Object.keys(this.loaded).includes(world.get_chunk_name(x,z))){
						this.loaded[world.get_chunk_name(x,z)] = [x,z];
						world.generate_chunk(x,z);
					}
				}
			}
		}
		this.prev_chunk = player_chunk;
	}

	update(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		let player_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		let update_chunks = false;
		let toLoad = this.gen_diamond(playerPos.chunk_x,playerPos.chunk_z,this.rd)

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
				world.generate_chunk(x,z);
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
