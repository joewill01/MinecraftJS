class UI {
    constructor(dom, parent_element) {
        this.dom = dom;
        this.screens = [];
        this.createUI();

        this.createStylesheet();
        this.createBlackOverlay();

        this.appendUI(parent_element);

        this.hand = new UIItem(this.element, 0, 0, "hand", 0, "");
        this.hand.element.style.pointerEvents = "none";
        this.hand.item_hover_overlay.style.visibility = 'hidden';
    }

    createUI() {
        this.element = this.dom.createElement("div");
        this.element.id = "ui";
        this.element.classList.add("ui");
    }

    closeAllScreens(captureCursor=true) {
        for (screen of this.screens) {
            screen.hide(captureCursor);
        }
    }

    openScreen(id) {
        for (let screen of this.screens) {
            if (screen.element.id === id) {
                console.log(screen);
                this.closeAllScreens(false);
                screen.show();
            }
        }
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
                opacity: 0.7;
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

            @keyframes flashy-yellow-text-animation {
              from {transform: rotate(-22deg) scale(1);}
              to {transform: rotate(-22deg) scale(1.05);}
            }

            .standard_text.flashy-yellow-text {
                transform: rotate(-22deg);
                color: yellow;
                animation-name: flashy-yellow-text-animation;
                animation-duration: 0.25s;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                white-space: nowrap
            }

            /* image css */
            
            .standard_image {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                image-rendering: pixelated;
            }

            .standard_image .image {
                position: absolute;
                display: block;
                background-size: cover;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            /* button css */
            
            .standard_button {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .standard_button.disabled {
                cursor: auto;
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

            .standard_button.disabled .widget.standard_button_bg_right {
                background-position-y: -92px;
            }

            .standard_button.disabled .widget.standard_button_bg_left {
                background-position-y: -92px;
            }
            
            .standard_button .standard_text {
                margin-bottom: 2px;
            }

            .standard_button.disabled .standard_text {
                color: #999;
                text-shadow: none
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

            /* skybox */

            @keyframes rotate {
                0% {transform: rotateY(0deg) translateZ(0);}
                100% {transform: rotateY(360deg) translateZ(0);}
            }

            .skybox {
                width: 100%;
                height: 100vh;
                overflow: hidden;
                -webkit-perspective: 100vh;
            }

            .skybox .position {
                position: relative;
                transform: translateZ(100vh);
                transform-style: preserve-3d;
            }

            .skybox .faces {
                position: relative;
                width: 0;
                height: 0;
                top: 50vh;
                margin: 0 auto;
                transform-style: preserve-3d;
                animation-name: rotate;
                animation-duration: 120s;
                animation-iteration-count:infinite;
                animation-timing-function: linear;
            }

            .skybox .faces img {
                position: absolute;
                display: block;
                width: 100vw;
                height: 100vw;
                left: -50vw;
                top: -50vw;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }

            .skybox .faces img:nth-child(1) {
                transform: rotate3d(0,1,0,180deg) translate3d(0,0,-49.9vw) scaleX(-1);
            }

            .skybox .faces img:nth-child(2) {
                transform: translate3d(49.9vw,0,0) rotate3d(0,1,0,-90deg) scaleX(-1);
            }

            .skybox .faces img:nth-child(3) {
                transform: translate3d(0,0,-49.9vw) scaleX(-1);
            }

            .skybox .faces img:nth-child(4) {
                transform: translate3d(-49.9vw,0,0) rotate3d(0,1,0,90deg) scaleX(-1);
            }

            /* dirt containers */

            .dirt-header {
                width: 100vw;
                height: 96px;
                background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('minecraft/textures/gui/options_background.png');
                image-rendering: pixelated;
                background-size: 64px 64px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .dirt-footer {
                width: 100vw;
                height: 128px;
                background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('minecraft/textures/gui/options_background.png');

                image-rendering: pixelated;
                background-size: 64px 64px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .dirt-scroll-container {
                width: 100vw;
                height: calc(100vh - 224px);
                background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.863), rgba(0, 0, 0, 0.863)), url('minecraft/textures/gui/options_background.png');

                image-rendering: pixelated;
                background-size: 64px 64px;

                box-shadow: 0px 5px 5px #000 inset, 0px -5px 5px #000 inset;

                overflow-y: auto;
                background-attachment:local;
            }

            .dirt-scroll-container::-webkit-scrollbar {
              width: 12px;
            }
             
            .dirt-scroll-container::-webkit-scrollbar-track {
                background-color: black;
                width:12px;
            }
             
            .dirt-scroll-container::-webkit-scrollbar-thumb {
              background-color: #bbb;
              box-shadow: #777 -2px -2px 0 0 inset;
                width:12px;
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
