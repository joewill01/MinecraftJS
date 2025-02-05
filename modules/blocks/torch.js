class Torch extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'torch.png',
			'S': 'torch.png',
			'E': 'torch.png',
			'W': 'torch.png',
			'U': 'torch.png',
			'D': 'torch.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 30;
		this.name = "torch"
		this.displayName = "Torch"

		this.droppedItemId = 46; //should be 14
        this.lightSource = true;
        this.baseLightIntensity = 15;
        this.opacity = 0;

		this.hitbox = false;
	}

    spawnParticles(){
        if (world.getBlockParticles(this.x, this.y, this.z) == undefined){
            world.addBlockParticles(this.x, this.y, this.z, new TorchEmitter(this.x, this.y + (1/16)*3, this.z));
        }
    }

    render(chunk_geom){
        this.spawnParticles();
        let faces = world.get_block_faces(this.x, this.y, this.z)

        function shouldPlaceFace(block) {
			if (block.ID == 0 || block.opacity == 0) {
				return true;
			}
		}

        if(shouldPlaceFace(faces.S)){
			setPlane("y",  Math.PI * 0.5, this.texture_names["S"], this, "S"); //side
		}
		if(shouldPlaceFace(faces.N)){
			setPlane("y", -Math.PI * 0.5, this.texture_names["N"] , this, "N"); //side
		}
		if(shouldPlaceFace(faces.E)){
			setPlane("y",  0, this.texture_names["E"] , this, "E"); //side
		}
		if(shouldPlaceFace(faces.W)){
			setPlane("y",  Math.PI, this.texture_names["W"] , this, "W");// side
		}
		if(shouldPlaceFace(faces.D)){
			setPlane("x",  Math.PI * 0.5, this.texture_names["D"] , this, "D"); //bottom
		}
		if(shouldPlaceFace(faces.U)){
			setPlane("x", -Math.PI * 0.5, this.texture_names["U"] , this, "U"); //top
		}

        function modifyUvs(geom, x1, y1, x2, y2) {
            geom.faceVertexUvs[0][0][0].set(x1, y2);
            geom.faceVertexUvs[0][0][1].set(x1, y1);
            geom.faceVertexUvs[0][0][2].set(x2, y2);

            geom.faceVertexUvs[0][1][0].set(x1, y1);
            geom.faceVertexUvs[0][1][1].set(x2, y1);
            geom.faceVertexUvs[0][1][2].set(x2, y2);
        }

        function setPlane(axis, angle, texture_name, obj, name) {
			let mat_index = registry.registerMaterial(texture_name, obj.solid)

            const pixel = 1/16;

            let planeGeom;

            if(name == "U" || name == "D"){
                planeGeom = new THREE.PlaneGeometry(pixel * 2, pixel * 2, 1, 1);
                modifyUvs(planeGeom, pixel * 7, pixel *  8, pixel * 9, pixel * 10);
            }else {
                planeGeom = new THREE.PlaneGeometry(pixel * 2, pixel * 10, 1, 1);
                modifyUvs(planeGeom, pixel * 7, 0, pixel * 9, pixel * 10);
            }

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

            // Assign locations for planes not on regular block positions
            switch (name) {
                case "U":
                    plane.position.y -= pixel * 6;
                    break;
                case "N":
                    plane.position.y -= pixel * 3;
                    plane.position.x += pixel * 7;
                    break;
                case "S":
                    plane.position.y -= pixel * 3;
                    plane.position.x -= pixel * 7;
                    break;
                case "E":
                    plane.position.y -= pixel * 3;
                    plane.position.z -= pixel * 7;
                    break;
                case "W":
                    plane.position.y -= pixel * 3;
                    plane.position.z += pixel * 7;
                    break;
            }

		  	plane.updateMatrix();
		  	chunk_geom.merge(planeGeom, plane.matrix, mat_index);
		}
    }

    break(){
		this.onBreak();
		this.dropItem();
        world.removeBlockParticles(this.x, this.y, this.z);
	}
}