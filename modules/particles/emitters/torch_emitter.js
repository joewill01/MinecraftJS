class TorchEmitter extends Emitter{
	constructor(x,y,z){
		super(x,y,z)

		this.name="TorchEmitter"
		this.init();
		this.delay = 0;
		this.lastEmittedFire = 0;
	}

	tick(){
		this.fireEmitTimer = performance.now()
		if(this.fireEmitTimer-this.lastEmittedFire>this.delay){
			this.emit();
			this.delay = randomIntFromInterval(900,4000);
			this.lastEmittedFire = performance.now()
		}
	}

	emit(){
		let x = new TorchFlame(this.x,this.y,this.z);
		x.init()
	}
}