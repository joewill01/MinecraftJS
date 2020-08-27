class UIItem {
    constructor(parentElement, x=0, y=0, id="", amount=0, texture="") {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.id = id;
        this.amount = amount;
        this.texture = texture;
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

        this.updatePosition();

        this.item_hover_overlay = this.dom.createElement("span");
        this.item_hover_overlay.id = `${this.id}:item_hover_overlay`;
        this.item_hover_overlay.classList.add("item_hover_overlay");
        this.element.appendChild(this.item_hover_overlay);

        this.item_image = this.dom.createElement("span");
        this.item_image.id = `${this.id}:item_image`;
        this.item_image.classList.add("item_image");
        this.updateTexture();
        this.element.appendChild(this.item_image);

        this.item_amount = this.dom.createElement("p");
        this.item_amount.id = `${this.id}:item_amount`;
        this.item_amount.classList.add("item_amount");
        this.item_amount.classList.add("standard_text");

        this.updateAmount();

        this.element.appendChild(this.item_amount);

        this.parentElement.appendChild(this.element);
    }

    updateAmount(amount=this.amount) {
        this.amount = amount;
        if (amount === 1 || amount === 0) {
            this.item_amount.innerHTML = "";
        } else {
            this.item_amount.innerHTML = amount.toString();
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

    updateTexture(texture=this.texture) {
        this.texture = texture;
        this.item_image.style.backgroundImage = `url(minecraft/textures/item/${texture}.png)`;
    }

    getItem() {
        return {"texture": this.texture, "amount": this.amount}
    }

    changeItem(item={"texture": "", "amount": 0}) {
        this.updateAmount(item.amount);
        this.updateTexture(item.texture);
    }

    removeItem() {
        this.updateAmount(0);
        this.updateTexture("")
    }

    updatePosition(x=this.x, y=this.y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    moveItemTo(UIItem) {
        UIItem.changeItem(this.getItem());
        this.removeItem();
    }

    getItemFrom(UIItem) {
        UIItem.moveItemTo(this);
    }

    moveItemsTo(UIItem, amount=1) {
        if (this.getTexture() === UIItem.getTexture() || UIItem.isEmpty()) {
            // if UIItem has item type OR is empty
            if (this.getAmount() >= amount) {
                // if there are enough items to move
                UIItem.updateAmount(UIItem.getAmount() + amount);
                UIItem.updateTexture(this.getTexture());
                this.updateAmount(this.getAmount() - amount);
            } else {
                console.error(`UIItem (id: ${this.id}): Attempt to move more items than available.`)
            }
        }
    }

    getItemsFrom(UIItem, amount=1) {
        UIItem.moveItemsTo(this, amount)
    }

    swapItemWith(UIItem) {
        let temp_item = UIItem.getItem();
        this.moveItemTo(UIItem);
        this.changeItem(temp_item);
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

            } else {
                // if the hand is not empty

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
                this.swapItemWith(ui.hand);
            }
        }

        this.onclick();
    }
}