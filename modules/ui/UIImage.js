class UIImage {
    constructor(parentElement, x=0, y=0, width=0, height=0, id="", imageURL='', background_size_width=false, background_size_height=false, background_pos_x=0, background_pos_y=0) {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.background_size_height = background_size_height;
        this.background_size_width = background_size_width;
        this.background_pos_x = background_pos_x;
        this.background_pos_y = background_pos_y;
        this.width = width;
        this.height = height;
        this.imageURL = imageURL;
        this.id = id;
        this.onclick = () => {};
        this.createImage()
    }

    createImage() {
        this.element = this.dom.createElement("div");
        this.element.classList.add("standard_image");
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.id = this.id;
        this.element.onclick = () => {this.onclickInternal()};

        this.image_element = this.dom.createElement("span");
        this.image_element.style.backgroundImage = `url("${this.imageURL}")`;

        if (this.background_size_height || this.background_size_width) {
            this.image_element.style.backgroundSize = `${this.background_size_height}px ${this.background_size_width}px`;
        }

        this.image_element.style.backgroundPosition = `${this.background_pos_x}px ${this.background_pos_y}px`;
        this.image_element.classList.add("image");
        this.element.appendChild(this.image_element);

        this.parentElement.appendChild(this.element);
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }
}