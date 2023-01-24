import KanbanAPI from "./api/KanbanAPI.js";

KanbanAPI.insertItem(1, "Cmon let's play!")
console.log((KanbanAPI.getItem(1))[0])

