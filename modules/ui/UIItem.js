class UIItem {
    constructor(parentElement, item_slot, x=0, y=0, id="", x_invert=false, y_invert=false) {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.x_invert = x_invert;
        this.y_invert = y_invert;
        this.id = id;
        this.mirrorEl = '';
        this.mirroring = false;

        this.item_slot = item_slot;

        this.onchange = () => {};
        this.onclick = () => {};
        this.oncontextmenu = () => {};
        this.createItem()
    }

    createItem() {
        this.element = this.dom.createElement("div");
        this.element.onclick = () => {this.onclickInternal()};
        this.element.oncontextmenu = () => {this.oncontextmenuInternal()};
        this.element.classList.add("standard_item");
        this.element.id = this.id;


        this.item_hover_overlay = this.dom.createElement("span");
        this.item_hover_overlay.id = `${this.id}:item_hover_overlay`;
        this.item_hover_overlay.classList.add("item_hover_overlay");
        this.element.appendChild(this.item_hover_overlay);

        this.item_image = this.dom.createElement("span");
        this.item_image.id = `${this.id}:item_image`;
        this.item_image.classList.add("item_image");
        this.element.appendChild(this.item_image);

        this.item_amount = this.dom.createElement("p");
        this.item_amount.id = `${this.id}:item_amount`;
        this.item_amount.classList.add("item_amount");
        this.item_amount.classList.add("standard_text");

        this.block_holder = this.dom.createElement("div");
        this.block_holder.id = `${this.id}:block_holder`;
        this.block_holder.classList.add("block_holder");

        this.block = this.dom.createElement("div");
        this.block.id = `${this.id}:block`;
        this.block.classList.add("block");

        this.block_top = this.dom.createElement("span");
        this.block_top.id = `${this.id}:block_top`;
        this.block_top.classList.add("top");
        this.block.appendChild(this.block_top);

        this.block_right = this.dom.createElement("span");
        this.block_right.id = `${this.id}:block_right`;
        this.block_right.classList.add("right");
        this.block.appendChild(this.block_right);

        this.block_front = this.dom.createElement("span");
        this.block_front.id = `${this.id}:block_front`;
        this.block_front.classList.add("front");
        this.block.appendChild(this.block_front);

        this.block_holder.appendChild(this.block);

        this.element.appendChild(this.block_holder);

        this.updatePosition();
        this.updateTexture();
        this.updateAmount();

        this.element.appendChild(this.item_amount);

        this.parentElement.appendChild(this.element);
    }

    mirrorTo(UIItem) {
        this.mirrorEl = UIItem;
        this.mirroring = true;
        this.updateMirror();
    }

    updateMirror() {
        if (this.mirroring) {
        console.log("update mirror!");
            this.mirrorEl.item_slot.item = this.item_slot.item;
            this.mirrorEl.item_slot.amount = this.item_slot.amount;
            this.mirrorEl.updateTexture();
            this.mirrorEl.updateAmount();
        }
    }

    onchangeInternal() {
        // runs on change
        this.updateMirror();
        this.onchange();
    }

    setAmount(amount) {
        this.item_slot.amount = amount;
        this.updateAmount();
    }

    updateAmount() {
        if (this.item_slot.amount <= 1) {
            this.item_amount.innerHTML = "";
        } else {
            this.item_amount.innerHTML = this.item_slot.amount.toString();
        }
        if (this.item_slot.amount <= 0) {
            this.item_slot.item = "";
            this.updateTexture();
        }
        this.onchangeInternal();
    }

    getAmount() {
        return this.item_slot.amount;
    }

    setItemInstance(item) {
        if (item) {
            this.item_slot.item = item;
            this.updateTexture();
        }
    }

    updateTexture() {
        if (this.item_slot.item) {
            if (this.item_slot.item.displayType == "2d") {
                this.block_top.style.background = 'none';
                this.block_right.style.background = 'none';
                this.block_front.style.background = 'none';
                this.item_image.style.backgroundImage = `url(minecraft/textures/item/${this.item_slot.item.itemTexture})`;
            } else {
                this.block_top.style.backgroundImage = `url(minecraft/textures/block/${this.item_slot.item.blockTextures['U']})`;
                this.block_right.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("minecraft/textures/block/${this.item_slot.item.blockTextures['N']}")`;
                this.block_front.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("minecraft/textures/block/${this.item_slot.item.blockTextures['E']}")`;
                
                this.block_top.style.backgroundSize = 'cover';
                this.block_right.style.backgroundSize = 'cover';
                this.block_front.style.backgroundSize = 'cover';

                this.item_image.style.backgroundImage = 'none';
            }
        } else {
            this.block_top.style.background = 'none';
            this.block_right.style.background = 'none';
            this.block_front.style.background = 'none';
            this.item_image.style.backgroundImage = 'none';
        }

        
        this.onchangeInternal();
    }


    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updatePosition();
    }

    updatePosition() {
        if (this.y_invert) {
            this.element.style.right = `${this.x}px`;
        } else {
            this.element.style.left = `${this.x}px`;
        }

        if (this.x_invert) {
            this.element.style.bottom = `${this.y}px`;
        } else {
            this.element.style.top = `${this.y}px`;
        }
        this.onchangeInternal();
    }

    isEmpty() {
        return (this.item_slot.item === "")
    }

    getItem() {
        return {"item": this.item_slot.item, "amount": this.item_slot.amount}
    }

    setItem(item) {
        this.setAmount(item.amount);
        this.setItemInstance(item['item']);
    }

    removeItem() {
        this.setAmount(0);
        this.item_slot.item = '';
        this.updateTexture();
    }


    moveItemTo(UIItem) {
        if (UIItem.item_slot.locked) {
            console.log(`UIItem (id: ${this.id}): Attempt to move into locked slot (id: ${UIItem.id})`)
            return
        }
        UIItem.setItem(this.getItem());
        this.removeItem();
    }

    getItemFrom(UIItem) {
        UIItem.moveItemTo(this);
    }

    moveItemsTo(UIItem, amount=1) {
        if (UIItem.item_slot.locked) {
            console.log(`UIItem (id: ${this.id}): Attempt to move into locked slot (id: ${UIItem.id})`)
            return
        }
        if ((this.item_slot.item.id === UIItem.item_slot.item.id || UIItem.isEmpty())) {
            // if UIItem has same item type OR is empty AND isnt locked
            if (this.getAmount() >= amount) {
                // if there are enough items to move
                UIItem.setItemInstance(this.item_slot.item);
                UIItem.setAmount(UIItem.getAmount() + amount);

                this.setAmount(this.getAmount() - amount);
            } else {
                console.error(`UIItem (id: ${this.id}): Attempt to move more items than available.`)
            }
        } else {
            console.error(`UIItem (id: ${this.id}): Attempt to move item(s) to different item type.`)
        }
    }

    getItemsFrom(UIItem, amount=1) {
        UIItem.moveItemsTo(this, amount)
    }

    swapItemWith(UIItem) {
        let temp_item = UIItem.getItem();
        this.moveItemTo(UIItem);
        this.setItem(temp_item);
    }

    getMaxToMoveInTo(UIItem) {

    }

    oncontextmenuInternal() {
        if (this.isEmpty()) {
            // if this item slot is empty

            if (!ui.hand.isEmpty()) {
                // if the hand is not empty
                this.getItemsFrom(ui.hand, 1);
            }
        } else {
            // if this item slot is not empty
            if (ui.hand.isEmpty()) {
                // if the hand is empty
                this.moveItemsTo(ui.hand, Math.ceil(this.item_slot.amount / 2))
            } else {
                // if the hand is not empty
                this.getItemsFrom(ui.hand, 1);
            }
        }

        this.oncontextmenu();
    }

    onclickInternal() {
        // do something before running user specified onclick function
        if (this.isEmpty()) {
            // if this item slot is empty
            if (!ui.hand.isEmpty()) {
                // if the hand is not empty
                this.getItemFrom(ui.hand);
            }
        } else {
            // if this item slot is not empty
            if (ui.hand.isEmpty()) {
                // if the hand is empty
                this.moveItemTo(ui.hand)
            } else {
                // if the hand is not empty
                if (ui.hand.item_slot.item.id === this.item_slot.item.id) {
                    // if the item in slot is same as item in hand
                    ui.hand.moveItemsTo(this, ui.hand.getAmount());
                } else {
                    this.swapItemWith(ui.hand);
                }
            }
        }

        this.onclick();
    }
}