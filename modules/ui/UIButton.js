class UIButton {
    constructor(parentElement, x=0, y=0, width=400, id="", text="") {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.width = width;
        this.id = id;
        this.text = text;
        this.onclick = () => {};
        this.createButton()
    }

    createButton() {
        this.element = this.dom.createElement("div");
        this.element.classList.add("standard_button");
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = '40px';
        this.element.id = this.id;
        this.element.onclick = () => {this.onclickInternal()};

        this.button_text = this.dom.createElement("p");
        this.button_text.innerText = this.text;
        this.button_text.classList.add("standard_text");
        this.element.appendChild(this.button_text);

        this.button_bg_left = this.dom.createElement("span");
        this.button_bg_left.classList.add("widget");
        this.button_bg_left.classList.add("standard_button_bg_left");
        this.element.appendChild(this.button_bg_left);

        this.button_bg_right = this.dom.createElement("span");
        this.button_bg_right.classList.add("widget");
        this.button_bg_right.classList.add("standard_button_bg_right");
        this.button_bg_right.style.backgroundPositionX = `${-400 + this.width/2}px`;
        this.element.appendChild(this.button_bg_right);

        this.parentElement.appendChild(this.element);
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }
}