class PauseMenu extends UIBase {
    constructor(ui) {
        super(ui);

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

        this.main_screen_back_to_game_btn = this.ui.createButton(this.main_screen, 0, 0, 400,"pause_menu-main_screen-back_to_game", "Back to Game");
        this.main_screen_achievements_btn = this.ui.createButton(this.main_screen, 0, 50, 195,"pause_menu-main_screen-achievements", "Achievements");
        this.main_screen_statistics_btn = this.ui.createButton(this.main_screen, 205, 50, 195,"pause_menu-main_screen-statistics", "Statistics");
        this.main_screen_options_btn = this.ui.createButton(this.main_screen, 0, 150, 400,"pause_menu-main_screen-options", "Options...");
        this.main_screen_quit_btn = this.ui.createButton(this.main_screen, 0, 200, 400,"pause_menu-main_screen-quit", "Save and Quit to Title");
        this.main_screen_title_text = this.ui.createText(this.main_screen, 150, -60, "pause_menu-main_screen-title", "Game menu");

        this.main_screen_back_to_game_btn.onclick = () => {this.hide()};
        this.main_screen_quit_btn.onclick = () => {this.ui.exitFullscreen()};
        this.main_screen_options_btn.onclick = () => {this.openScreen(this.options_screen)};
    }

    createOptionsScreen() {
        this.options_screen = this.ui.dom.createElement("div");
        this.element.appendChild(this.options_screen);
        this.options_screen.id = "pause_menu-options_screen";
        this.options_screen.classList.add("screen");
        this.options_screen.classList.add("options");
        this.screens.push(this.options_screen);

        this.options_screen_fov_slider = this.ui.createButton(this.options_screen, 0, 0, 295,"pause_menu-options_screen-fov", "FOV");
        this.options_screen_difficulty_btn = this.ui.createButton(this.options_screen, 305, 0, 295,"pause_menu-options_screen-difficulty", "Difficulty: Easy");
        this.options_screen_skin_customization_btn = this.ui.createButton(this.options_screen, 0, 100, 295,"pause_menu-options_screen-skin_customization", "Skin Customization...");
        this.options_screen_music_and_sounds_btn = this.ui.createButton(this.options_screen, 305, 100, 295,"pause_menu-options_screen-music_and_sounds", "Music & Sounds...");
        this.options_screen_video_settings_btn = this.ui.createButton(this.options_screen, 0, 150, 295,"pause_menu-options_screen-video_settings", "Video Settings...");
        this.options_screen_controls_btn = this.ui.createButton(this.options_screen, 305, 150, 295,"pause_menu-options_screen-controls", "Controls...");
        this.options_screen_language_btn = this.ui.createButton(this.options_screen, 0, 200, 295,"pause_menu-options_screen-language", "Language...");
        this.options_screen_chat_settings_btn = this.ui.createButton(this.options_screen, 305, 200, 295,"pause_menu-options_screen-chat_settings", "Chat Settings...");
        this.options_screen_resource_packs_btn = this.ui.createButton(this.options_screen, 0, 250, 295,"pause_menu-options_screen-resource_packs", "Resource Packs...");
        this.options_screen_accessibility_settings_btn = this.ui.createButton(this.options_screen, 305, 250, 295,"pause_menu-options_screen-accessibility_settings", "Accessibility Settings...");
        this.options_screen_done_btn = this.ui.createButton(this.options_screen, 100, 350, 400,"pause_menu-options_screen-done", "Done");
        this.options_screen_title_text = this.ui.createText(this.options_screen, 265, -60, "pause_menu-main_screen-title", "Options");

        this.options_screen_done_btn.onclick = () => {this.openScreen(this.main_screen)};

        //this.options_screen_title_text.test()
    }
}
