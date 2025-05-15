export type Assignment = {
  task: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  class: string;
  difficulty: number;
};