import Column from "./Column.js";

export default class Kanban {
    constructor(root) {
        'use strict';
        this.root = root;

        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }

    static columns() {
        'use strict';
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In progress"
            },
            {
                id: 3,
                title: "Finished"
            }
        ];
    }
}