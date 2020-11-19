class PauseMenu extends UIBase {
    constructor(ui) {
        super(ui);

        this.createEl("pause_menu");
        this.element.classList.add("ui_screen")

        this.createStylesheet();
        this.createScreen();

        this.addEl();
    }

    extraCreate() {
        // this runs AS WELL AS creating this.element
        // console.log("Pause menu created")
    }

    extraShow() {
        // this runs AS WELL AS showing this.element
        // this.openScreen(this.main_screen)
    }

    extraHide() {
        // this runs AS WELL AS hiding this.element
        // this.closeAllScreens()
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
        this.menu_container.id = "pause_menu";
        this.menu_container.classList.add("ui_menu_container");
        this.menu_container.classList.add("pause");

        this.UIelements = {};

        //make ui buttons
        this.UIelements["buttons"] = {};
        this.UIelements["buttons"]["back_to_game"] = new UIButton(this.menu_container, 0, 0, 400,"pause_menu-main_screen-back_to_game", "Back to Game");
        this.UIelements["buttons"]["achievements"] = new UIButton(this.menu_container, 0, 50, 195,"pause_menu-main_screen-achievements", "Achievements");
        this.UIelements["buttons"]["statistics"]  = new UIButton(this.menu_container, 205, 50, 195,"pause_menu-main_screen-statistics", "Statistics");
        this.UIelements["buttons"]["options"]  = new UIButton(this.menu_container, 0, 150, 400,"pause_menu-main_screen-options", "Options...");
        this.UIelements["buttons"]["quit"]  = new UIButton(this.menu_container, 0, 200, 400,"pause_menu-main_screen-quit", "Save and Quit to Title");

        //make ui texts
        this.UIelements["texts"] = {};
        this.UIelements["texts"]["title"]  = new UIText(this.menu_container, 150, -60, "pause_menu-main_screen-title", "Game menu");

        //set onclick/onchange/hover functions
        this.UIelements["buttons"]["back_to_game"].onclick = () => {this.hide()};
        this.UIelements["buttons"]["quit"].onclick = () => {this.ui.exitFullscreen()};
        this.UIelements["buttons"]["options"].onclick = () => {this.ui.openScreen("options_menu")};
    }
}
