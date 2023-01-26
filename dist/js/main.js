import Kanban from "./view/Kanban.js";
import KanbanAPI from "./api/KanbanAPI.js";

KanbanAPI.insertItem(1, "Code Capstone Project")

new Kanban(
    document.querySelector(".kanban")
);

