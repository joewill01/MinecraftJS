class Block {
	constructor(x,y,z,texture_names,ctex) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture_names = texture_names;
		this.ctex = ctex;//chunk_textures list from world

		//Must be changed for new blocks
		this.ID = 0;
		this.name = "base"
		this.displayName = "Not Named"
		this.prefferedTool = null; // shovel, axe, pickaxe, shears, hoe, sword

		//Should be changed
		this.hardness = 0; // difficulty to mine. 0 is instant mine -1 is unbreakable. any positive number determines time
		this.resistance = 0; // https://minecraft.fandom.com/wiki/Explosion#Blast_resistance
		this.affectedByGravity = false;
		this.soundType = null; // object of sounds to be played when walked on, hit or broken.
		this.placeable = true;
		this.isBlockContainer = false;
		this.lightSource = false;
		this.baseLightIntensity = 0;
		this.needsRandomTick = false;
		this.slipperiness = 0; // momentum multiplier for movement  
		this.harvestLevel = 0; // 0:hand, 1:wood, 2:stone, 3:iron, 4:gold, 5:diamond
		this.replaceableByLeaves = false;
		this.replaceableByWorldGenOres = false;
		this.rotatable = false;
		this.allowedRotations = []; //N,S,E,W,D,U Letter is where the old Top face will end up
		this.droppedItemId = null; 
		this.biomeTints = {};//ex: plains:{r:1,g:1,b:1.2} Multiplicative
		this.dropNumberMin = 1;
		this.dropNumberMax = 1;
		this.opacity = 2; //0: transparent, 1: attenuates light, 2:opaque
	}

	render(chunk_geom){

		let faces = world.get_block_faces(this.x, this.y, this.z)

		let blocks_around = world.get_blocks_around_faces(this.x, this.y, this.z)

		let blocks_around_coords = world.get_block_coords_around_faces(this.x, this.y, this.z)

		let around_faces_for_side;

		if(faces.S == 0){
			around_faces_for_side = [
				blocks_around[7],
				blocks_around[11],
				blocks_around[19],
				blocks_around[6],
				blocks_around[18],
				blocks_around[5],
				blocks_around[10],
				blocks_around[17]
			];
			setPlane("y",  Math.PI * 0.5, this.texture_names["S"], this, "S", around_faces_for_side, true); //side
		}
		if(faces.N == 0){
			around_faces_for_side = [
				blocks_around[0],
				blocks_around[8],
				blocks_around[12],
				blocks_around[1],
				blocks_around[13],
				blocks_around[2],
				blocks_around[9],
				blocks_around[14]
			];
			setPlane("y", -Math.PI * 0.5, this.texture_names["N"] , this, "N", around_faces_for_side, true); //side
		}
		if(faces.E == 0){
			around_faces_for_side = [
				blocks_around[2],
				blocks_around[9],
				blocks_around[14],
				blocks_around[4],
				blocks_around[16],
				blocks_around[7],
				blocks_around[11],
				blocks_around[19]
			];
			setPlane("y",  0, this.texture_names["E"] , this, "E", around_faces_for_side, true); //side
		}
		if(faces.W == 0){
			around_faces_for_side = [
				blocks_around[5],
				blocks_around[10],
				blocks_around[17],
				blocks_around[3],
				blocks_around[15],
				blocks_around[0],
				blocks_around[8],
				blocks_around[12]
			];
			setPlane("y",  Math.PI, this.texture_names["W"] , this, "W", around_faces_for_side, true);// side
		}
		if(faces.D == 0){
			around_faces_for_side = [
				blocks_around[14],
				blocks_around[13],
				blocks_around[12],
				blocks_around[16],
				blocks_around[15],
				blocks_around[19],
				blocks_around[18],
				blocks_around[17]
			];
			setPlane("x",  Math.PI * 0.5, this.texture_names["D"] , this, "D", around_faces_for_side, true); //bottom
		}
		if(faces.U == 0){
			around_faces_for_side = [
				blocks_around[0],
				blocks_around[1],
				blocks_around[2],
				blocks_around[3],
				blocks_around[4],
				blocks_around[5],
				blocks_around[6],
				blocks_around[7]
			]; 
			setPlane("x", -Math.PI * 0.5, this.texture_names["U"] , this, "U", around_faces_for_side, true); //top
		}
	
		function setPlane(axis, angle, texture_name, obj, name, blocks_around_face, ao) {
			let mat_index = registry.registerMaterial(texture_name, obj.solid)
			let material = registry.materials[mat_index]

			//Lowest possible light level
			const ambient = 0.14

			//Get biome block is in 
			let biome = "plains"

			//Get tint from block tint obj
			let tint = {};
			if(obj.biomeTints[biome] === 'undefined'){
				tint = obj.biomeTints[biome]
			}else{
				tint = {r:1,b:1,g:1}
			}

			//Sky Light Level 0-15
			let skylight = 15

			//Block Light Level 0-15
			let blocklight = 0

			//Calculate result of block+sky and find range between 0-0.6 to add to the light
			let combinedLight = ((skylight + blocklight) ) * 0.05
			if(combinedLight>0.75){
				combinedLight=0.75
			}

			if(name!="D"&&name!="U"){
				combinedLight*=0.9
			}

			if(name=="S"||name=="N"){
				combinedLight*=0.8
			}

			//Final Light Vals
			let finalLights = {
				r:(ambient*tint.r)+combinedLight,
				g:(ambient*tint.g)+combinedLight,
				b:(ambient*tint.b)+combinedLight
			}

			let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);

			//tl
			let tlBlockCount = ((blocks_around_face[0] != 0 && blocks_around_face[0] != -1) ? 1 : 0) + ((blocks_around_face[1] != 0 && blocks_around_face[1] != -1) ? 1 : 0) + ((blocks_around_face[3] != 0 && blocks_around_face[3] != -1) ? 1 : 0)
			//tr
			let blBlockCount = ((blocks_around_face[1] != 0 && blocks_around_face[1] != -1) ? 1 : 0) + ((blocks_around_face[2] != 0 && blocks_around_face[2] != -1) ? 1 : 0) + ((blocks_around_face[4] != 0 && blocks_around_face[4] != -1) ? 1 : 0)
			//br
			let brBlockCount = ((blocks_around_face[4] != 0 && blocks_around_face[4] != -1) ? 1 : 0) + ((blocks_around_face[6] != 0 && blocks_around_face[6] != -1) ? 1 : 0) + ((blocks_around_face[7] != 0 && blocks_around_face[7] != -1) ? 1 : 0)
			//bl
			let trBlockCount = ((blocks_around_face[3] != 0 && blocks_around_face[3] != -1) ? 1 : 0) + ((blocks_around_face[5] != 0 && blocks_around_face[5] != -1) ? 1 : 0) + ((blocks_around_face[6] != 0 && blocks_around_face[6] != -1) ? 1 : 0)
			
			let AOMultiplier;
			if (ao) {
				if (name=="D"||name=="U"){
					AOMultiplier = -0.2
				} else {
					AOMultiplier = -0.16
				}
			} else {
				AOMultiplier = 0;
			}



			let tl = new THREE.Color(finalLights.r + (AOMultiplier * tlBlockCount),finalLights.g + (AOMultiplier * tlBlockCount),finalLights.b + (AOMultiplier * tlBlockCount))
			let tr = new THREE.Color(finalLights.r + (AOMultiplier * trBlockCount),finalLights.g + (AOMultiplier * trBlockCount),finalLights.b + (AOMultiplier * trBlockCount))
			let bl = new THREE.Color(finalLights.r + (AOMultiplier * blBlockCount),finalLights.g + (AOMultiplier * blBlockCount),finalLights.b + (AOMultiplier * blBlockCount))
			let br = new THREE.Color(finalLights.r + (AOMultiplier * brBlockCount),finalLights.g + (AOMultiplier * brBlockCount),finalLights.b + (AOMultiplier * brBlockCount))
			

			planeGeom.faces[0].vertexColors.push(tl,bl,tr)
			planeGeom.faces[1].vertexColors.push(bl,br,tr)
			planeGeom.translate(0, 0, 0.5);
			switch (axis) {
		    	case 'y':
		      		planeGeom.rotateY(angle);
		      		break;
		    	default:
		      		planeGeom.rotateX(angle);
		  	}

		  	let plane = new THREE.Mesh(planeGeom);
		  	plane.position.x = obj.x;
			plane.position.y = obj.y;
			plane.position.z = obj.z;
			plane.blockClass = obj;
		  	plane.name = name;

		  	plane.updateMatrix();
		  	chunk_geom.merge(planeGeom, plane.matrix, mat_index);
		}
	}

	onBreak(){
		world.set_block(this.x,this.y,this.z,0)
	}

	break(){//Overwrite this function and call break then add custom functions
		this.onBreak();
		if(this.droppedItemId != null){
			let item = registry.getItemInstanceFromId(this.droppedItemId);
			const amountOfDrops = randomIntFromInterval(this.dropNumberMin,this.dropNumberMax)
			for (let i = 0; i < amountOfDrops; i++) {
				let item_entity = new ItemEntity(this.x, this.y, this.z, item);
				item_entity.velocity.y = randomIntFromInterval(5,10);
				item_entity.velocity.x = randomIntFromInterval(-3,3)/100;
				item_entity.velocity.z = randomIntFromInterval(-3,3)/100;
			}

		}
	}
}