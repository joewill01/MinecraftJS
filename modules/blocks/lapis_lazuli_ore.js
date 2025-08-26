class LapisLazuliOre extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 17;
		this.name = "lapis_lazuli_ore"
		this.displayName = "Lapis Lazuli Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 28;
		this.dropNumberMin = 4;
		this.dropNumberMax = 9;

	}
}