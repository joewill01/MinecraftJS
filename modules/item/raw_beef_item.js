class RawBeefItem extends Item{
	constructor(){
		super();
		
		this.ID = 7;
		this.name = "raw_beef";
		this.displayName = "Raw Beef";
		this.type = "food";
		this.itemTexture = "beef";

		this.hasDurability = false;

		//If Food 
		this.saturation = 1.8;
		this.hunger = 3;
	}
}