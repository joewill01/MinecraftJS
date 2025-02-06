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
		this.pathprefix = "block"

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
		this.canFall = false;
		this.hitbox = true;
	}

	static fileCache = {}; // Stores already-loaded files
	static configCache = {}; // Stores already-loaded JSON files

	static logged = false;

    static loadConfig(file) {
        if (!Block.fileCache[file]) {
            const request = new XMLHttpRequest();
            request.open("GET", file, false); // Synchronous request
            request.send(null);

            if (request.status === 200) {
                Block.fileCache[file] = JSON.parse(request.responseText);
				console.log(JSON.parse(request.responseText))
            } else {
                throw new Error(`Failed to load config file: ${file}`);
            }
        }
        return Block.fileCache[file]; // Return cached config
    }

	static resolveConfig(path) {
		if (!Block.configCache[path]) {
			let config = Block.loadConfig(`minecraft/models/${path}.json`);

			// If this block has a parent, recursively load and merge the parent first
			if (config.parent) {
				let parentConfig = Block.resolveConfig(config.parent); // Recursive call
				config = Block.deepMerge(parentConfig, config);
			}

			const configWithPlaceholders = Block.resolvePlaceholders(config);

			Block.configCache[path] = configWithPlaceholders;

			return configWithPlaceholders;
		}
		
		return Block.configCache[path];
    }

	static deepMerge(parent, child) {
        if (!parent) return child;
        if (!child) return parent;

        let merged = Array.isArray(parent) ? [...parent] : { ...parent };

        for (let key in child) {
            if (child[key] instanceof Object && !Array.isArray(child[key])) {
                merged[key] = Block.deepMerge(parent[key], child[key]); // Recursively merge objects
            } else if (Array.isArray(child[key])) {
                let parentArray = parent[key] || [];
                let childArray = child[key];

                let mergedArray = [...parentArray]; // Copy parent list
                for (let item of childArray) {
                    if (!parentArray.includes(item)) mergedArray.push(item); // Avoid duplicates
                }
                merged[key] = mergedArray;
            } else {
                merged[key] = child[key]; // Overwrite primitive values
            }
        }
		return merged;
    }

	static resolvePlaceholders(config, referenceData = null) {
        if (!referenceData) referenceData = config; // Use self if no reference is provided

        if (typeof config === "string") {
            if (config.startsWith("#")) {
                let key = config.substring(1);
                return referenceData.textures?.[key] || config; // Replace if found, otherwise keep placeholder
            }
            return config;
        }

        if (Array.isArray(config)) {
            return config.map(item => Block.resolvePlaceholders(item, referenceData));
        }

        if (typeof config === "object" && config !== null) {
            let resolved = {};
            for (let key in config) {
                resolved[key] = Block.resolvePlaceholders(config[key], referenceData);
            }
            return resolved;
        }

        return config;
    }

	render(chunk_geom){

		const block_config = Block.resolveConfig(this.pathprefix+"/"+this.name);

		if (!Block.logged && this.name == "bedrock") {
			console.log("Block config:", block_config);
			Block.logged = true;
		}

		let faces = world.get_block_faces(this.x, this.y, this.z)

		let blocks_around = world.get_blocks_around_faces(this.x, this.y, this.z)

		let around_faces_for_side;

		function shouldPlaceFace(block) {
			if (block.ID == 0 || block.opacity == 0) {
				return true;
			}
		}

		const around_faces_for_sideS = [
			blocks_around[7],
			blocks_around[11],
			blocks_around[19],
			blocks_around[6],
			blocks_around[18],
			blocks_around[5],
			blocks_around[10],
			blocks_around[17]
		];

		const around_faces_for_sideN = [
			blocks_around[0],
			blocks_around[8],
			blocks_around[12],
			blocks_around[1],
			blocks_around[13],
			blocks_around[2],
			blocks_around[9],
			blocks_around[14]
		];

		const around_faces_for_sideE = [
			blocks_around[2],
			blocks_around[9],
			blocks_around[14],
			blocks_around[4],
			blocks_around[16],
			blocks_around[7],
			blocks_around[11],
			blocks_around[19]
		];

		const around_faces_for_sideW = [
			blocks_around[5],
			blocks_around[10],
			blocks_around[17],
			blocks_around[3],
			blocks_around[15],
			blocks_around[0],
			blocks_around[8],
			blocks_around[12]
		];

		const around_faces_for_sideD = [
			blocks_around[14],
			blocks_around[13],
			blocks_around[12],
			blocks_around[16],
			blocks_around[15],
			blocks_around[19],
			blocks_around[18],
			blocks_around[17]
		];

		const around_faces_for_sideU = [
			blocks_around[0],
			blocks_around[1],
			blocks_around[2],
			blocks_around[3],
			blocks_around[4],
			blocks_around[5],
			blocks_around[6],
			blocks_around[7]
		]; 

		if(shouldPlaceFace(faces.S)){
			setPlane("y", this.texture_names["S"], this, "S", around_faces_for_sideS, true); //side
		}
		if(shouldPlaceFace(faces.N)){
			setPlane("y", this.texture_names["N"] , this, "N", around_faces_for_sideN, true); //side
		}
		if(shouldPlaceFace(faces.E)){
			setPlane("y", this.texture_names["E"] , this, "E", around_faces_for_sideE, true); //side
		}
		if(shouldPlaceFace(faces.W)){
			setPlane("y", this.texture_names["W"] , this, "W", around_faces_for_sideW, true);// side
		}
		if(shouldPlaceFace(faces.D)){
			setPlane("x", this.texture_names["D"] , this, "D", around_faces_for_sideD, true); //bottom
		}
		if(shouldPlaceFace(faces.U)){
			setPlane("x", this.texture_names["U"] , this, "U", around_faces_for_sideU, true); //top
		}
	
		function setPlane(axis, texture_name, obj, name, blocks_around_face, ao) {

			const angles = {
				"S": Math.PI * 0.5,
				"N": -Math.PI * 0.5,
				"E": 0,
				"W": Math.PI,
				"D": Math.PI * 0.5,
				"U": -Math.PI * 0.5
			}

			const angle = angles[name];

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

			function blockNeedAO(block){
				if(block == -1){
					return false
				}

				if((block.ID == 0)){
					return false
				}

				if(block.opacity == 0){
					return false
				}

				return true;
			}

			//tl
			let tlBlockCount = (blockNeedAO(blocks_around_face[0]) ? 1 : 0) + (blockNeedAO(blocks_around_face[1]) ? 1 : 0) + (blockNeedAO(blocks_around_face[3]) ? 1 : 0)
			//tr
			let blBlockCount = (blockNeedAO(blocks_around_face[1]) ? 1 : 0) + (blockNeedAO(blocks_around_face[2]) ? 1 : 0) + (blockNeedAO(blocks_around_face[4]) ? 1 : 0)
			//br
			let brBlockCount = (blockNeedAO(blocks_around_face[4]) ? 1 : 0) + (blockNeedAO(blocks_around_face[6]) ? 1 : 0) + (blockNeedAO(blocks_around_face[7]) ? 1 : 0)
			//bl
			let trBlockCount = (blockNeedAO(blocks_around_face[3]) ? 1 : 0) + (blockNeedAO(blocks_around_face[5])? 1 : 0) + (blockNeedAO(blocks_around_face[6]) ? 1 : 0)
			
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

	dropItem(){
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

	break(){//Overwrite this function and call break then add custom functions
		this.onBreak();
		this.dropItem();
	}
	fallingCheck(){
		let faces = world.get_block_faces(this.x, this.y, this.z)
		if(faces.D == 0){
			this.onBreak()
			let falling_block = new FallingBlock(this.x, this.y, this.z, this);
		}
	}
}