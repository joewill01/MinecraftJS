class OptionsMenu extends UIBase {
    constructor(ui) {
        super(ui);
        this.UIelements = {};

        this.createEl("options_menu");
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
        this.menu_container.id = "options_menu";
        this.menu_container.classList.add("ui_menu_container");
        this.menu_container.classList.add("options");

        //make ui buttons
        this.UIelements["buttons"] = {};
        this.UIelements["buttons"]["difficulty"] = new UIButton(this.menu_container, 305, 0, 295,"pause_menu-options_screen-difficulty", "Difficulty: Easy");
        this.UIelements["buttons"]["skin_customization"] = new UIButton(this.menu_container, 0, 100, 295,"pause_menu-options_screen-skin_customization", "Skin Customization...");
        this.UIelements["buttons"]["music_and_sounds"] = new UIButton(this.menu_container, 305, 100, 295,"pause_menu-options_screen-music_and_sounds", "Music & Sounds...");
        this.UIelements["buttons"]["video_settings"] = new UIButton(this.menu_container, 0, 150, 295,"pause_menu-options_screen-video_settings", "Video Settings...");
        this.UIelements["buttons"]["controls"] = new UIButton(this.menu_container, 305, 150, 295,"pause_menu-options_screen-controls", "Controls...");
        this.UIelements["buttons"]["language"] = new UIButton(this.menu_container, 0, 200, 295,"pause_menu-options_screen-language", "Language...");
        this.UIelements["buttons"]["chat_settings"] = new UIButton(this.menu_container, 305, 200, 295,"pause_menu-options_screen-chat_settings", "Chat Settings...");
        this.UIelements["buttons"]["resource_packs"] = new UIButton(this.menu_container, 0, 250, 295,"pause_menu-options_screen-resource_packs", "Resource Packs...");
        this.UIelements["buttons"]["accessibility_settings"] = new UIButton(this.menu_container, 305, 250, 295,"pause_menu-options_screen-accessibility_settings", "Accessibility Settings...");
        this.UIelements["buttons"]["done"] = new UIButton(this.menu_container, 100, 350, 400,"pause_menu-options_screen-done", "Done");

        //make ui texts
        this.UIelements["texts"] = {};
        this.UIelements["texts"]["title"] =  new UIText(this.menu_container, 265, -60, "pause_menu-main_screen-title", "Options");

        //make ui sliders
        this.UIelements["sliders"] = {};
        this.UIelements["sliders"]["fov"] = new UISlider(this.menu_container, 0, 0, 295, 30, 110, 70, "pause_menu-options_screen-fov", "FOV: ^//^", {70: "Normal", 110: "Quake Pro"});

        //set onclick/onchange/hover functions
        this.UIelements["buttons"]["done"].onclick = () => {this.ui.openScreen("pause_menu")};
        this.UIelements["sliders"]["fov"].onchange = (value) => {player.changeBaseFOV(value)};
    }
}