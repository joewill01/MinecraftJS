class ItemSlot {
	constructor(type="standard") {
		this.type = type; //helmet, chestplate, leggings, boots, standard, fuel, output
		this.item = '';
		this.amount = 0;
		this.locked = false; //can be placed in by the player ; e.g. crafting output would be true
	}

	updateUIItem() {
		
	}

	// item.sameAs

}