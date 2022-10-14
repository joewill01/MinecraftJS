class InventoryUI extends UIBase {
    constructor(ui, hotbar) {
        super(ui);
        this.items=[];
        this.hotbar = hotbar;
        this.player = '';

        this.createEl("inventory");
        this.createStylesheet();
        this.createPlayer();
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

    createPlayer(x=10, y=10) {
        this.player = this.ui.dom.createElement("div");
        this.player.id = "inventory_player";
        this.player.classList.add("player");
        this.inventory_container.appendChild(this.player);

        let cubes = ["head", "arm-left", "arm-right", "body", "leg-left", "leg-right"];
        let sides = ["top", "bottom", "left", "right", "front", "back"];

        this.player_elements = {};

        for (let cube of cubes) {
            let cube_div = this.ui.dom.createElement("div");
            cube_div.classList.add(cube);
            this.player_elements[`${cube}`] = cube_div;
            for (let side of sides) {
                let side_span = this.ui.dom.createElement("span");
                side_span.classList.add(side);
                cube_div.appendChild(side_span);
            }
            this.player.appendChild(cube_div);
        }

    }

    createItems() {
        // armor
        this.items.push(new UIItem(this.itemsContainer, 16, 16, 400, 1, ["diamond_helmet","","",""]));
        this.items.push(new UIItem(this.itemsContainer, 16, 52, 400, 1, ["diamond_chestplate","","",""]));
        this.items.push(new UIItem(this.itemsContainer, 16, 88, 400, 1, ["diamond_leggings","","",""]));
        this.items.push(new UIItem(this.itemsContainer, 16, 124, 400, 1, ["diamond_boots","","",""]));

        // shield
        this.items.push(new UIItem(this.itemsContainer, 154, 124, 400));

        // crafting
        this.items.push(new UIItem(this.itemsContainer, 196, 36, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 36, 400));
        this.items.push(new UIItem(this.itemsContainer, 196, 72, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 72, 400));

        // crafting result
        this.items.push(new UIItem(this.itemsContainer, 308, 56, 400));

        // item row 1
        this.items.push(new UIItem(this.itemsContainer, 16, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 52, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 88, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 124, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 160, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 196, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 268, 168, 400));
        this.items.push(new UIItem(this.itemsContainer, 304, 168, 400));

        // item row 2
        this.items.push(new UIItem(this.itemsContainer, 16, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 52, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 88, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 124, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 160, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 196, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 268, 204, 400));
        this.items.push(new UIItem(this.itemsContainer, 304, 204, 400));

        // item row 3
        this.items.push(new UIItem(this.itemsContainer, 16, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 52, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 88, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 124, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 160, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 196, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 268, 240, 400));
        this.items.push(new UIItem(this.itemsContainer, 304, 240, 400));

        // item row 4 (hot bar)
        this.items.push(new UIItem(this.itemsContainer, 16, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 52, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 88, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 124, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 160, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 196, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 232, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 268, 284, 400));
        this.items.push(new UIItem(this.itemsContainer, 304, 284, 400));
        this.items[37].mirrorTo(this.hotbar.items[0]);
        this.items[38].mirrorTo(this.hotbar.items[1]);
        this.items[39].mirrorTo(this.hotbar.items[2]);
        this.items[40].mirrorTo(this.hotbar.items[3]);
        this.items[41].mirrorTo(this.hotbar.items[4]);
        this.items[42].mirrorTo(this.hotbar.items[5]);
        this.items[43].mirrorTo(this.hotbar.items[6]);
        this.items[44].mirrorTo(this.hotbar.items[7]);
        this.items[45].mirrorTo(this.hotbar.items[8]);

        this.items[37].setItem({"texture": ["","grass_block_top-NORMAL-BY-JOE","grass_block_side","grass_block_side"], amount: 1});
        this.items[38].setItem({"texture": ["","oak_log_top","oak_log","oak_log"], amount: 1});
        this.items[39].setItem({"texture": ["","oak_leaves-NORMAL-BY-JOE","oak_leaves-NORMAL-BY-JOE","oak_leaves-NORMAL-BY-JOE"], amount: 1});
        this.items[40].setItem({"texture": ["","bedrock","bedrock","bedrock"], amount: 1});
        this.items[41].setItem({"texture": ["","stone","stone","stone"], amount: 1});

        this.items[43].setItem({"texture": ["","dirt","dirt","dirt"], amount: 1});
        this.items[44].setItem({"texture": ["","cobblestone","cobblestone","cobblestone"], amount: 1});
        this.items[44].setItem({"texture": ["","oak_planks","oak_planks","oak_planks"], amount: 4});
    }

    createStylesheet() {
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
            .inventory {
                display: none;
                visibility: hidden;
                height: 100vh;
                width: 100vw;
                z-index: 5;
            }
            
            .inventory.active {
                display: inline;
                visibility: visible;
            } `;
        this.element.appendChild(this.stylesheet);
    }

    mousemove(x, y) {
        // RUN THIS FUNCTION ON MOUSE MOVE
        x=x+90;
        y=y+130;

        let angleY = ((x-(window.innerWidth/2))/(window.innerWidth/2))*45;
        let angleX = -((y-(window.innerHeight/2))/(window.innerHeight/2))*45;

        let angleBodyY = angleY;
        let angleBodyX = angleX;
        let angleHeadY = angleY;
        let angleHeadX = angleX;

        let maxAngleBodyY = 20;
        let maxAngleBodyX = 30;
        let maxAngleHeadY = 35;
        let maxAngleHeadX = 20;

        if (Math.abs(angleBodyY) > maxAngleBodyY) {
            if (angleBodyY < 0) {
                angleBodyY = -maxAngleBodyY;
            } else {
                angleBodyY = maxAngleBodyY;
            }
        }
        if (Math.abs(angleBodyX) > maxAngleBodyX) {
            if (angleBodyX < 0) {
                angleBodyX = -maxAngleBodyX;
            } else {
                angleBodyX = maxAngleBodyX;
            }
        }
        if (Math.abs(angleHeadY) > maxAngleHeadY) {
            if (angleHeadY < 0) {
                angleHeadY = -maxAngleHeadY;
            } else {
                angleHeadY = maxAngleHeadY;
            }
        }
        if (Math.abs(angleHeadX) > maxAngleHeadX) {
            if (angleHeadX < 0) {
                angleHeadX = -maxAngleHeadX;
            } else {
                angleHeadX = maxAngleHeadX;
            }
        }

        if (this.player) {
            this.player.style.transform = `scale(0.15) rotateX(${angleBodyX}deg) rotateY(${angleBodyY}deg)`;
            this.player_elements['head'].style.transform = `rotateX(${angleHeadX}deg) rotateY(${angleHeadY}deg)`;
        }
    }
}