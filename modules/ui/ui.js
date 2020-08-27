class UI {
    constructor(dom, parent_element) {
        this.dom = dom;
        this.createUI();

        this.createStylesheet();
        this.createBlackOverlay();

        this.appendUI(parent_element);
    }

    createUI() {
        this.element = this.dom.createElement("div");
        this.element.id = "ui";
        this.element.classList.add("ui");
    }

    appendUI(element) {
        if (this.dom.getElementById("ui")) {
            this.dom.getElementById("ui").remove()
        }
        element.appendChild(this.element);
        this.dom_element = document.getElementById(this.element.id);
    }

    createStylesheet() {
        this.stylesheet = this.dom.createElement("style");
        this.stylesheet.innerHTML = `
            .black_overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: black;
                opacity: 0.5;
                z-index: 98;
            }
            .black_overlay.active {
                display: block;
            }
            
            .widget {
                position: absolute;
                display: inline-block;
                background-image: url(minecraft/textures/gui/widgets.png);
                background-size: 512px 512px;
                image-rendering: pixelated;
            }
            
            /* text css */
            
            .standard_text {
                position: absolute;
                z-index: 2;
                color: white;
                padding: 0;
                margin: 0;
                font-size: 20px;
                text-shadow: 2px 2px #444
            }
            
            /* button css */
            
            .standard_button {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            
            .widget.standard_button_bg_left {
                position: absolute;
                top: 0;
                left: 0;
                background-position-y: -132px;
                height: 40px;
                width: 51%;
            }
            
            .widget.standard_button_bg_right {
                position: absolute;
                top: 0;
                right: 0;
                background-position-y: -132px;
                height: 40px;
                width: 50%;
            }
            
            .standard_button:hover .widget.standard_button_bg_right {
                background-position-y: -172px;
            }
            
            .standard_button:hover .widget.standard_button_bg_left {
                background-position-y: -172px;
            }
            
            .standard_button .standard_text {
                margin-bottom: 2px;
            }
            
            /* slider css */
            
            .standard_slider {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .widget.standard_slider_bg_left {
                position: absolute;
                top: 0;
                left: 0;
                background-position-y: -92px;
                height: 40px;
                width: 51%;
            }
            
            .widget.standard_slider_bg_right {
                position: absolute;
                top: 0;
                right: 0;
                background-position-y: -92px;
                height: 40px;
                width: 50%;
            }
            
            .standard_slider:hover .standard_button .standard_button_bg_left {
                background-position-y: -172px;
            }
        
            .standard_slider:hover .standard_button .standard_button_bg_right {
                background-position-y: -172px;
            }
            
            .standard_slider .standard_text {
                margin-bottom: 2px;
            }
            
            .standard_slider .standard_button {
                z-index: 1;
            }
            
            .standard_slider_input {
                -webkit-appearance: none;  /* Override default CSS styles */
                appearance: none;
                z-index: 1;
                width: 100%;
                background: none;
                height: 100%;
        
                cursor: pointer; /* Cursor on hover */
            }
        
            .standard_slider_input p {
                z-index: 5;
            }
        
            .standard_slider_input::-webkit-slider-thumb {
                z-index: 1;
        
                height: 40px;
                width: 15px;
        
                -webkit-appearance: none; /* Override default look */
                appearance: none;
                visibility: hidden;
            }
            
            /* item css */
            
            .standard_item {
                position: absolute;
                display: block;
                height: 32px;
                width: 32px;
            }
            
            .standard_item .item_hover_overlay {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #bbb;
                visibility: hidden;
            }
            
            .standard_item:hover .item_hover_overlay {
                visibility: visible;
            }
            
            .standard_item .item_image {
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                background-size: cover;
                height: 32px;
                width: 32px;
                image-rendering: pixelated;
            }
            
            .standard_item .item_amount {
                position: absolute;
                bottom: -6px;
                right: -2px;
                margin: 0;
                padding: 0;
            }
        `;
        this.element.appendChild(this.stylesheet);
    }

    createItem(parentElement, x, y, id="", amount = 1, texture="") {
        let item_el = this.dom.createElement("div");
        item_el.classList.add("standard_item");
        item_el.id = id;
        item_el.style.left = `${x}px`;
        item_el.style.top = `${y}px`;

        let item_hover_overlay = this.dom.createElement("span");
        item_hover_overlay.id = `${id}:item_hover_overlay`;
        item_hover_overlay.classList.add("item_hover_overlay");
        item_el.appendChild(item_hover_overlay);

        let item_image = this.dom.createElement("span");
        item_image.id = `${id}:item_image`;
        item_image.classList.add("item_image");
        item_image.style.backgroundImage = `url(minecraft/textures/item/${texture}.png)`;
        item_el.appendChild(item_image);

        let item_amount = this.dom.createElement("p");
        item_amount.id = `${id}:item_amount`;
        item_amount.classList.add("item_amount");
        item_amount.classList.add("standard_text");
        
        if (amount === 1) {
            item_amount.innerHTML = "";
        } else {
            item_amount.innerHTML = amount.toString();
        }

        item_el.appendChild(item_amount);

        parentElement.appendChild(item_el);
        return item_el
    }

    createBlackOverlay() {
        this.black_overlay = this.dom.createElement("span");
        this.black_overlay.id = "black_overlay";
        this.black_overlay.classList.add("black_overlay");
        this.element.appendChild(this.black_overlay);
    }

    showBlackOverlay() {
        this.dom.getElementById("black_overlay").classList.add("active");
    }

    hideBlackOverlay() {
        this.dom.getElementById("black_overlay").classList.remove("active");
    }

    createButton(parentElement, x, y, width, id="", text="") {
        let button = this.dom.createElement("div");
        button.classList.add("standard_button");
        button.style.top = `${y}px`;
        button.style.left = `${x}px`;
        button.style.width = `${width}px`;
        button.style.height = '40px';
        button.id = id;

        let button_text = this.dom.createElement("p");
        button_text.innerText = text;
        button_text.classList.add("standard_text");
        button.appendChild(button_text);

        let button_bg_left = this.dom.createElement("span");
        button_bg_left.classList.add("widget");
        button_bg_left.classList.add("standard_button_bg_left");
        button.appendChild(button_bg_left);

        let button_bg_right = this.dom.createElement("span");
        button_bg_right.classList.add("widget");
        button_bg_right.classList.add("standard_button_bg_right");
        button_bg_right.style.backgroundPositionX = `${-400 + width/2}px`;
        button.appendChild(button_bg_right);

        parentElement.appendChild(button);

        return button
    }


    releaseCursor() {

    }

    captureCursor() {

    }

    updateSize() {

    }

    exitFullscreen() {
        this.dom.exitFullscreen().then(result => {
            this.updateSize();
        })
    }

    enterFullscreen() {
        this.dom.documentElement.requestFullscreen().then(result => {
            this.updateSize();
        })
    }

    toggleFullscreen() {
        if (document.fullscreen) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen()
        }
    }
}
