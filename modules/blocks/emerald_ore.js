class EmeraldOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 16;
		this.name = "emerald_ore"
		this.displayName = "Emerald Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 27;

	}
}