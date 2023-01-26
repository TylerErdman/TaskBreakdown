export default class Item{

    constructor(id, content) {
        'use strict';
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector("kanban_item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
    }

    static createRoot() {
        "use strict";
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="kanban_item" draggable="true">
                <div class="kanban_item-input" contenteditable></div>
        </div>
        `).children[0];
    }
}