class Furnace extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'furnace_front.png',
			'S': 'furnace_side.png',
			'E': 'furnace_side.png',
			'W': 'furnace_side.png',
			'U': 'furnace_top.png',
			'D': 'furnace_top.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 11;
		this.name = "furnace"
		this.displayName = "Furnace"
		this.prefferedTool = "pickaxe";
		this.hardness = 3; //should be 3.5 but code is being fucky
		this.resistance = 3; //ditto
		this.harvestLevel = 1;
		this.droppedItemId = 17;

	}
}