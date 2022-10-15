class PlayerInventory extends Inventory {
	constructor() {
		/*
		0-35: inventory (0-8: hotbar)
		36: helmet
		37: chestplate
		38: leggings
		39: boots
		40: offhand
		41: crafting slot 1
		42: crafting slot 2
		43: crafting slot 3
		44: crafting slot 4
		45: crafting result
		*/

		super();
		for (let i=0; i<36; i++) {
			this.item_slots.push(new ItemSlot());
		}

		this.item_slots.push(new ItemSlot('helmet'))
		this.item_slots.push(new ItemSlot('chestplate'))
		this.item_slots.push(new ItemSlot('leggings'))
		this.item_slots.push(new ItemSlot('boots'))
		this.item_slots.push(new ItemSlot('offhand'))
		this.item_slots.push(new ItemSlot())
		this.item_slots.push(new ItemSlot())
		this.item_slots.push(new ItemSlot())
		this.item_slots.push(new ItemSlot())
		this.item_slots.push(new ItemSlot())

		// crafting result
		this.item_slots[45].locked = true;


		// add some test items to the hotbar

		this.item_slots[0].item = new DiamondLeggingsItem();
		this.item_slots[1].item = new CobblestoneItem();
		this.item_slots[2].item = new IronOreItem();
		this.item_slots[3].item = new IronOreItem();
		this.item_slots[4].item = new LapisLazuliOreItem();
		this.item_slots[5].item = new CoalOreItem();
		this.item_slots[6].item = new GoldOreItem();
		this.item_slots[7].item = new DiamondOreItem();
		this.item_slots[8].item = new FurnaceItem();

		this.item_slots[0].amount = 1;
		this.item_slots[1].amount = 1;
		this.item_slots[2].amount = 48;
		this.item_slots[3].amount = 48;
		this.item_slots[4].amount = 1;
		this.item_slots[5].amount = 1;
		this.item_slots[6].amount = 1;
		this.item_slots[7].amount = 1;
		this.item_slots[8].amount = 1;

	}
	addItem(item,amount){
		let emptySlots = []
		for (let i = 0; i < 36; i++) {
			if (amount > 0) {
				if (this.item_slots[i].item == null || this.item_slots[i].item == '') {
					emptySlots.push(i)
				}
				else if (this.item_slots[i].item.ID == item) {
					this.item_slots[i].item = registry.getItemInstanceFromId(item)
					let totalItems = this.item_slots[i].amount + amount
					if (totalItems <= 64){ //temp 64 eventually it'll be per item
						amount = 0
						this.item_slots[i].amount = totalItems
						this.item_slots[i].updateUIItem()

					} else {
						this.item_slots[i].amount = 64
						amount = totalItems - 64
						this.item_slots[i].updateUIItem()
					}
				}
			}

		}
		if (amount > 0){
			for (let i = 0; i < emptySlots.length; i++) {
				if (amount > 64){
					this.item_slots[emptySlots[i]].item = registry.getItemInstanceFromId(item)
					this.item_slots[emptySlots[i]].amount = 64
					this.item_slots[emptySlots[i]].updateUIItem()
					amount -= 64
				} else if (amount > 0){
					this.item_slots[emptySlots[i]].item = registry.getItemInstanceFromId(item)
					this.item_slots[emptySlots[i]].amount += amount
					amount = 0
					this.item_slots[emptySlots[i]].updateUIItem()
				}
			}


		}
	}
}