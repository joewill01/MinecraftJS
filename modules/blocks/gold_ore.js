class GoldOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 13;
		this.name = "gold_ore"
		this.displayName = "Gold Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 16;

	}
}