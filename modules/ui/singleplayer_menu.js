class SinglePlayerMenu extends UIBase {
    constructor(ui) {
        super(ui);
        this.UIelements = {};

        this.createEl("singleplayer_menu");
        this.element.classList.add("ui_screen")

        this.createStylesheet();
        this.createScreen();

        this.addEl();
        //this.show();
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
        .ui_screen.singleplayer_menu {
            
        }

        .ui_container.singleplayer_menu-footer-menu {
            margin: 0;
            margin-top: 10px;
            height: 90px;
            width: 618px;
        }
        `;
        this.element.appendChild(this.stylesheet);
    }

    createScreen() {
        this.header_container = makeUIContainer(this.element, 'singleplayer_menu-header', false, 'dirt-header')
        this.scroll_container = makeUIContainer(this.element, 'singleplayer_menu-scroll_container', false, 'dirt-scroll-container')
        this.footer_container = makeUIContainer(this.element, 'singleplayer_menu-footer', false, 'dirt-footer')

        this.scroll_container.innerHTML += `<p style="color: white"><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br><p style="color: white">lorem ipsum</p><br>  `


        this.footer_menu_container = makeUIContainer(this.footer_container, 'singleplayer_menu-footer-menu')

        this.UIelements = {};

        this.UIelements["buttons"] = {};
        this.UIelements["buttons"]["play_selected"] = new UIButton(this.footer_menu_container, 0, 0, 300,"singleplayer_menu-play_selected", "Play Selected World");
        this.UIelements["buttons"]["edit_selected"] = new UIButton(this.footer_menu_container, 0, 48, 144,"singleplayer_menu-edit_selected", "Edit");
        this.UIelements["buttons"]["delete_selected"] = new UIButton(this.footer_menu_container, 156, 48, 144,"singleplayer_menu-delete_selected", "Delete");
        this.UIelements["buttons"]["create"] = new UIButton(this.footer_menu_container, 316, 0, 300,"singleplayer_menu-create", "Create New World");
        this.UIelements["buttons"]["re_create"] = new UIButton(this.footer_menu_container, 316, 48, 144,"singleplayer_menu-re_create", "Re-Create");
        this.UIelements["buttons"]["cancel"] = new UIButton(this.footer_menu_container, 472, 48, 144,"singleplayer_menu-cancel", "Cancel");

        this.UIelements["buttons"]["cancel"].onclick = () => {this.ui.openScreen("main_menu")};

        this.UIelements["buttons"]["play_selected"].onclick = () => {this.hide()};

        this.UIelements["buttons"]["play_selected"].disable();
        this.UIelements["buttons"]["edit_selected"].disable();
        this.UIelements["buttons"]["delete_selected"].disable();
        this.UIelements["buttons"]["re_create"].disable();

    }
}