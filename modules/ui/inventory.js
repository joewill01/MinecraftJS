class Inventory extends UIBase {
    constructor(ui, hotbar) {
        super(ui);
        this.items=[];
        this.hotbar = hotbar;

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

        for (let cube of cubes) {
            let cube_div = this.ui.dom.createElement("div");
            cube_div.classList.add(cube);
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
        this.items.push(new UIItem(this.itemsContainer, 16, 16, 400, 1, "diamond_helmet"));
        this.items.push(new UIItem(this.itemsContainer, 16, 52, 400, 1, "diamond_chestplate"));
        this.items.push(new UIItem(this.itemsContainer, 16, 88, 400, 1, "diamond_leggings"));
        this.items.push(new UIItem(this.itemsContainer, 16, 124, 400, 1, "diamond_boots"));

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

        this.items[37].setItem({"texture": "wooden_pickaxe", amount: 1});
        this.items[38].setItem({"texture": "wooden_sword", amount: 1});
        this.items[39].setItem({"texture": "wooden_axe", amount: 1});
        this.items[40].setItem({"texture": "wooden_shovel", amount: 1});
        this.items[41].setItem({"texture": "wooden_hoe", amount: 1});
        this.items[42].setItem({"texture": "", amount: 0});
        this.items[43].setItem({"texture": "leather", amount: 2});
        this.items[44].setItem({"texture": "beef", amount: 3});
        this.items[45].setItem({"texture": "", amount: 0});
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
            } 
            
            .inventory_container {
                position: absolute;
                top: calc(50vh - 166px);
                left: calc(50vw - 176px);
                width: 352px;
                height: 332px;
                z-index: 5;
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
            
            /* player */
            
            .inventory_container .player {
                position: absolute;
                top: -310px;
                left: -100px;
                height: 800px;
                width: 400px;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
                transform: scale(0.15);
            }
    
            .inventory_container .player:hover {
                transform: scale(0.15) rotateX(-40deg) rotateY(40deg);
            }
    
            .inventory_container .player:hover .head {
                transform: rotateY(20deg);
            }
            
            .inventory_container .player .arm-right {
                transform: rotate(-4deg) translateX(-7px);
            }
    
            .inventory_container .player:hover .arm-right {
                transform: rotateX(20deg);
            }
            
            .inventory_container .player .arm-left {
                transform: rotate(4deg) translateX(7px);
            }
            .inventory_container .player:hover .arm-left {
                transform: rotateX(-20deg);
            }
    
            .inventory_container .player:hover .leg-left {
                transform: rotateX(20deg);
            }
    
            .inventory_container .player:hover .leg-right {
                transform: rotateX(-20deg);
            }
    
            .inventory_container .player span {
                display: block;
                position: absolute;
                background-image: url("steve.png");
                background-size: 1600px 1600px;
                image-rendering: pixelated;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
    
            .inventory_container .player .head {
                position: absolute;
                height: 200px;
                width: 200px;
                left: 100px;
                top: 0;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
            .inventory_container .player .head span.top     { transform: rotateX( 90deg) translateZ(100px); background-position: -200px 0; }
            .inventory_container .player .head span.bottom  { transform: rotateX(-90deg) translateZ(100px); background-position: -400px 0; }
            .inventory_container .player .head span.left    { transform: rotateY(-90deg) translateZ(100px); background-position: 0 -200px; }
            .inventory_container .player .head span.right   { transform: rotateY( 90deg) translateZ(100px); background-position: -400px -200px; }
            .inventory_container .player .head span.front   { transform: rotateY(  0deg) translateZ(100px); background-position: -200px -200px; }
            .inventory_container .player .head span.back    { transform: rotateY(180deg) translateZ(100px); background-position: -600px -200px; }
    
    
            .inventory_container .player .body {
                position: absolute;
                height: 300px;
                width: 200px;
                left: 100px;
                top: 200px;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
            .inventory_container .player .body span.top     { transform: rotateX( 90deg) translateZ(50px); background-position: -500px -400px; height: 100px}
            .inventory_container .player .body span.bottom  { transform: rotateX(-90deg) translateZ(250px); background-position: -700px -400px; height: 100px }
            .inventory_container .player .body span.left    { transform: rotateY(-90deg) translateZ(50px); background-position: -400px -500px; width: 100px }
            .inventory_container .player .body span.right   { transform: rotateY( 90deg) translateZ(150px); background-position: -700px -500px; width: 100px }
            .inventory_container .player .body span.front   { transform: rotateY(  0deg) translateZ(50px); background-position: -500px -500px; }
            .inventory_container .player .body span.back    { transform: rotateY(180deg) translateZ(50px); background-position: -800px -500px; }
    
    
            .inventory_container .player .arm-left {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 0;
                top: 0;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
            .inventory_container .player .arm-left span.top     { transform: rotateX( 90deg) translateZ(-150px) ; background-position: -1100px -400px; height: 100px}
            .inventory_container .player .arm-left span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -1200px -400px; height: 100px }
            .inventory_container .player .arm-left span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -1000px -500px; width: 100px }
            .inventory_container .player .arm-left span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px); background-position: -1200px -500px; width: 100px }
            .inventory_container .player .arm-left span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -1100px -500px; }
            .inventory_container .player .arm-left span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -1300px -500px; }
    
    
            .inventory_container .player .arm-right {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 300px;
                top: 0;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
    
            .inventory_container .player .arm-right span.top     { transform: rotateX( 90deg) translateZ(-150px) ; background-position: -1100px -400px; height: 100px}
            .inventory_container .player .arm-right span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -1200px -400px; height: 100px }
            .inventory_container .player .arm-right span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -1200px -500px; width: 100px }
            .inventory_container .player .arm-right span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px) scaleX(-1); background-position: -1000px -500px; width: 100px }
            .inventory_container .player .arm-right span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -1100px -500px; }
            .inventory_container .player .arm-right span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -1300px -500px; }
    
            .inventory_container .player .leg-left {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 100px;
                top: 300px;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
            .inventory_container .player .leg-left span.top     { transform: rotateX( 90deg) translateZ(-150px); background-position: -100px -400px; height: 100px}
            .inventory_container .player .leg-left span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -200px -400px; height: 100px }
            .inventory_container .player .leg-left span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: 0 -500px; width: 100px }
            .inventory_container .player .leg-left span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px); background-position: -200px -500px; width: 100px }
            .inventory_container .player .leg-left span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -100px -500px; }
            .inventory_container .player .leg-left span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -300px -500px; }
    
    
            .inventory_container .player .leg-right {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 200px;
                top: 300px;
                transform-style: preserve-3d;
                transition: ease all 0.5s;
            }
            .inventory_container .player .leg-right span.top     { transform: rotateX( 90deg) translateZ(-150px); background-position: -100px -400px; height: 100px}
            .inventory_container .player .leg-right span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -200px -400px; height: 100px }
            .inventory_container .player .leg-right span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -200px -500px; width: 100px }
            .inventory_container .player .leg-right span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px) scaleX(-1); background-position: 0 -500px; width: 100px; }
            .inventory_container .player .leg-right span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -100px -500px; }
            .inventory_container .player .leg-right span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -300px -500px; }
        `;
        this.element.appendChild(this.stylesheet);
    }
}