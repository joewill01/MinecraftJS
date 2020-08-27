class UI {
    constructor(dom, parent_element) {
        this.dom = dom;
        this.createUI();

        this.createStylesheet();
        this.createBlackOverlay();

        this.appendUI(parent_element);

        this.hand = new UIItem(this.element, 0, 0, "hand", 1, "");
        this.hand.element.style.pointerEvents = "none";
        this.hand.item_hover_overlay.style.visibility = 'hidden';
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
                z-index: 3;
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
                -webkit-appearance: none;
                appearance: none;
                z-index: 1;
                width: 100%;
                background: none;
                height: 100%;
                
                z-index: 3;
        
                cursor: pointer;
            }
        
            .standard_slider_input p {
                z-index: 5;
            }
        
            .standard_slider_input::-webkit-slider-thumb {
                z-index: 1;
        
                height: 40px;
                width: 15px;
        
                -webkit-appearance: none;
                appearance: none;
                visibility: hidden;
            }
            
            /* item css */
            
            .standard_item {
                position: absolute;
                display: block;
                height: 32px;
                width: 32px;
                z-index: 10;
            }
            
            .standard_item .item_hover_overlay {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: #bbb;
                visibility: hidden;
                z-index: 10;
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
                z-index: 10;
            }
            
            .standard_item .item_amount {
                position: absolute;
                bottom: -6px;
                right: -2px;
                margin: 0;
                padding: 0;
                z-index: 10
            }
        `;
        this.element.appendChild(this.stylesheet);
    }

    addToHand(texture=0, amount=0) {
        this.hand.updateTexture(texture);
        this.hand.updateAmount(amount);
    }

    getFromHand() {

    }

    emptyHand() {

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
