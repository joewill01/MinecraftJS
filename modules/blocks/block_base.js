class Block {
	constructor(x,y,z,texture_names) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.texture_names = texture_names;

		//Must be changed for new blocks
		this.ID = 0;
		this.name = "base"
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

	render(){
		var block = new THREE.Group();
		block.name = this.texture_names["name"];
		block.position.x = this.x;
		block.position.y = this.y;
		block.position.z = this.z;
		scene.add(block);
		block.blockClass = this;

		setPlane("y",  Math.PI * 0.5, this.texture_names["S"], block, this, "S"); //side
		setPlane("y", -Math.PI * 0.5, this.texture_names["N"], block , this, "N"); //side
		setPlane("y",  0, this.texture_names["E"], block , this, "E"); //side
		setPlane("y",  Math.PI, this.texture_names["W"], block , this, "W");// side
		setPlane("x",  Math.PI * 0.5, this.texture_names["D"], block , this, "D"); //bottom
		setPlane("x", -Math.PI * 0.5, this.texture_names["U"], block , this, "U"); //top

		function setPlane(axis, angle, texture_name, block, obj, name) {
			var texture = new THREE.TextureLoader().load(`minecraft/textures/block/${texture_name}`);
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			if(obj.solid){
				var material = new THREE.MeshBasicMaterial( {map: texture,transparent: false} );
			}else{
				var material = new THREE.MeshBasicMaterial( {map: texture,transparent: true} );
			}
		
			let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
			planeGeom.translate(0, 0, 0.5);
			switch (axis) {
		    	case 'y':
		      		planeGeom.rotateY(angle);
		      		break;
		    	default:
		      		planeGeom.rotateX(angle);
		  	}
		  let plane = new THREE.Mesh(planeGeom, material);
		  plane.name = name;

		  block.add(plane);
		}
	}
}