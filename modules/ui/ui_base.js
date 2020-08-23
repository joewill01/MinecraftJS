class UIBase {
    constructor(ui) {
        this.ui = ui;
        this.state = false;
    }

    createEl(name, dom = this.ui.dom) {
        this.element = dom.createElement("div");
        this.element.id = name;
        this.element.classList.add(name);

        this.extraCreate();
    }

    addEl(parentEl = this.ui.dom_element) {
        if (!parentEl.contains(this.element)) {
            parentEl.appendChild(this.element)
        }
    }

    show() {
        this.state = true;

        this.ui.releaseCursor();
        this.ui.showBlackOverlay();

        this.element.classList.add("active");

        this.extraShow();
    }

    hide() {
        this.state = false;

        this.element.classList.remove("active");

        ui.hideBlackOverlay();
        ui.captureCursor();

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
            this.hide();
        } else {
            this.show();
        }
    }
}