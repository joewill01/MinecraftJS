class ItemEntity extends Entity{
	constructor(x,y,z,item){
		if(item.displayType == "2d"){
			console.log(item)
			var xySize = 0.35;
			var zSize = 0.02

			super(xySize, xySize, false, x, y, z,"item_" + uuid());

			this.xySize = xySize
			this.zSize = zSize

		    var canvas = document.createElement('canvas');
		    var ctx = canvas.getContext('2d');

		    var imageData,data,imageData1,data1,cw,ch;
		    var all_points = [];

		    var defineNonTransparent=function(x,y){
		        return(data1[(y*cw+x)*4+3]>0);
		    }

		    var img = new Image();
		    img.onload = start;

		    function start(){
		    	// resize the main canvas to the image size
		        canvas.width=cw=img.width;
		        canvas.height=img.height;

		        // draw the image on the main canvas
		        ctx.save()
		        ctx.translate(0, canvas.height);
				ctx.scale(1, -1);
		        ctx.drawImage(img,0,0);
		        ctx.restore()

		        // Move every discrete element from the main canvas to a separate canvas
		        // The sticker effect is applied individually to each discrete element and
		        // is done on a separate canvas for each discrete element
		        while(moveDiscreteElementToNewCanvas()){}
		        
		        var pivot = new THREE.Object3D();
				pivot.position.x = x 
				pivot.position.y = y 
				pivot.position.z = z

		        //Draw lines
		        for (var i = all_points.length - 1; i >= 0; i--) {
		        	//Start drawing the shape
		        	var itemOutline = new THREE.Shape();

		        	let points = all_points[i]
		        
			        //Use points to draw shape
			        itemOutline.moveTo(points[0][0],points[0][1])
			        for(let i=1;i<points.length;i++){
			        	itemOutline.lineTo(points[i][0],points[i][1])
			        }
			        itemOutline.lineTo(points[0][0],points[0][1])

				    let texture = new THREE.TextureLoader().load( img.src );
			        texture.magFilter = THREE.NearestFilter;
					texture.minFilter = THREE.NearestFilter;

			        var geometry = new THREE.ExtrudeBufferGeometry( itemOutline, { depth: zSize, bevelEnabled: false } );
			        var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map:texture}) );
			        mesh.position.x = -xySize/2;
					mesh.position.y = 0;
					mesh.scale.x = xySize;
					mesh.scale.y = xySize;
					
					pivot.add( mesh );
				}

				scene.add( pivot );
				img.entity.pivot = pivot
				this.pivot = pivot
		    }

		    function defineGeomPath(context,points){
		        context.beginPath();
		        context.moveTo(points[0][0],points[0][1]);  
		        for(var i=1;i<points.length;i++){
		            context.lineTo(points[i][0],points[i][1]);
		        }
		        context.lineTo(points[0][0],points[0][1]);
		        context.closePath();    
		    }

		    function moveDiscreteElementToNewCanvas(){

		        // get the imageData of the main canvas
		        imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
		        data1=imageData.data;

		        // test & return if the main canvas is empty
		        // Note: do this b/ geom.contour will fatal-error if canvas is empty
		        var hit=false;
		        for(var i=0;i<data1.length;i+=4){
		            if(data1[i+3]>0){hit=true;break;}
		        }
		        if(!hit){return;}

		        // get the point-path that outlines a discrete element
		        var points=geom.contour(defineNonTransparent);
		        let new_points = points.map(x => [x[0]/img.width,x[1]/img.height]);
		        all_points.push(new_points)

		        // remove the element from the main canvas
		        defineGeomPath(ctx,points);
		        ctx.save();
		        ctx.clip();
		        ctx.globalCompositeOperation="destination-out";
		        ctx.clearRect(0,0,canvas.width,canvas.height);
		        ctx.restore();

		        return(true);
		    }

		    img.entity = this
			if(item.type == "block"){
		    	img.src = 'minecraft/textures/block/'+item.itemTexture
			}else{
				img.src = 'minecraft/textures/item/'+item.itemTexture
			}

		}else{

			super(0.35, 0.35, false, x, y, z,"item_" + uuid());
			this.x = x;
			this.y = y;
			this.z = z;

			this.size = 0.2 

			let block_geom = new THREE.Geometry();


			setPlane("y",  Math.PI * 0.5, item.blockTextures["S"], this, "S", block_geom); //side
			setPlane("y", -Math.PI * 0.5, item.blockTextures["N"] , this, "N", block_geom); //side
			setPlane("y",  0, item.blockTextures["E"] , this, "E", block_geom); //side
			setPlane("y",  Math.PI, item.blockTextures["W"] , this, "W", block_geom);// side
			setPlane("x",  Math.PI * 0.5, item.blockTextures["D"] , this, "D", block_geom); //bottom
			setPlane("x", -Math.PI * 0.5, item.blockTextures["U"] , this, "U", block_geom); //top

			function setPlane(axis, angle, texture_name, obj, name, block_geom) {
				let mat_index = registry.registerMaterial(texture_name, true)
				let material = registry.materials[mat_index]

				let planeGeom = new THREE.PlaneGeometry(obj.size, obj.size);
				planeGeom.translate(0, 0, 0.1);
				switch (axis) {
			    	case 'y':
			      		planeGeom.rotateY(angle);
			      		break;
			    	default:
			      		planeGeom.rotateX(angle);
			  	}	
				
				let combinedLight = 0.75

				if(name!="D"&&name!="U"){
					combinedLight*=0.9
				}
	
				if(name=="S"||name=="N"){
					combinedLight*=0.8
				}
	
				let tl = new THREE.Color(combinedLight, combinedLight, combinedLight)
				let tr = new THREE.Color(combinedLight, combinedLight, combinedLight)
				let bl = new THREE.Color(combinedLight, combinedLight, combinedLight)
				let br = new THREE.Color(combinedLight, combinedLight, combinedLight)

				planeGeom.faces[0].vertexColors.push(tl,bl,tr)
				planeGeom.faces[1].vertexColors.push(bl,br,tr)

			  	let plane = new THREE.Mesh(planeGeom);
			  	plane.name = name;

			  	plane.updateMatrix();
			  	block_geom.merge(planeGeom, plane.matrix, mat_index);
			}

		
			let mesh = new THREE.Mesh(block_geom, registry.materials);
			mesh.geometry.computeFaceNormals();
			mesh.geometry.computeVertexNormals(); 

			var pivot = new THREE.Object3D();
			pivot.position.x = x 
			pivot.position.y = y 
			pivot.position.z = z
			pivot.add( mesh );

			scene.add( pivot );
			this.pivot = pivot;
			this.mesh = mesh;
		}	
		this.item = item; 
	}

	update(){
		this.updateCollBoxes();
		var time = performance.now();
		var delta = ( time - this.prevTime ) / 1000;
		if(this.velocity.y - 9.8 * this.mass * delta > -this.terminalVelocity){
			this.velocity.y -= 9.8 * this.mass * delta;
		}else{
			this.velocity.y = -this.terminalVelocity
		}
		try{
			if(this.pivot != undefined){
				this.mesh.rotation.y += 0.015;
				let offset = Math.sin(performance.now()/400)*0.02 + 0.1
				if(this.xySize!=undefined){
					this.pivot.children.forEach((child, index)=>{
						child.position.y = -this.xySize/2 + offset
					})
				}else{
					this.pivot.children.forEach((child, index)=>{
						child.position.y = -this.size/2 + offset
					})
				}
				this.move(-this.velocity.x, this.velocity.y*delta, -this.velocity.z, this.hitbox)
			}
		}catch(e){
			console.log(e)
		}
		this.x = this.hitbox.position.x
		this.y = this.hitbox.position.y
		this.z = this.hitbox.position.z
		this.pivot.position.x = this.x
		this.pivot.position.y = this.y
		this.pivot.position.z = this.z

		this.prevTime = time;
	}

	onHitGround(){
		this.velocity.x = 0;
		this.velocity.z = 0;
		this.velocity.y = 0;
	}

	cleanup(){
		this.boxes.forEach((box, index) => {
			box[0].geometry.dispose( );
			box[0].material.dispose( );
		  	scene.remove(box[0])
		})
		this.boxes = null;
	}
}