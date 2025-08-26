class TorchEmitter extends Emitter{
	constructor(x,y,z){
		super(x,y,z)

		this.name="TorchEmitter" + (Math.random().toString())
		this.init();
		this.fireDelay = 0;
		this.lastEmittedFire = 0;

		this.smokeDelay = randomIntFromInterval(2000,6000);
		this.lastEmittedSmoke = performance.now();
	}

	tick(){
		this.fireEmitTimer = performance.now()
		if(this.fireEmitTimer-this.lastEmittedFire>this.fireDelay){
			this.emitFlame();
			this.fireDelay = randomIntFromInterval(500,2000);
			this.lastEmittedFire = performance.now()
		}

		this.smokeEmitTimer = performance.now()
		if(this.smokeEmitTimer-this.lastEmittedSmoke>this.smokeDelay){
			this.emitSmoke();
			this.smokeDelay = randomIntFromInterval(2000,6000);
			this.lastEmittedSmoke = performance.now()
		}
	}

	emitSmoke(){
		let x = new TorchSmoke(this.x,this.y,this.z);
		x.init()
	}

	emitFlame(){
		let x = new TorchFlame(this.x,this.y,this.z);
		x.init()
	}
}