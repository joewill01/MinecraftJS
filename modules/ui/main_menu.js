class MainMenu extends UIBase {
    constructor(ui) {
        super(ui);
        this.UIelements = {};

        this.createEl("main_menu");
        this.element.classList.add("ui_screen")

        this.createStylesheet();
        this.createScreen();

        this.addEl();
    }

    extraCreate() {
        // this runs AS WELL AS creating this.element
    }

    extraShow() {
        // this runs AS WELL AS showing this.element
    }

    extraHide() {
        // this runs AS WELL AS hiding this.element
    }

    createStylesheet() {
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
        `;
        this.element.appendChild(this.stylesheet);
    }

    createScreen() {
        this.menu_container = this.ui.dom.createElement("div");
        this.element.appendChild(this.menu_container);
        this.menu_container.id = "main_menu";
        this.menu_container.classList.add("ui_menu_container");
        this.menu_container.classList.add("main");

    }
}