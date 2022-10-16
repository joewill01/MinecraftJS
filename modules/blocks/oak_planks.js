class OakPlanks extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'oak_planks.png',
			'S': 'oak_planks.png',
			'E': 'oak_planks.png',
			'W': 'oak_planks.png',
			'U': 'oak_planks.png',
			'D': 'oak_planks.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 9;
		this.name = "oak_planks"
		this.displayName = "Oak Planks"
		this.prefferedTool = "axe";

		this.hardness = 2;
		this.resistance = 3;
		this.droppedItemId = 15;

	}
}