class UIItem {
    constructor(parentElement, x=0, y=0, id="", amount=1, texture="") {
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
        if (amount === 1) {
            this.item_amount.innerHTML = "";
        } else {
            this.item_amount.innerHTML = amount.toString();
        }
    }

    updateTexture(texture=this.texture) {
        this.item_image.style.backgroundImage = `url(minecraft/textures/item/${texture}.png)`;
    }

    updatePosition(x=this.x, y=this.y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }
}