class BedrockItem extends Item{
	constructor(){
		super();
		this.ID = 31;
		this.name = "bedrock"; // Item name such as diamond_sword
		this.displayName = "Bedrock"; // Same as name but able to be overwritten for custom item names
		this.type = "block"; // material, tool, food, block, armour
		this.displayType = "3d"; // 2d/3d 

		this.hasDurability = false;

		//If Block
		this.blockId = 4;
		this.blockTextures = {
			'N': 'block/bedrock',
			'S': 'block/bedrock',
			'E': 'block/bedrock',
			'W': 'block/bedrock',
			'U': 'block/bedrock',
			'D': 'block/bedrock',
		};
	}
}