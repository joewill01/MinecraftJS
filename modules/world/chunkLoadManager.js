class ChunkLoadManager{
	constructor(player, render_distance){
		this.player = player;
		this.prev_chunk = null;
		this.rd = render_distance;
		this.loaded = [];
	}

	initial_load(){
		let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		this.prev_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		for(let x=playerPos.chunk_x-Math.floor(this.rd/2);x<=playerPos.chunk_x+Math.floor(this.rd/2);x++){
			for(let z=playerPos.chunk_z-Math.floor(this.rd/2);z<=playerPos.chunk_z+Math.floor(this.rd/2);z++){
				this.loaded.push([x,z])
				world.generate_chunk(x,z);
			}
		}
	}

	update(){
		// let playerPos = world.world_to_chunk_coords(player.x,0,player.z)
		// let player_chunk = [playerPos.chunk_x,playerPos.chunk_z]
		// if(player_chunk[0] < this.prev_chunk[0]){ //gone from -1 to -2
		// 	let diff = this.prev_chunk[0] - player_chunk[0] // -1 - -2 = 1
		// 	this.loaded.forEach(element => 
		// 		if(element[0] > playerPos.chunk_x + Math.floor(this.rd/2) - diff){
		// 			//world.unload_chunk(element[0],element[1]);
		// 		}
		// 	)
		// }
	}
}

//Fix the loading and unloading math here
//Make collision detection only check the currently in chunk