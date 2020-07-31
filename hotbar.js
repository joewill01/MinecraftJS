export default class Hotbar {
    constructor(selected_item=0, maxHealth=20, health=20, maxHunger=20, hunger=20) {
        this.selected_item = selected_item;

        // create main hotbar element
        this.element = document.createElement("div");
        this.element.id = "hotbar";
        this.element.classList.add("hotbar");

        // create items background element
        this.items_bg_span = document.createElement("span");
        this.items_bg_span.classList.add("widget");
        this.items_bg_span.classList.add("items_bg");
        this.element.appendChild(this.items_bg_span);

        // create items div and populate with 9 item spans
        this.item_spans_div = document.createElement("div");
        this.item_spans_div.classList.add("items")
        this.item_spans = []
        for (let i = 0; i < 9; i++) {
            this.item_spans.push(document.createElement("span"));
            this.item_spans[i].classList.add("item")
            this.item_spans_div.appendChild(this.item_spans[i]);
        }
        this.element.appendChild(this.item_spans_div);

        // create item-selectors div and populate with 9 item selector spans
        this.selected_item_spans_div = document.createElement("div");
        this.selected_item_spans_div.classList.add("item-selectors")
        this.selected_item_spans = []
        for (let i = 0; i < 9; i++) {
            this.selected_item_spans.push(document.createElement("span"));
            this.selected_item_spans[i].classList.add("widget");
            this.selected_item_spans[i].classList.add("item-selector");
            this.selected_item_spans_div.appendChild(this.selected_item_spans[i]);
        }
        this.element.appendChild(this.selected_item_spans_div);

        // create xp bar
        this.xp_bar_span = document.createElement("span");
        this.xp_bar_span.classList.add("icon");
        this.xp_bar_span.classList.add("xp-bar");
        this.element.appendChild(this.xp_bar_span);

        // create hearts div and populate with (maxHealth/2) hearts
        this.hearts_div = document.createElement("div");
        this.hearts_div.classList.add("hearts")
        this.heart_divs = []
        for (let i = 0; i < Math.round((maxHealth/2)); i++) {
            this.heart_divs.push(document.createElement("div"));
            this.heart_divs[i].classList.add("heart");
            let inner_heart_span = document.createElement("span");
            inner_heart_span.classList.add("icon");
            inner_heart_span.classList.add("inner-heart");
            let outer_heart_span = document.createElement("span");
            outer_heart_span.classList.add("icon");
            outer_heart_span.classList.add("outer-heart");
            this.heart_divs[i].appendChild(inner_heart_span);
            this.heart_divs[i].appendChild(outer_heart_span);
            this.hearts_div.appendChild(this.heart_divs[i]);
        }
        this.element.appendChild(this.hearts_div);

        // create hungers div and populate with (maxHunger/2) hungers
        this.hungers_div = document.createElement("div");
        this.hungers_div.classList.add("hungers")
        this.hunger_divs = []
        for (let i = 0; i < Math.round((maxHunger/2)); i++) {
            this.hunger_divs.push(document.createElement("div"));
            this.hunger_divs[i].classList.add("hunger");
            let inner_hunger_span = document.createElement("span");
            inner_hunger_span.classList.add("icon");
            inner_hunger_span.classList.add("inner-hunger");
            let outer_hunger_span = document.createElement("span");
            outer_hunger_span.classList.add("icon");
            outer_hunger_span.classList.add("outer-hunger");
            this.hunger_divs[i].appendChild(inner_hunger_span);
            this.hunger_divs[i].appendChild(outer_hunger_span);
            this.hungers_div.appendChild(this.hunger_divs[i]);
        }
        this.element.appendChild(this.hungers_div);

        // add css to DOM
        this.style_element = document.createElement("style");
        this.style_element.innerHTML = '.hotbar{position:fixed;bottom:0;left:calc(50% - 182px);height:110px;width:364px;z-index:2;display:flex;align-items:center;flex-direction:column}.widget{position:absolute;display:inline-block;background-image:url(minecraft/textures/gui/widgets.png);background-size:512px 512px;image-rendering:pixelated}.widget.items_bg{bottom:0;background-position:0 0;height:44px;width:364px}.item-selectors{position:absolute;bottom:0;display:flex;justify-content:start;align-items:start;width:368px;height:46px}.widget.item-selector{position:static;visibility:hidden;background-position:0 -44px;height:48px;width:48px;margin-right:-8px}.widget.item-selector.active{visibility:visible}.icon{position:absolute;display:inline-block;background-image:url(minecraft/textures/gui/icons.png);background-size:512px 512px;image-rendering:pixelated}.icon.xp-bar{bottom:48px;background-position:0 -128px;height:10px;width:364px}.hearts{position:absolute;left:0;bottom:62px;display:flex;justify-content:start;align-items:start;width:160px;flex-wrap:wrap}.heart{position:relative;width:18px;height:18px;margin-right:-2px}.icon.outer-heart{background-position:-32px 0;height:18px;width:18px;top:0;left:0}.icon.inner-heart{background-position:-106px -2px;height:14px;width:14px;top:2px;left:2px;z-index:2}.hungers{position:absolute;right:0;bottom:62px;display:flex;justify-content:flex-end;align-items:flex-end;width:160px;flex-wrap:wrap}.hunger{position:relative;width:18px;height:18px;margin-left:-2px}.icon.outer-hunger{background-position:-32px -54px;height:18px;width:18px;top:0;left:0}.icon.inner-hunger{background-position:-106px -56px;height:14px;width:14px;top:2px;left:2px;z-index:2}';
        document.getElementById("body").appendChild(this.style_element);

        // append main element to body
        document.getElementById("body").appendChild(this.element);
        this.selectItem(selected_item);
    }

    selectItem (item_number) {
        for (let i = 0; i < this.selected_item_spans.length; i++) {
            if (i === item_number) {
                this.selected_item_spans[i].classList.add("active")
            } else {
                this.selected_item_spans[i].classList.remove("active")
            }
        }
    }

    itemUp () {
        this.selected_item++;
        if (this.selected_item >= 9) {
            this.selected_item = 0;
        }
        this.selectItem(this.selected_item);
    }

    itemDown() {
        this.selected_item--;
        if (this.selected_item <= -1) {
            this.selected_item = 8;
        }
        this.selectItem(this.selected_item);
    }
}