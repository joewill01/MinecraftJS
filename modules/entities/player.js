class Player extends Entity{
	constructor(){
		super(0.6, 1.8, 1.6, 0, 60, 0, "player");

		this.perspective = 1;
		this.mass = 2.5;

		this.camera = new THREE.PerspectiveCamera( baseFOV, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.thirdPersonCamera = new THREE.PerspectiveCamera( baseFOV, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.secondPersonCamera = new THREE.PerspectiveCamera( baseFOV, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.set(this.x,this.y,this.z);
		this.controls = new THREE.PointerLockControls(this.camera, renderer.domElement);
		this.euler = null;

		this.camera.add(this.thirdPersonCamera)
		this.camera.add(this.secondPersonCamera)

		this.lastLookedAt = null;
		this.breaktime = 0;
		this.startedBreakSequenceAt = null;
		this.lastStage = 0;
		this.frozen = true;
	}

	update(){
		this.updateCollBoxes();
		this.moveCamera();		
		this.stepBreakSequence();
		this.checkEntityCollisions();
	}

	tp(x,y,z){
		this.velocity.y = 0
		this.velocity.z = 0
		this.velocity.x = 0
		if(x.toString().includes("~")){
			if(x.toString().length != 1){
				this.camera.position.x += parseInt(x.toString().slice(1));
			}
		}else{
			this.camera.position.x = x;
		}

		if(y.toString().includes("~")){
			if(y.toString().length != 1){
				this.camera.position.y += parseInt(y.toString().slice(1));
			}
		}else{
			this.camera.position.y = y;
		}

		if(z.toString().includes("~")){
			if(z.toString().length != 1){
				this.camera.position.z += parseInt(z.toString().slice(1));
			}
		}else{
			this.camera.position.z = z;
		}

		this.x = this.camera.position.x
		this.y = this.camera.position.y
		this.z = this.camera.position.z

		console.log("teleported player to")
		console.log(this.camera.position)
	}

	moveCamera() {
		if(!this.frozen){
			var time = performance.now();
			var delta = ( time - prevTime ) / 1000;

			if(delta>0.2){
				delta = 0.15
			}

			//Change speed if sprinting
			if (!sprinting){
				this.velocity.x -= this.velocity.x * 16.0 * delta;
				this.velocity.z -= this.velocity.z * 16.0 * delta;
			}else{
				this.velocity.x -= this.velocity.x * 10.0 * delta;
				this.velocity.z -= this.velocity.z * 10.0 * delta;
			}
			
			//Change the FOV of the camera to show you are sprinting
			if(sprinting && this.camera.fov < baseFOV+10){
				this.camera.fov ++;
				this.thirdPersonCamera.fov ++;
				this.secondPersonCamera.fov ++;
			}
			if(!sprinting && this.camera.fov > baseFOV){
				this.camera.fov -= 0.5;
				this.thirdPersonCamera.fov -= 0.5;
				this.secondPersonCamera.fov -= 0.5;
			}
			this.camera.updateProjectionMatrix();
			this.thirdPersonCamera.updateProjectionMatrix();
			this.secondPersonCamera.updateProjectionMatrix();

			if(this.velocity.y - 9.8 * this.mass * delta > -this.terminalVelocity){
				this.velocity.y -= 9.8 * this.mass * delta;
			}else{
				this.velocity.y = -this.terminalVelocity
			}

			direction.z = Number( moveForward ) - Number( moveBackward );
			direction.x = Number( moveRight ) - Number( moveLeft );
			direction.normalize(); // this ensures consistent movements in all directions

			if ( moveForward || moveBackward ) this.velocity.z -= direction.z * 1 * delta;
			if ( moveLeft || moveRight ) this.velocity.x -= direction.x * 1 * delta;

			this.move(-this.velocity.x, this.velocity.y*delta, -this.velocity.z, this.camera)

			prevTime = time;

			//Do a raycast here to see how far away the nearsest block is and then set the z to that if its less than 5
			this.thirdPersonCamera.position.z = 5
			this.thirdPersonCamera.lookAt(this.camera.position)

			this.secondPersonCamera.position.z = -5
			this.secondPersonCamera.lookAt(this.camera.position)

			this.x = this.hitbox.position.x
			this.y = this.hitbox.position.y
			this.z = this.hitbox.position.z
		}
	}

	getCamera(){
		if(this.perspective == 1){
			return this.camera;
		}else if (this.perspective == 3){
			return this.thirdPersonCamera;
		}else{
			return this.secondPersonCamera;
		}
	}

	getSurroundingChunks(){
		let coords = world.world_to_chunk_coords(this.x,this.y,this.z)
		let surrounding = [];

		surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z))
		if(Math.floor(coords.pos_x) == 0){
			surrounding.push(world.get_chunk_name(coords.chunk_x-1, coords.chunk_z))
		}else if(Math.floor(coords.pos_x) == 15){
			surrounding.push(world.get_chunk_name(coords.chunk_x+1, coords.chunk_z))
		}if(Math.floor(coords.pos_z) == 0){
			surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z-1))
		}if(Math.floor(coords.pos_z) == 15){
			surrounding.push(world.get_chunk_name(coords.chunk_x, coords.chunk_z+1))
		}
		return surrounding
	}

	stepBreakSequence(){
		if(m1Pressed){
			breakCube.visible = true;
			let currentLookingAt = world.get_looking_at_block()
			let stage = 0;
			if(currentLookingAt != this.lastLookedAt){
				this.lastLookedAt = currentLookingAt;
				//Reset Break Sequence
				this.breaktime = this.calc_break_time(this.lastLookedAt,{"name":"Diamond_Pickaxe","type":"tool","toolType":"pickaxe","speedMultiplier":8,"harvestLevel":1});
				//this.breaktime = this.calc_break_time(this.lastLookedAt,{"name":"Diamond_Shovel","type":"tool","toolType":"shovel","speedMultiplier":8,"harvestLevel":4});
				//this.breaktime = this.calc_break_time(this.lastLookedAt,0);
				this.startedBreakSequenceAt = performance.now();
			}else{
				//Continue Break Sequence
				if(this.lastLookedAt != null){
					let secondsPassed = (performance.now() - this.startedBreakSequenceAt)/1000
					let percentageBroken = secondsPassed / this.breaktime * 100

					if(percentageBroken >=0 && percentageBroken < 10){
						stage = 0	
					}else if(percentageBroken >=10 && percentageBroken < 20){
						stage = 1
					}else if(percentageBroken >=20 && percentageBroken < 30){
						stage = 2
					}else if(percentageBroken >=30 && percentageBroken < 40){
						stage = 3
					}else if(percentageBroken >=40 && percentageBroken < 50){
						stage = 4
					}else if(percentageBroken >=50 && percentageBroken < 60){
						stage = 5
					}else if(percentageBroken >=60 && percentageBroken < 70){
						stage = 6
					}else if(percentageBroken >=70 && percentageBroken < 80){
						stage = 7
					}else if(percentageBroken >=80 && percentageBroken < 90){
						stage = 8
					}else if(percentageBroken >=90 && percentageBroken < 100){
						stage = 9
					}else{
						this.lastLookedAt.break()
						stage = 0
						breakCube.visible = false;
					}
					if(this.lastStage != stage){
						breakCube.material.map = breaktextures[stage]
						breakCube.material.map.needsUpdate = true;
					}
					this.lastStage = stage
				}
			}
		}else{
			//Stop Break Sequence if in progress
			breakCube.visible = false;
			breakCube.material.map = breaktextures[0]
			breakCube.material.map.needsUpdate = true;
			this.lastLookedAt = null;
		}
	}

	calc_break_time(block,item){
		if(block != 0 && block != undefined){
			//CanHarvest
			let seconds = 10000
			let harvestLevel = null
			let speedMultiplier = 1;
			let itemType = (item == 0) ? 0 : item.type;
			if(itemType == "tool"){
				if(item == 0){
					harvestLevel = 0
				}else{
					harvestLevel = item.harvestLevel
				}
			}else{
				harvestLevel = 0;
			}
			if(harvestLevel >= block.harvestLevel){
				seconds = block.hardness * 1.5
			}else{
				seconds = block.hardness * 5
			}

			//Best Tool
			if(itemType == "tool"){
				if(item.toolType == block.prefferedTool){
					speedMultiplier = item.speedMultiplier
					//   if (toolEfficiency and canHarvest)
					//     speedMultiplier += efficiencyLevel ^ 2 + 1
				}
			}

			// //if (hasteEffect)
			// //  speedMultiplier *= 1 + (0.2 * hasteLevel)

			// //if (miningFatigue)
			// //  speedMultiplier /= 3 ^ miningFatigueLevel

			seconds /= speedMultiplier;

			// //if (inWater)
			// //  seconds *= 5

			//if (!canJump){
			// seconds *= 5
			//}

			return seconds
		}else{
			return null;
		}
	}

	onHitGround(){
		canJump = true;
	}

	changeBaseFOV(fov){
		baseFOV = fov;
		this.camera.fov = fov;
		this.thirdPersonCamera.fov = fov;
		this.secondPersonCamera.fov = fov;
	}

	handleCollisions(coll){
	}

	checkEntityCollisions(){
		let coll = collidingEntities[this.entityId]
		try{
			for(let i=0;i<coll.length;i++){
				if(coll[i] instanceof ItemEntity){
					let item = coll[i]
					
					console.log("Picked up: "+item.item.displayName)
					//item is the item class

					registry.unRegisterEntity(item.entityId)

					scene.remove(item.hitbox);
					item.pivot.remove(item.pivot.children[0])
					scene.remove(item.pivot);

					item.cleanup()
			        item.hitbox.geometry.dispose( );
			        item.hitbox.material.dispose( );

			        item.pivot.children[0].geometry.dispose( );
			        item.pivot.children[0].material.dispose( );
			        
			        item.pivot.geometry.dispose( );
			        item.pivot.material.dispose( );
			        
			        item.hitbox = null;
			        item.pivot = null;

			        renderer.renderLists.dispose();
			        renderer.dispose();
				}
			}
		}catch(e){
		}
	}
}

