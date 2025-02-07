class Comparator extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 33;
		this.name = "comparator"
		this.displayName = "Redstone Comparator"

		this.droppedItemId = 49; //should be 14
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;

	}
}