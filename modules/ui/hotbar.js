class Hotbar {
    constructor(ui, selected_item=0, maxHealth=20, health=20, maxHunger=20, hunger=20) {
        this.ui = ui;

        this.selected_item = selected_item;
        this.maxHealth = maxHealth;
        this.maxHunger = maxHunger;

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
        this.items_div = document.createElement("div");
        this.items_div.classList.add("items_div");
        this.items = [];
        this.item_slots = [];

        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());
        this.item_slots.push(new ItemSlot());

        this.items.push(new UIItem(this.items_div, this.item_slots[0], 6, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[1], 46, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[2], 86, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[3], 126, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[4], 166, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[5], 206, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[6], 246, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[7], 286, 6, 400, true));
        this.items.push(new UIItem(this.items_div, this.item_slots[8], 326, 6, 400, true));

        this.element.append(this.items_div);

        // create item-selectors div and populate with 9 item selector spans
        this.selected_item_spans_div = document.createElement("div");
        this.selected_item_spans_div.classList.add("item-selectors");
        this.selected_item_spans = [];
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
        this.hearts_div.classList.add("hearts");
        this.heart_divs = [];
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
        this.hungers_div.classList.add("hungers");
        this.hunger_divs = [];
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
        this.style_element.innerHTML = `
        .hotbar {
            position: fixed;
            bottom: 0;
            left: calc(50% - 182px);
            height: 110px;
            width: 364px;
            z-index: 2;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        
        .items_div {
            height: 110px;
            width: 364px;
            position: relative;
        }
        
        .widget {
            position: absolute;
            display: inline-block;
            background-image: url(minecraft/textures/gui/widgets.png);
            background-size: 512px 512px;
            image-rendering: pixelated;
        }
        .widget.items_bg {
            bottom: 0;
            background-position: 0 0;
            height: 44px;
            width: 364px;
        }
        .item-selectors {
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: start;
            align-items: start;
            width: 368px;
            height: 46px;
        }
        .widget.item-selector {
            position: static;
            visibility: hidden;
            background-position: 0 -44px;
            height: 48px;
            width: 48px;
            margin-right: -8px;
        }
        .widget.item-selector.active {
            visibility: visible;
        }
        .icon {
            position: absolute;
            display: inline-block;
            background-image: url(minecraft/textures/gui/icons.png);
            background-size: 512px 512px;
            image-rendering: pixelated;
        }
        .icon.xp-bar {
            bottom: 48px;
            background-position: 0 -128px;
            height: 10px;
            width: 364px;
        }
        .hearts {
            position: absolute;
            left: 0;
            bottom: 62px;
            display: flex;
            justify-content: start;
            align-items: start;
            width: 160px;
            flex-wrap: wrap;
        }
        .heart {
            position: relative;
            width: 18px;
            height: 18px;
            margin-right: -2px;
        }
        .icon.outer-heart {
            background-position: -32px 0;
            height: 18px;
            width: 18px;
            top: 0;
            left: 0;
        }
        .icon.inner-heart {
            visibility: hidden;
            background-position: -106px -2px;
            height: 14px;
            width: 14px;
            top: 2px;
            left: 2px;
            z-index: 2;
        }
        .icon.inner-heart.half {            
            background-position: -124px -2px;
        }
        .hungers {
            position: absolute;
            right: 0;
            bottom: 62px;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            width: 160px;
            flex-wrap: wrap;
            flex-direction: row-reverse;
        }
        .hunger {
            position: relative;
            width: 18px;
            height: 18px;
            margin-left: -2px;
        }
        .icon.outer-hunger {
            background-position: -32px -54px;
            height: 18px;
            width: 18px;
            top: 0;
            left: 0;
        }
        .icon.inner-hunger {          
            visibility: hidden;
            background-position: -106px -56px;
            height: 14px;
            width: 14px;
            top: 2px;
            left: 2px;
            z-index: 2;
        }
        .icon.inner-hunger.half {  
            background-position: -124px -56px;
        }
        .icon.active {
            visibility: visible;
        }`;
        this.element.appendChild(this.style_element);

        // append main element to body
        this.ui.dom_element.appendChild(this.element);
        this.selectItem(selected_item);

        this.updateHealth(health);
        this.updateHunger(hunger);
    }

    selectItem (item_number) {
        this.selected_item = item_number
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

    updateHealth(health) {
        health = Math.round(health);
        if (health > this.maxHealth) {
            console.error("Given health is greater than max health");
            return
        }
        for (let i = 0; i < this.heart_divs.length; i++) {
            let inner_heart_span = this.heart_divs[i].getElementsByClassName("inner-heart")[0];
            inner_heart_span.classList.remove("active");
            inner_heart_span.classList.remove("half");
            if (i+1 <= health/2) {
                inner_heart_span.classList.add("active")
            }
        }
        if (!Number.isInteger(health/2)) {
            let inner_heart_span = this.heart_divs[(health-1)/2].getElementsByClassName("inner-heart")[0];
            inner_heart_span.classList.add("half");
            inner_heart_span.classList.add("active");
        }
    }

    updateHunger(hunger) {
        hunger = Math.round(hunger);
        if (hunger > this.maxHunger) {
            console.error("Given hunger is greater than max hunger");
            return
        }
        for (let i = 0; i < this.hunger_divs.length; i++) {
            let inner_hunger_span = this.hunger_divs[i].getElementsByClassName("inner-hunger")[0];
            inner_hunger_span.classList.remove("active");
            inner_hunger_span.classList.remove("half");
            if (i+1 <= hunger/2) {
                inner_hunger_span.classList.add("active")
            }
        }
        if (!Number.isInteger(hunger/2)) {
            let inner_hunger_span = this.hunger_divs[(hunger-1)/2].getElementsByClassName("inner-hunger")[0];
            inner_hunger_span.classList.add("half");
            inner_hunger_span.classList.add("active");
        }
    }
}