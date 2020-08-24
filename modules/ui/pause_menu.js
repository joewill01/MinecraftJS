class PauseMenu extends UIBase {
    constructor(ui) {
        super();
        this.ui = ui;
        this.state = false;

        this.createEl("pause_menu");

        this.createStylesheet();
        this.createMainScreen();

        this.addEl();

    }

    extraCreate() {
        // this runs AS WELL AS creating this.element
        console.log("Pause menu created")
    }

    extraShow() {
        // this runs AS WELL AS showing this.element
        this.main_screen.classList.add("active");
    }

    extraHide() {
        // this runs AS WELL AS hiding this.element
        this.main_screen.classList.remove("active");
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
        
        .main_screen {
            margin-top: 150px;
            height: 240px;
            position: relative;
            display: none;
            grid-template-columns: 200px 200px;
            grid-template-rows: 50px 50px 50px 50px 40px;
        }
       
        .main_screen.active {
            display: grid;
        }
        
        .main_screen .standard_button:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
        
        .main_screen .standard_button:nth-child(2) {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
        }
        
        .main_screen .standard_button:nth-child(3) {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            margin-left: 5px;
        }
        
        .main_screen .standard_button:nth-child(4) {
            grid-column: 1 / 3;
            grid-row: 4 / 5;
        }
        
        .main_screen .standard_button:nth-child(5) {
            grid-column: 1 / 3;
            grid-row: 5 / 6;
        }
            
        `;
        this.element.appendChild(this.stylesheet);
    }

    createMainScreen() {
        this.main_screen = this.ui.dom.createElement("div");
        this.main_screen.id = "pause_menu-main_screen";
        this.main_screen.classList.add("main_screen");

        this.main_screen_back_to_game_btn = this.ui.createButton(this.main_screen, 0, 0, 400,"pause_menu-main_screen-back_to_game", "Back to Game");
        this.main_screen_achievements_btn = this.ui.createButton(this.main_screen, 0, 0, 195,"pause_menu-main_screen-achievements", "Achievements");
        this.main_screen_statistics_btn = this.ui.createButton(this.main_screen, 0, 0, 195,"pause_menu-main_screen-statistics", "Statistics");
        this.main_screen_options_btn = this.ui.createButton(this.main_screen, 0, 0, 400,"pause_menu-main_screen-options", "Options...");
        this.main_screen_quit_btn = this.ui.createButton(this.main_screen, 0, 0, 400,"pause_menu-main_screen-quit", "Save and Quit to Title");
        this.main_screen_title_text = this.ui.createText(this.main_screen, 150, -60, "pause_menu-main_screen-title", "Game menu");

        this.main_screen_back_to_game_btn.onclick = () => {this.hide()};
        this.main_screen_quit_btn.onclick = () => {this.ui.exitFullscreen()};

        this.element.appendChild(this.main_screen);
    }
}
