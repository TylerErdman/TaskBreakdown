// Contains all the code for local storage components

export default class KanbanAPI {
    static getItems(columnID) {
        'use strict';
        const column = read().find(column => column.id == columnID);

        if (!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnID, content) {
        'use strict';
        const data = read();
        const column = data.find(column => column.id == columnID);
        const item = {
            id: 12 /* Math.floor(Math.random() * 100000) */,
            content
        }

        if (!column) {
            throw new Error("Column does not exist");
        }

        column.items.push(item);
        save(data);
    }

    static updateItem(itemID, newProps) {
        'use strict';
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemID);

                if (item) {
                    return [item, column];
                }
            }
            
        })();

        if (!item) {
            throw new Error("Item not found.")
        }

        // if we don't provide new properties, use current props
        item.content = newProps.content === undefined ? item.content : newProps.content;
        
        // update column and position

        if (
            newProps.columnID !== undefined
            && newProps.position !== undefined
        )
        {
            const targetColumn = data.find(column => column.id == newProps.columnID);

            if (!targetColumn) {
                throw new Error("Target column not found")
            }

            // delete the item from it's current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // move item into its new column and pos
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data)
    }

    static deleteItem(itemID) {
        'use strict';
        const data = read();

        for (const column of data) {
            const item = column.items.find(item => item.id == itemID);

            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }

            save(data);

        }
    }
}

function read() {
    'use strict';
    const json = localStorage.getItem("kanban-data");

    if (!json) {
        return [
            {
                id: 1,
                items: []
            }, 
            {
                id: 2,
                items: []
            }, 
            {
                id: 3,
                items: []
            }
        ];
    }

    return JSON.parse(json);
}

function save(data) {
    'use strict';
    localStorage.setItem("kanban-data", JSON.stringify(data));
}