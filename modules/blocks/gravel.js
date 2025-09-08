class Gravel extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);
		this.fallingCheck()
		this.ID = 29;
		this.name = "gravel"
		this.displayName = "Gravel"
		this.prefferedTool = "shovel";

		this.hardness = 0.5;
		this.resistance = 0.5;
		this.droppedItemId = 45;
		this.canFall = true;
	}
}