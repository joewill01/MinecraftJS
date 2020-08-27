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
        this.createItem()
    }

    createItem() {
        this.element = this.dom.createElement("div");
        this.element.onclick = () => {this.onclickInternal()};
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

    updateTexture(texture=this.texture) {
        this.texture = texture;
        this.item_image.style.backgroundImage = `url(minecraft/textures/item/${texture}.png)`;
    }

    getItem() {
        return {"texture": this.texture, "amount": this.amount}
    }

    addItem(item={"texture": "", "amount": 0}) {
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

    onclickInternal() {
        // do something before running user specified onclick function
        if (this.texture === "") {
            // if this item slot is empty
            if (ui.hand.texture !== "") {
                // if the hand is not empty
                this.addItem(ui.hand.getItem());
                ui.hand.removeItem();
            }
        } else {
            // if this item slot is not empty
            if (ui.hand.texture === "") {
                // if the hand is empty
                ui.hand.addItem(this.getItem());
                this.removeItem();
            } else {
                // if the hand is not empty
                let temp_item = this.getItem();
                this.addItem(ui.hand.getItem());
                ui.hand.addItem(temp_item);
            }
        }
        this.onclick();
    }
}