import { Assignment } from "../types/assignment";

export const getDifficulty = (a: Assignment, b: Assignment) => {
    return a["difficulty"] - b["difficulty"];
};

export const getDate = (a: never, b: never) => {
    return new Date(a["dueDate"]).getTime() - new Date(b["dueDate"]).getTime();
};

export const getProgress = (a: never, b: never) => {
    if (a["status"] == b["status"]) return 0;
    if (a["status"] == "In Progress") return -1;
    if (a["status"] == "Not Started" && b["status"] == "Complete") return -1;
    return 1;
};
