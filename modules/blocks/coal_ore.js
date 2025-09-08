class CoalOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 12;
		this.name = "coal_ore"
		this.displayName = "Coal Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 1;
		this.droppedItemId = 26;

	}
}