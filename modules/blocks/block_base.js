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
			//obj.ctex.push(material)

			let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
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
	}
}