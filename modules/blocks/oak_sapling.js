class OakSapling extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 36;
		this.name = "oak_sapling"
		this.displayName = "Oak Sapling"

		this.droppedItemId = 52;
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;
	}
}