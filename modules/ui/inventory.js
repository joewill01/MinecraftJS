class Inventory extends UIBase {
    constructor(ui) {
        super();
        this.ui = ui;
        this.createInventory();
        this.createStylesheet();
        this.appendInventory();
    }

    createInventory() {
        this.element = this.ui.dom.createElement("div");
        this.element.id = "inventory";
        this.element.classList.add("inventory");

        this.containerImage = this.ui.dom.createElement("span");
        this.containerImage.id = "inventory_container-image";
        this.containerImage.classList.add("inventory_container-image");
        this.element.appendChild(this.containerImage);
    }

    appendInventory() {
        this.ui.dom_element.appendChild(this.element)
    }

    createStylesheet() {
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
            .inventory {
                display: none;
                visibility: hidden;
                height: 100vh;
                width: 100vw;
                z-index: 99;
                background-color: red;
            }
            
            .inventory.active {
                display: inline;
                visibility: visible;
            } 
            
            .inventory_container-image {
                z-index: 99;
                position: absolute;
                top: calc(50vh - 166px);
                left: calc(50vw - 176px);4
                display: inline-block;
                background-image: url(minecraft/textures/gui/container/inventory.png);
                background-size: 512px 512px;
                image-rendering: pixelated;
                background-position: 0 0;
                width: 352px;
                height: 332px;
            }
        `;
        this.element.appendChild(this.stylesheet);
    }
}