class UIBase {
    constructor(ui) {
        this.ui = ui;
        this.state = false;
        this.UIelements = {};
        this.createReusableCSS();
    }

    createReusableCSS() {
        //DO CHECK TO SEE IF ALREADY EXISTS
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
        .ui_screen {
            display: none;
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 5;
        }
        
        .ui_screen.active {
            display: flex;
            visibility: visible;
        }

        .ui_container {
            margin-top: 150px;
            height: 240px;
            position: relative;
            width: 500px;
        }
        `;
        this.ui.dom.getElementsByTagName('body')[0].appendChild(this.stylesheet);
    }

    createEl(name, dom = this.ui.dom) {
        this.element = dom.createElement("div");
        this.element.id = name;
        this.element.classList.add(name);

        this.ui.screens.push(this);

        this.extraCreate();
    }

    addEl(parentEl = this.ui.dom_element) {
        if (!parentEl.contains(this.element)) {
            parentEl.appendChild(this.element)
        }
    }

    show(background='overlay') {
        this.state = true;

        this.ui.releaseCursor();
        this.ui.showBlackOverlay();

        this.element.classList.add("active");

        this.extraShow();
    }

    hide(captureCursor=true) {
        this.state = false;

        this.element.classList.remove("active");

        ui.hideBlackOverlay();

        if (captureCursor) {
            ui.captureCursor();
        }

        this.extraHide();
    }

    extraShow() {

    }

    extraHide() {

    }

    extraCreate() {

    }

    toggle() {
        if (this.state) {
            this.ui.closeAllScreens();
        } else {
            this.ui.openScreen(this.element.id);
        }
    }
}