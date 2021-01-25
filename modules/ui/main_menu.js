class MainMenu extends UIBase {
    constructor(ui) {
        super(ui);
        this.UIelements = {};

        this.createEl("main_menu");
        this.element.classList.add("ui_screen")

        this.createStylesheet();
        this.createScreen();

        this.addEl();
        this.show();
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
        .ui_screen.main_menu {
            
        }

        .ui_screen.main_menu .skybox {
            position: fixed;
            top: 0;
            left: 0
        }

        .ui_container.main_menu {
            margin-top: 75px;
            width: 450px;
        }

        .ui_container.logo {
            width: 548px;
            height: 90px;
            margin-top: 50px;
        }
        `;
        this.element.appendChild(this.stylesheet);
    }

    createScreen() {
        this.background_panorama = this.ui.dom.createElement('div');
        this.background_panorama.classList.add('skybox');
        this.background_panorama.innerHTML = `
          <div class="position">
            <div class="faces">
              <img src="minecraft/textures/gui/title/background/panorama_0.png" />
              <img src="minecraft/textures/gui/title/background/panorama_1.png" />
              <img src="minecraft/textures/gui/title/background/panorama_2.png" />
              <img src="minecraft/textures/gui/title/background/panorama_3.png" />
            </div>
          </div>
          `;

        this.element.appendChild(this.background_panorama);


        this.logo_container = makeUIContainer(this.element, 'logo')
        this.menu_container = makeUIContainer(this.element, 'main_menu')

        this.UIelements = {};

        this.UIelements["buttons"] = {};
        this.UIelements["buttons"]["singleplayer"] = new UIButton(this.menu_container, 0, 0, 450,"main_menu-singleplayer", "Singleplayer");
        this.UIelements["buttons"]["multiplayer"] = new UIButton(this.menu_container, 0, 50, 450,"main_menu-multiplayer", "Multiplayer");
        this.UIelements["buttons"]["realms"] = new UIButton(this.menu_container, 0, 100, 450,"main_menu-realms", "Minecraft Realms");
        this.UIelements["buttons"]["options"] = new UIButton(this.menu_container, 0, 175, 220,"main_menu-options", "Options");
        this.UIelements["buttons"]["quit"] = new UIButton(this.menu_container, 230, 175, 220,"main_menu-quit", "Quit Game");

        this.UIelements["images"] = {};
        this.UIelements["images"]["logo-left"] = new UIImage(this.logo_container, 0, 0, 310, 90  , "main_menu-logo-left", "minecraft/textures/gui/title/minecraft.png", 512, 512, 0, 0)
        this.UIelements["images"]["logo-right"] = new UIImage(this.logo_container, 310, 0, 238, 90  , "main_menu-logo-right", "minecraft/textures/gui/title/minecraft.png", 512, 512, 0, -90)
        this.UIelements["images"]["edition"] = new UIImage(this.logo_container, 176, 80, 196, 28  , "main_menu-edition", "minecraft/textures/gui/title/edition.png",32, 256)

        this.UIelements["texts"] = {};
        this.UIelements["texts"]["splash"] = new UIFlashyYellowText(this.logo_container, 380, 50, "main_menu-logo-splash", "Spiders everywhere!",)
        this.UIelements["texts"]["title"] = new UIText(this.element, 0, 0, "main_menu-minecraft_version", "JSCraft pre-alpha 1.12", false, true);
        this.UIelements["texts"]["copyright"] =  new UIText(this.element, 0, 0, "main_menu-copyright", "Copyright John and Joe. Do not distribute!", true, true);

        this.UIelements["buttons"]["singleplayer"].onclick = () => {this.hide()}
    }
}