class UIText {
    constructor(parentElement, x=0, y=0, id="", text="", flipX=false, flipY=false) {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.id = id;
        this.text = text;
        this.flipX = flipX;
        this.flipY = flipY;
        this.onclick = () => {};
        this.createText()
    }

    createText() {
        this.element = this.dom.createElement("p");
        this.element.innerText = this.text;
        this.element.id = this.id;

        if (this.flipY) {
            this.element.style.bottom = `${this.y}px`;
        } else {
            this.element.style.top = `${this.y}px`;
        }

        if (this.flipX) {
            this.element.style.right = `${this.x}px`;
        } else {
            this.element.style.left = `${this.x}px`;
        }

        this.element.classList.add("standard_text");
        this.element.onclick = () => {this.onclickInternal()};
        this.parentElement.appendChild(this.element);
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }
}