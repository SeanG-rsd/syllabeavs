import { Assignment } from "../types/assignment";

export const getDifficulty = (a: Assignment, b: Assignment) => {
    return a.difficulty - b.difficulty;
};

export const getDate = (a: Assignment, b: Assignment) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
};

export const getProgress = (a: Assignment, b: Assignment) => {
    
    const order: { [key: string]: number } = {
        "In Progress": 0,
        "Not Started": 1,
        "Complete": 2,
    };

    console.log(
    `Comparing "${a.status}" vs "${b.status}" => ${order[a.status] - order[b.status]}`
  );

  const diff = order[a.status] - order[b.status];

  return diff === 0 ? 0 : diff > 0 ? 1 : -1;
};
