class LapisLazuliOre extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'lapis_ore.png',
			'S': 'lapis_ore.png',
			'E': 'lapis_ore.png',
			'W': 'lapis_ore.png',
			'U': 'lapis_ore.png',
			'D': 'lapis_ore.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 17;
		this.name = "lapis_lazuli_ore"
		this.displayName = "Lapis Lazuli Ore"
		this.prefferedTool = "pickaxe";
		this.hardness = 3;
		this.resistance = 3;
		this.harvestLevel = 2;
		this.droppedItemId = 28;

	}
}