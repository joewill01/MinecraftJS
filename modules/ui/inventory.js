class Inventory extends UIBase {
    constructor(ui) {
        super(ui);
        this.items=[];

        this.createEl("inventory");
        this.createStylesheet();
        this.createItems();
        this.addEl();

        // temp
        // this.element.classList.add("active");
    }

    extraCreate() {
        this.inventory_container = this.ui.dom.createElement("div");
        this.inventory_container.id = "inventory_container";
        this.inventory_container.classList.add("inventory_container");
        this.element.appendChild(this.inventory_container);



        this.containerImage = this.ui.dom.createElement("span");
        this.containerImage.id = "inventory_container-image";
        this.containerImage.classList.add("inventory_container-image");
        this.inventory_container.appendChild(this.containerImage);

        this.itemsContainer = this.ui.dom.createElement("div");
        this.itemsContainer.id = "inventory_items-container";
        this.itemsContainer.classList.add("inventory_items-container");
        this.inventory_container.appendChild(this.itemsContainer);

    }

    createItems() {
        // armor
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 16, 400, 1, "diamond_helmet"));
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 52, 400, 1, "diamond_chestplate"));
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 88, 400, 1, "diamond_leggings"));
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 124, 400, 1, "diamond_boots"));

        // shield
        this.items.push(this.ui.createItem(this.itemsContainer, 154, 124, 400));

        // crafting
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 36, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 36, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 72, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 72, 400));

        // crafting result
        this.items.push(this.ui.createItem(this.itemsContainer, 308, 56, 400));

        // item row 1
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 52, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 88, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 124, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 160, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 268, 168, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 304, 168, 400));

        // item row 2
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 52, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 88, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 124, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 160, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 268, 204, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 304, 204, 400));

        // item row 3
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 52, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 88, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 124, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 160, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 268, 240, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 304, 240, 400));

        // item row 4 (hot bar)
        this.items.push(this.ui.createItem(this.itemsContainer, 16, 284, 400, 1, "diamond_pickaxe"));
        this.items.push(this.ui.createItem(this.itemsContainer, 52, 284, 400, 1, "diamond_sword"));
        this.items.push(this.ui.createItem(this.itemsContainer, 88, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 124, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 160, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 196, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 232, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 268, 284, 400));
        this.items.push(this.ui.createItem(this.itemsContainer, 304, 284, 400, 65, "diamond"));
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
            }
            
            .inventory.active {
                display: inline;
                visibility: visible;
            } 
            
            .inventory_container {
                position: absolute;
                top: calc(50vh - 166px);
                left: calc(50vw - 176px);
                width: 352px;
                height: 332px;
                z-index: 99;
            }
            
            .inventory_container-image {
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                background-image: url(minecraft/textures/gui/container/inventory.png);
                background-size: 512px 512px;
                image-rendering: pixelated;
                background-position: 0 0;
                width: 352px;
                height: 332px;
            }
            
            .inventory_items-container {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }
        `;
        this.element.appendChild(this.stylesheet);
    }
}