class Poppy extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 35;
		this.name = "poppy"
		this.displayName = "Poppy"

		this.droppedItemId = 51; //should be 14
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;
	}
}