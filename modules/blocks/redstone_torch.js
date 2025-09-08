class RedstoneTorch extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 32;
		this.name = "redstone_torch"
		this.displayName = "Redstone Torch"

		this.droppedItemId = 48;
        this.lightSource = true;
        this.baseLightIntensity = 15;
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;
	}
}