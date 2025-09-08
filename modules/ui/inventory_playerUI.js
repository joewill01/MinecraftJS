class PlayerInventoryUI extends UIBase {
	constructor(ui, player_inventory, hotbar) {
		super(ui);

		this.player_inventory = player_inventory;
		this.hotbar = hotbar;

		this.ui_items = [];

        this.createEl(`inventoryPlayer`);
		this.createStylesheet();
		this.createUIItems();
		this.createPlayerModel();
		this.addEl();

	}

	extraCreate() {
        this.container = this.ui.dom.createElement("div");
        this.container.id = "inventoryPlayer_container";
        this.container.classList.add("inventoryPlayer_container");
        this.element.appendChild(this.container);

        this.containerImage = this.ui.dom.createElement("span");
        this.containerImage.id = "inventoryPlayer_containerImage";
        this.containerImage.classList.add("inventoryPlayer_containerImage");
        this.container.appendChild(this.containerImage);

        this.itemsContainer = this.ui.dom.createElement("div");
        this.itemsContainer.id = "inventoryPlayer_itemsContainer";
        this.itemsContainer.classList.add("inventoryPlayer_itemsContainer");
        this.container.appendChild(this.itemsContainer);

    }

	createUIItems() {
        // hotbar
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[0], 16, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[1], 52, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[2], 88, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[3], 124, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[4], 160, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[5], 196, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[6], 232, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[7], 268, 284, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[8], 304, 284, 400));

        // item row 1
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[9], 16, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[10], 52, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[11], 88, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[12], 124, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[13], 160, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[14], 196, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[15], 232, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[16], 268, 168, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[17], 304, 168, 400));

        // item row 2
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[18], 16, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[19], 52, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[20], 88, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[21], 124, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[22], 160, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[23], 196, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[24], 232, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[25], 268, 204, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[26], 304, 204, 400));

        // item row 3
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[27], 16, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[28], 52, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[29], 88, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[30], 124, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[31], 160, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[32], 196, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[33], 232, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[34], 268, 240, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[35], 304, 240, 400));

        // helmet
		this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[36], 16, 16, 400));

		// chestplate
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[37], 16, 52, 400));

        // leggings
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[38], 16, 88, 400));

        // boots
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[39], 16, 124, 400));

        // offhand
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[40], 154, 124, 400));

        // crafting
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[41], 196, 36, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[42], 232, 36, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[43], 196, 72, 400));
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[44], 232, 72, 400));

        // crafting result
        this.ui_items.push(new UIItem(this.itemsContainer, this.player_inventory.item_slots[45], 308, 56, 400));

        // mirror to UIItems on the actual hotbar
        this.ui_items[0].mirrorTo(this.hotbar.items[0]);
        this.ui_items[1].mirrorTo(this.hotbar.items[1]);
        this.ui_items[2].mirrorTo(this.hotbar.items[2]);
        this.ui_items[3].mirrorTo(this.hotbar.items[3]);
        this.ui_items[4].mirrorTo(this.hotbar.items[4]);
        this.ui_items[5].mirrorTo(this.hotbar.items[5]);
        this.ui_items[6].mirrorTo(this.hotbar.items[6]);
        this.ui_items[7].mirrorTo(this.hotbar.items[7]);
        this.ui_items[8].mirrorTo(this.hotbar.items[8]);
	}

    createPlayerModel(x=10, y=10) {
        this.player_model = this.ui.dom.createElement("div");
        this.player_model.id = "inventoryPlayer_playerModel";
        this.player_model.classList.add("player");
        this.container.appendChild(this.player_model);

        let cubes = ["head", "arm-left", "arm-right", "body", "leg-left", "leg-right"];
        let sides = ["top", "bottom", "left", "right", "front", "back"];

        this.player_model_elements = {};

        for (let cube of cubes) {
            let cube_div = this.ui.dom.createElement("div");
            cube_div.classList.add(cube);
            this.player_model_elements[`${cube}`] = cube_div;
            for (let side of sides) {
                let side_span = this.ui.dom.createElement("span");
                side_span.classList.add(side);
                cube_div.appendChild(side_span);
            }
            this.player_model.appendChild(cube_div);
    	}	
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

        if (this.player_model) {
            this.player_model.style.transform = `scale(0.15) rotateX(${angleBodyX}deg) rotateY(${angleBodyY}deg)`;
            this.player_model_elements['head'].style.transform = `rotateX(${angleHeadX}deg) rotateY(${angleHeadY}deg)`;
        }
    }

	createStylesheet() {
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
           .inventoryPlayer {
                display: none;
                visibility: hidden;
                height: 100vh;
                width: 100vw;
                z-index: 5;
            }
            
            .inventoryPlayer.active {
                display: inline;
                visibility: visible;
            } 

        	.inventoryPlayer_container {
                position: absolute;
                top: calc(50vh - 166px);
                left: calc(50vw - 176px);
                width: 352px;
                height: 332px;
                z-index: 5;
            }
            
            .inventoryPlayer_containerImage {
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
            
            .inventoryPlayer_itemsContainer {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }
            /* player */
            
            @keyframes swayArmR {
                0% {transform: rotate(0deg) translateX(0);}
                100% {transform: rotate(-6deg) translateX(-8px);}
            }
            
            @keyframes swayArmL {
                0% {transform: rotate(0deg) translateX(0);}
                100% {transform: rotate(6deg) translateX(8px);}
            }
            
            .inventoryPlayer_container .player {
                position: absolute;
                top: -310px;
                left: -100px;
                height: 800px;
                width: 400px;
                transform-style: preserve-3d;
                transform: scale(0.15);
            }
    
            .inventoryPlayer_container .player .arm-right {
                animation-name: swayArmR;
                animation-duration: 2s;
                animation-iteration-count:infinite;
                animation-direction: alternate;
                animation-timing-function: ease-in-out;
            }
    
            .inventoryPlayer_container .player .arm-left {
                animation-name: swayArmL;
                animation-duration: 2s;
                animation-iteration-count:infinite;
                animation-direction: alternate;
                animation-timing-function: ease-in-out;
            }
           
            .inventoryPlayer_container .player span {
                display: block;
                position: absolute;
                background-image: url("./honeydew.png");
                background-size: 1600px 800px;
                image-rendering: pixelated;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
    
            .inventoryPlayer_container .player .head {
                position: absolute;
                height: 200px;
                width: 200px;
                left: 100px;
                top: 0;
                transform-style: preserve-3d;
            }
            .inventoryPlayer_container .player .head span.top     { transform: rotateX( 90deg) translateZ(100px); background-position: -200px 0; }
            .inventoryPlayer_container .player .head span.bottom  { transform: rotateX(-90deg) translateZ(100px); background-position: -400px 0; }
            .inventoryPlayer_container .player .head span.left    { transform: rotateY(-90deg) translateZ(100px); background-position: 0 -200px; }
            .inventoryPlayer_container .player .head span.right   { transform: rotateY( 90deg) translateZ(100px); background-position: -400px -200px; }
            .inventoryPlayer_container .player .head span.front   { transform: rotateY(  0deg) translateZ(100px); background-position: -200px -200px; }
            .inventoryPlayer_container .player .head span.back    { transform: rotateY(180deg) translateZ(100px); background-position: -600px -200px; }
    
    
            .inventoryPlayer_container .player .body {
                position: absolute;
                height: 300px;
                width: 200px;
                left: 100px;
                top: 200px;
                transform-style: preserve-3d;
            }
            .inventoryPlayer_container .player .body span.top     { transform: rotateX( 90deg) translateZ(50px); background-position: -500px -400px; height: 100px}
            .inventoryPlayer_container .player .body span.bottom  { transform: rotateX(-90deg) translateZ(250px); background-position: -700px -400px; height: 100px }
            .inventoryPlayer_container .player .body span.left    { transform: rotateY(-90deg) translateZ(50px); background-position: -400px -500px; width: 100px }
            .inventoryPlayer_container .player .body span.right   { transform: rotateY( 90deg) translateZ(150px); background-position: -700px -500px; width: 100px }
            .inventoryPlayer_container .player .body span.front   { transform: rotateY(  0deg) translateZ(50px); background-position: -500px -500px; }
            .inventoryPlayer_container .player .body span.back    { transform: rotateY(180deg) translateZ(50px); background-position: -800px -500px; }
    
    
            .inventoryPlayer_container .player .arm-left {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 0;
                top: 0;
                transform-style: preserve-3d;
            }
            .inventoryPlayer_container .player .arm-left span.top     { transform: rotateX( 90deg) translateZ(-150px) ; background-position: -1100px -400px; height: 100px}
            .inventoryPlayer_container .player .arm-left span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -1200px -400px; height: 100px }
            .inventoryPlayer_container .player .arm-left span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -1000px -500px; width: 100px }
            .inventoryPlayer_container .player .arm-left span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px); background-position: -1200px -500px; width: 100px }
            .inventoryPlayer_container .player .arm-left span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -1100px -500px; }
            .inventoryPlayer_container .player .arm-left span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -1300px -500px; }
    
    
            .inventoryPlayer_container .player .arm-right {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 300px;
                top: 0;
                transform-style: preserve-3d;
            }
    
            .inventoryPlayer_container .player .arm-right span.top     { transform: rotateX( 90deg) translateZ(-150px) ; background-position: -1100px -400px; height: 100px}
            .inventoryPlayer_container .player .arm-right span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -1200px -400px; height: 100px }
            .inventoryPlayer_container .player .arm-right span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -1200px -500px; width: 100px }
            .inventoryPlayer_container .player .arm-right span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px) scaleX(-1); background-position: -1000px -500px; width: 100px }
            .inventoryPlayer_container .player .arm-right span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -1100px -500px; }
            .inventoryPlayer_container .player .arm-right span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -1300px -500px; }
    
            .inventoryPlayer_container .player .leg-left {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 100px;
                top: 300px;
                transform-style: preserve-3d;
            }
            .inventoryPlayer_container .player .leg-left span.top     { transform: rotateX( 90deg) translateZ(-150px); background-position: -100px -400px; height: 100px}
            .inventoryPlayer_container .player .leg-left span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -200px -400px; height: 100px }
            .inventoryPlayer_container .player .leg-left span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: 0 -500px; width: 100px }
            .inventoryPlayer_container .player .leg-left span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px); background-position: -200px -500px; width: 100px }
            .inventoryPlayer_container .player .leg-left span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -100px -500px; }
            .inventoryPlayer_container .player .leg-left span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -300px -500px; }
    
    
            .inventoryPlayer_container .player .leg-right {
                position: absolute;
                height: 300px;
                width: 100px;
                left: 200px;
                top: 300px;
                transform-style: preserve-3d;
            }
            .inventoryPlayer_container .player .leg-right span.top     { transform: rotateX( 90deg) translateZ(-150px); background-position: -100px -400px; height: 100px}
            .inventoryPlayer_container .player .leg-right span.bottom  { transform: rotateX(-90deg) translateZ(450px); background-position: -200px -400px; height: 100px }
            .inventoryPlayer_container .player .leg-right span.left    { transform: rotateY(-90deg) translateZ(50px) translateY(200px); background-position: -200px -500px; width: 100px }
            .inventoryPlayer_container .player .leg-right span.right   { transform: rotateY( 90deg) translateZ(50px) translateY(200px) scaleX(-1); background-position: 0 -500px; width: 100px; }
            .inventoryPlayer_container .player .leg-right span.front   { transform: rotateY(  0deg) translateZ(50px) translateY(200px); background-position: -100px -500px; }
            .inventoryPlayer_container .player_model .leg-right span.back    { transform: rotateY(180deg) translateZ(50px) translateY(200px); background-position: -300px -500px; }
        `;
        this.element.appendChild(this.stylesheet);
    }
}