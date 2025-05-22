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

export const getNextAssignments = (syllabi: { [key: string]: Assignment[] }, numAssignments: number) => {
    var allAssignments = [];

    for (var s in syllabi) {
        var syllabus = syllabi[s];

        allAssignments.push(...syllabus);
    }

    const sorted = sortSyllabus(allAssignments);

    var output = [];

    var count = 0;
    var i = 0;

    while (count < numAssignments && i < sorted.length) {
        if (sorted[i].status != "Complete") {
            output.push(sorted[i]);
            count++;
        }
        i++;
    }

    return output;
}

const sortSyllabus = (
    syllabus: Assignment[]
  ) => {
    const copy = [...syllabus];
    copy.sort((a, b) => {
      let result = getDate(a, b);
      if (result !== 0) return result;

      result = getProgress(a, b);
      if (result !== 0) return result;

      result = getDifficulty(a, b);
      return result;
    });

    return copy;    
  };
