class UISlider {
    constructor(parentElement, x=0, y=0, width=400, minValue=0, maxValue=100, value=0, id="", text="") {
        this.dom = document;
        this.parentElement = parentElement;
        this.x = x;
        this.y = y;
        this.width = width;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.handleWidth = 20;
        this.value = value;
        this.id = id;
        this.text = text;
        this.onclick = () => {};
        this.onchange = () => {};
        this.createButton()
    }

    createButton() {
        this.element = this.dom.createElement("div");
        this.element.classList.add("standard_slider");
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = '40px';
        this.element.id = this.id;
        this.element.onclick = () => {this.onclickInternal()};

        this.range_input = this.dom.createElement("input");
        this.range_input.classList.add("standard_slider_input");
        this.range_input.type = "range";
        this.range_input.min = this.minValue;
        this.range_input.max = this.maxValue;
        this.range_input.value = this.value;

        this.slider_handle_button = new UIButton(this.element, 0, 0, 20);
        this.range_input.oninput = () => { this.onchangeInternal() };
        this.element.appendChild(this.range_input);

        this.updateHandlePos();

        this.slider_text = this.dom.createElement("p");
        this.slider_text.innerText = this.getText();
        this.slider_text.classList.add("standard_text");
        this.element.appendChild(this.slider_text);

        this.slider_bg_left = this.dom.createElement("span");
        this.slider_bg_left.classList.add("widget");
        this.slider_bg_left.classList.add("standard_slider_bg_left");
        this.element.appendChild(this.slider_bg_left);

        this.slider_bg_right = this.dom.createElement("span");
        this.slider_bg_right.classList.add("widget");
        this.slider_bg_right.classList.add("standard_slider_bg_right");
        this.slider_bg_right.style.backgroundPositionX = `${-400 + this.width/2}px`;
        this.element.appendChild(this.slider_bg_right);

        this.parentElement.appendChild(this.element);
    }

    onclickInternal() {
        // do something before running user specified onclick function

        this.onclick();
    }

    onchangeInternal() {
        // do something before running user specified onchange function
        this.updateHandlePos();
        this.slider_text.innerText = this.getText();

        this.onchange(this.getValue())
    }

    getValue() {
        return parseInt(this.range_input.value);
    }

    getText() {
        return this.text.replace("^//^", this.getValue().toString());
    }

    updateHandlePos() {
        this.slider_handle_button.element.style.left = `${((((this.range_input.value-this.range_input.min)/(this.range_input.max-this.range_input.min))*this.width)*(1-(this.handleWidth/this.width))).toString()}px`;
    }
}