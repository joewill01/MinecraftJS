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
		for(let x=playerPos.chunk_x-Math.floor(this.rd/2);x<=playerPos.chunk_x+Math.floor(this.rd/2);x++){
			for(let z=playerPos.chunk_z-Math.floor(this.rd/2);z<=playerPos.chunk_z+Math.floor(this.rd/2);z++){
				this.loaded[world.get_chunk_name(x,z)] = [x,z];
				world.generate_chunk(x,z);
			}
		}
		for(let y=256;y>0;y--){
			if(world.get_block_ID(player.x,y,player.z) != 0){
				player.tp(player.x,y+2.5,player.z)
				return
			}
		}
	}

	update(){
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
}

//Make collision detection only check the currently in chunk