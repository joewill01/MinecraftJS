class IronOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 10;
		this.name = "iron_ore"
		this.displayName = "Iron Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 16;

	}
}