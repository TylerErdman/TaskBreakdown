// Contains all the code for local storage components
"use strict";

export default class KanbanAPI {
    static getItem(columnID) {
        const column = read().find(column => column.id == columnID);

        if (!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnID, content) {
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
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemID);

                if (item) {
                    return [item, column];
                }
            }
            
        })();

        
    }
}

function read() {
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
    localStorage.setItem("kanban-data", JSON.stringify(data));
}