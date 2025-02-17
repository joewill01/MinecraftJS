class Torch extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 30;
		this.name = "torch"
		this.displayName = "Torch"

		this.droppedItemId = 46; //should be 14
        this.lightSource = true;
        this.baseLightIntensity = 15;
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;

		this.spawnParticles();
	}

    spawnParticles(){
        if (world.getBlockParticles(this.x, this.y, this.z) == undefined){
            world.addBlockParticles(this.x, this.y, this.z, new TorchEmitter(this.x, this.y + (1/16)*3, this.z));
        }
    }

    break(){
		this.onBreak();
		this.dropItem();
        world.removeBlockParticles(this.x, this.y, this.z);
	}
}