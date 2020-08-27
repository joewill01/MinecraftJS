class PauseMenu extends UIBase {
    constructor(ui) {
        super(ui);
        this.UIelements = {};

        this.createEl("pause_menu");

        this.createStylesheet();
        this.createMainScreen();
        this.createOptionsScreen();

        this.addEl();

        this.show()

    }

    extraCreate() {
        // this runs AS WELL AS creating this.element
        console.log("Pause menu created")
    }

    extraShow() {
        // this runs AS WELL AS showing this.element
        this.openScreen(this.main_screen)
    }

    extraHide() {
        // this runs AS WELL AS hiding this.element
        this.closeAllScreens()
    }

    createStylesheet() {
        this.stylesheet = this.ui.dom.createElement("style");
        this.stylesheet.innerHTML = `
        .pause_menu {
            display: none;
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            z-index: 99;
        }
        
        .pause_menu.active {
            display: flex;
            visibility: visible;
        }
        
        .screen {
            margin-top: 150px;
            height: 240px;
            position: relative;
            display: none;
        }
       
        .screen.active {
            display: grid;
        }
        
        .screen.main {
            width: 400px;
        }
        
        .screen.options {
            width: 600px;
        }
        /*
        .screen.main {
            grid-template-columns: 200px 200px;
            grid-template-rows: 50px 50px 50px 50px 40px;
        }
        
        .screen.main .standard_button:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
        
        .screen.main .standard_button:nth-child(2) {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
        }
        
        .screen.main .standard_button:nth-child(3) {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            margin-left: 5px;
        }
        
        .screen.main .standard_button:nth-child(4) {
            grid-column: 1 / 3;
            grid-row: 4 / 5;
        }
        
        .screen.main .standard_button:nth-child(5) {
            grid-column: 1 / 3;
            grid-row: 5 / 6;
        }
           */ 
        `;
        this.element.appendChild(this.stylesheet);
    }

    createMainScreen() {
        this.main_screen = this.ui.dom.createElement("div");
        this.element.appendChild(this.main_screen);
        this.main_screen.id = "pause_menu-main_screen";
        this.main_screen.classList.add("screen");
        this.main_screen.classList.add("main");
        this.screens.push(this.main_screen);


        this.UIelements["main_screen"] = {};

        //make ui buttons
        this.UIelements["main_screen"]["buttons"] = {};
        this.UIelements["main_screen"]["buttons"]["back_to_game"] = new UIButton(this.main_screen, 0, 0, 400,"pause_menu-main_screen-back_to_game", "Back to Game");
        this.UIelements["main_screen"]["buttons"]["achievements"] = new UIButton(this.main_screen, 0, 50, 195,"pause_menu-main_screen-achievements", "Achievements");
        this.UIelements["main_screen"]["buttons"]["statistics"]  = new UIButton(this.main_screen, 205, 50, 195,"pause_menu-main_screen-statistics", "Statistics");
        this.UIelements["main_screen"]["buttons"]["options"]  = new UIButton(this.main_screen, 0, 150, 400,"pause_menu-main_screen-options", "Options...");
        this.UIelements["main_screen"]["buttons"]["quit"]  = new UIButton(this.main_screen, 0, 200, 400,"pause_menu-main_screen-quit", "Save and Quit to Title");

        //make ui texts
        this.UIelements["main_screen"]["texts"] = {};
        this.UIelements["main_screen"]["texts"]["title"]  = new UIText(this.main_screen, 150, -60, "pause_menu-main_screen-title", "Game menu");

        //set onclick/onchange/hover functions
        this.UIelements["main_screen"]["buttons"]["back_to_game"].onclick = () => {this.hide()};
        this.UIelements["main_screen"]["buttons"]["quit"].onclick = () => {this.ui.exitFullscreen()};
        this.UIelements["main_screen"]["buttons"]["options"].onclick = () => {this.openScreen(this.options_screen)};
    }

    createOptionsScreen() {
        this.options_screen = this.ui.dom.createElement("div");
        this.element.appendChild(this.options_screen);
        this.options_screen.id = "pause_menu-options_screen";
        this.options_screen.classList.add("screen");
        this.options_screen.classList.add("options");
        this.screens.push(this.options_screen);

        this.UIelements["options_screen"] = {};

        //make ui buttons
        this.UIelements["options_screen"]["buttons"] = {};
        this.UIelements["options_screen"]["buttons"]["difficulty"] = new UIButton(this.options_screen, 305, 0, 295,"pause_menu-options_screen-difficulty", "Difficulty: Easy");
        this.UIelements["options_screen"]["buttons"]["skin_customization"] = new UIButton(this.options_screen, 0, 100, 295,"pause_menu-options_screen-skin_customization", "Skin Customization...");
        this.UIelements["options_screen"]["buttons"]["music_and_sounds"] = new UIButton(this.options_screen, 305, 100, 295,"pause_menu-options_screen-music_and_sounds", "Music & Sounds...");
        this.UIelements["options_screen"]["buttons"]["video_settings"] = new UIButton(this.options_screen, 0, 150, 295,"pause_menu-options_screen-video_settings", "Video Settings...");
        this.UIelements["options_screen"]["buttons"]["controls"] = new UIButton(this.options_screen, 305, 150, 295,"pause_menu-options_screen-controls", "Controls...");
        this.UIelements["options_screen"]["buttons"]["language"] = new UIButton(this.options_screen, 0, 200, 295,"pause_menu-options_screen-language", "Language...");
        this.UIelements["options_screen"]["buttons"]["chat_settings"] = new UIButton(this.options_screen, 305, 200, 295,"pause_menu-options_screen-chat_settings", "Chat Settings...");
        this.UIelements["options_screen"]["buttons"]["resource_packs"] = new UIButton(this.options_screen, 0, 250, 295,"pause_menu-options_screen-resource_packs", "Resource Packs...");
        this.UIelements["options_screen"]["buttons"]["accessibility_settings"] = new UIButton(this.options_screen, 305, 250, 295,"pause_menu-options_screen-accessibility_settings", "Accessibility Settings...");
        this.UIelements["options_screen"]["buttons"]["done"] = new UIButton(this.options_screen, 100, 350, 400,"pause_menu-options_screen-done", "Done");

        //make ui texts
        this.UIelements["options_screen"]["texts"] = {};
        this.UIelements["options_screen"]["texts"]["title"] =  new UIText(this.options_screen, 265, -60, "pause_menu-main_screen-title", "Options");

        //make ui sliders
        this.UIelements["options_screen"]["sliders"] = {};
        this.UIelements["options_screen"]["sliders"]["fov"] = new UISlider(this.options_screen, 0, 0, 295, 30, 110, 70, "pause_menu-options_screen-fov", "FOV: ^//^");

        //set onclick/onchange/hover functions
        this.UIelements["options_screen"]["buttons"]["done"].onclick = () => {this.openScreen(this.main_screen)};
        this.UIelements["options_screen"]["sliders"]["fov"].onchange = (value) => {console.log(`FOV set to ${value.toString()}`)}
    }
}
