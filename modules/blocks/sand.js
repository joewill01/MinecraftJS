class Sand extends Block{
	constructor(x,y,z,ctex) {
		super(x, y, z, ctex);
		this.fallingCheck()
		this.ID = 28;
		this.name = "sand"
		this.displayName = "Sand"
		this.prefferedTool = "shovel";

		this.hardness = 0.5;
		this.resistance = 0.5;
		this.droppedItemId = 44;
		this.canFall = true;
	}
}