class UIText {
    constructor(parentElement, x=0, y=0, id="", text="") {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.id = id;
        this.text = text;
        this.onclick = () => {};
        this.createText()
    }

    createText() {
        this.element = this.dom.createElement("p");
        this.element.innerText = this.text;
        this.element.id = this.id;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.classList.add("standard_text");
        this.element.onclick = () => {this.onclickInternal()};
        this.parentElement.appendChild(this.element);
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }
}