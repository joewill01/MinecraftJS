class GoldOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'gold_ore.png',
			'S': 'gold_ore.png',
			'E': 'gold_ore.png',
			'W': 'gold_ore.png',
			'U': 'gold_ore.png',
			'D': 'gold_ore.png',
		};
		super(x,y,z,textures,ctex);

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