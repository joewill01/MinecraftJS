class UIItem {
    constructor(parentElement, x=0, y=0, id="", amount=0, texture="", x_invert=false, y_invert=false) {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.x_invert = x_invert;
        this.y_invert = y_invert;
        this.id = id;
        this.amount = amount;
        this.texture = texture;
        this.mirrorEl = '';
        this.mirroring = false;
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

        this.setPosition();
        this.setTexture();
        this.setAmount();

        this.element.appendChild(this.item_amount);

        this.parentElement.appendChild(this.element);
    }

    mirrorTo(UIItem) {
        this.mirrorEl = UIItem;
        this.mirroring = true;
    }

    updateMirror() {
        if (this.mirroring) {
            this.mirrorEl.texture = this.texture;
            this.mirrorEl.amount = this.amount;
            this.mirrorEl.update();
        }
    }

    update() {
        this.updatePosition();
        this.updateTexture();
        this.updateAmount();

        this.updateMirror();
    }

    setAmount(amount=this.amount) {
        this.amount = amount;
        this.update();
    }

    updateAmount() {
        if (this.amount <= 1) {
            this.item_amount.innerHTML = "";
        } else {
            this.item_amount.innerHTML = this.amount.toString();
        }
        if (this.amount <= 0) {
        }
    }

    getAmount() {
        return this.amount;
    }

    getTexture() {
        return this.texture;
    }

    isEmpty() {
        return (this.texture === "")
    }

    setTexture(texture=this.texture) {
        this.texture = texture;
        this.update()
    }

    updateTexture() {
        this.item_image.style.backgroundImage = `url(minecraft/textures/item/${this.texture}.png)`;
    }

    getItem() {
        return {"texture": this.texture, "amount": this.amount}
    }

    setItem(item={"texture": "", "amount": 0}) {
        this.setAmount(item.amount);
        this.setTexture(item.texture);
    }

    removeItem() {
        this.setAmount(0);
        this.setTexture("")
    }

    setPosition(x=this.x, y=this.y) {
        this.x = x;
        this.y = y;
        this.update();
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
    }

    moveItemTo(UIItem) {
        UIItem.setItem(this.getItem());
        this.removeItem();
    }

    getItemFrom(UIItem) {
        UIItem.moveItemTo(this);
    }

    moveItemsTo(UIItem, amount=1) {
        if (this.getTexture() === UIItem.getTexture() || UIItem.isEmpty()) {
            // if UIItem has same item type OR is empty
            if (this.getAmount() >= amount) {
                // if there are enough items to move
                UIItem.setTexture(this.getTexture());
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
                this.moveItemsTo(ui.hand, Math.ceil(this.amount / 2))
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
                if (ui.hand.getTexture() === this.getTexture()) {
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