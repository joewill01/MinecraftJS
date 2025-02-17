class SandItem extends Item{
	constructor(){
		super();
		this.ID = 44;
		this.name = "sand"; // Item name such as diamond_sword
		this.displayName = "Sand"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 28;
		this.blockTextures = {
			'N': 'block/sand',
			'S': 'block/sand',
			'E': 'block/sand',
			'W': 'block/sand',
			'U': 'block/sand',
			'D': 'block/sand',
		};
	}
}