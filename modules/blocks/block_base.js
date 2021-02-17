class Block {
	constructor(x,y,z,texture_names,ctex) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture_names = texture_names;
		this.ctex = ctex;//chunk_textures list from world
		this.skylight = 0;
		this.blocklight = 0;

		//Must be changed for new blocks
		this.ID = 0;
		this.name = "base"
		this.displayName = "Not Named"
		this.prefferedTool = null; // shovel, axe, pickaxe, shears, hoe, sword

		//Should be changed
		this.hardness = 0; // difficulty to mine. 0 is instant mine -1 is unbreakable. any positive number determines time
		this.resistance = 0; // multiplier for explosions. 0 makes explosion do nothing.. 1 doesn't stop it
		this.solid = true; 
		this.affectedByGravity = false;
		this.soundType = null; // object of sounds to be played when walked on, hit or broken.
		this.placeable = true;
		this.isBlockContainer = false;
		this.lightSource = false;
		this.baseLightIntensity = 0;
		this.needsRandomTick = false;
		this.slipperiness = 0; // momentum multiplier for movement  
		this.harvestLevel = 0; // 0:hand, 1:wood, 2:iron, 3:gold, 4:diamond
		this.replaceableByLeaves = false;
		this.replaceableByWorldGenOres = false;
		this.rotatable = false;
		this.allowedRotations = []; //N,S,E,W,D,U Letter is where the old Top face will end up
		this.droppedItemId = null; 
		this.biomeTints = {};//ex: plains:{r:1,g:1,b:1.2} Multiplicative
	}

	render(chunk_geom){

		let faces = world.get_block_faces(this.x, this.y, this.z)

		if(faces.S == 0){
			setPlane("y",  Math.PI * 0.5, this.texture_names["S"], this, "S"); //side
		}
		if(faces.N == 0){
			setPlane("y", -Math.PI * 0.5, this.texture_names["N"] , this, "N"); //side
		}
		if(faces.E == 0){
			setPlane("y",  0, this.texture_names["E"] , this, "E"); //side
		}
		if(faces.W == 0){
			setPlane("y",  Math.PI, this.texture_names["W"] , this, "W");// side
		}
		if(faces.D == 0){
			setPlane("x",  Math.PI * 0.5, this.texture_names["D"] , this, "D"); //bottom
		}
		if(faces.U == 0){
			setPlane("x", -Math.PI * 0.5, this.texture_names["U"] , this, "U"); //top
		}
	
		function setPlane(axis, angle, texture_name, obj, name) {
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
				combinedLight*=0.8
			}

			let face_multiplier = 1.0;
			 if (name == "E" || name == "W") {
			 	face_multiplier = 0.80;
			 } else if (name == "N" || name == "S") {
			 	face_multiplier = 0.86;
			 }

			//Final Light Vals
			let finalLights = {
				r:((ambient*tint.r)+combinedLight)*face_multiplier,
				g:((ambient*tint.g)+combinedLight)*face_multiplier,
				b:((ambient*tint.b)+combinedLight)*face_multiplier
			}

			let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);

			

			let tl = new THREE.Color(finalLights.r,finalLights.g,finalLights.b)
			let tr = new THREE.Color(finalLights.r,finalLights.g,finalLights.b)
			let bl = new THREE.Color(finalLights.r,finalLights.g,finalLights.b)
			let br = new THREE.Color(finalLights.r,finalLights.g,finalLights.b)

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
			let item_entity = new ItemEntity(this.x, this.y, this.z, item);
			item_entity.velocity.y = randomIntFromInterval(5,10);
			item_entity.velocity.x = randomIntFromInterval(-3,3)/100;
			item_entity.velocity.z = randomIntFromInterval(-3,3)/100;
		}
	}
}