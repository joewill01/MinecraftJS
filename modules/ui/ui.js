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
            
            .craft-text {
                position: absolute;
                z-index: 2;
                color: white;
                padding: 0;
                margin: 0;
                margin-bottom: 2px;
                font-size: 18px;
                text-shadow: 2px 2px #444
            }
            
            .widget {
                position: absolute;
                display: inline-block;
                background-image: url(minecraft/textures/gui/widgets.png);
                background-size: 512px 512px;
                image-rendering: pixelated;
            }
            
            .standard_button {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
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
            
        `;
        this.element.appendChild(this.stylesheet);
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
        button.style.top = y;
        button.style.left = x;
        button.style.width = `${width}px`;
        button.style.height = '40px';
        button.id = id;

        let button_text = this.dom.createElement("p");
        button_text.innerText = text;
        button_text.classList.add("craft-text");
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

    createText(parentElement, x=0, y=0, id="", text="") {
        let text_el = this.dom.createElement("p");
        text_el.innerText = text;
        text_el.id = id;
        text_el.style.top = `${y}px`;
        text_el.style.left = `${x}px`;
        text_el.classList.add("craft-text");
        parentElement.appendChild(text_el);

        return text_el
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