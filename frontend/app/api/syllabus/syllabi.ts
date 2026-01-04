import { auth, db } from "@/app/api/firebase/firebase";
import { Assignment } from "@/app/types/assignment";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export const canParseSyllabus = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in!");
    return false;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().parsesUsed < docSnap.data().maxParses;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getSyllabiData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return null;
  }

  const token = await user.getIdToken();

  try {
    const response = await fetch("http://localhost:8000/syllabi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data.syllabi);
    const output: { [key: string]: Assignment[] } = {};

    for (const syllabus of data.syllabi) {
      const assignments = syllabus["assignments"];
      const className = syllabus["className"];

      output[className] = assignments;
    }

    return output;
  } catch (e) {
    console.error("Error getting syllabi:", e);
    return null;
  }
};

export const parseSyllabusData = async (
  e: React.ChangeEvent<HTMLInputElement>,
  currentClass: string,
) => {
  const file = e.target.files?.[0];
  const formData = new FormData();
  if (file != null) {
    formData.append("file", file);
  } else {
    return null;
  }

  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return null;
  }

  const token = await user.getIdToken();

  try {
    //setLoading(true);
    const response = await fetch("http://localhost:8000/input", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ClassName: currentClass,
      },
      body: formData,
    });

    if (!response.ok) {
      // Parse the JSON error body sent by FastAPI
      const errorData: string = await response.json();
      
      const message = typeof errorData === 'string' 
        ? errorData 
        : "The syllabus is too long. Try removing unecessary pages.";

      alert(`Server Error: ${message}`);
      return null;
    }

    const data = await response.json();

    // increment parses used
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { parsesUsed: increment(1) });

    return JSON.parse(data.message);
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message)
      return null
    } else {
      alert("An unexpected error occured. Try again.")
      return null
    }
  }
};

export const updateAssignmentStatus = async (
  status: string,
  index: number,
  currentClass: string,
  currentSyllabus: Assignment[],
) => {
  console.log(`${status} for assignment ${index}`);

  currentSyllabus[index].status = status;

  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return;
  }

  const token = await user.getIdToken();

  try {
    await fetch("http://localhost:8000/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentClass: currentClass,
        assignments: currentSyllabus,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateAssignmentDate = async (
  date: Date,
  index: number,
  currentClass: string,
  currentSyllabus: Assignment[],
) => {
  console.log(
    date.toLocaleDateString("en", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
  );

  currentSyllabus[index].dueDate = date.toLocaleDateString("en", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return;
  }

  const token = await user.getIdToken();

  try {
    await fetch("http://localhost:8000/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentClass: currentClass,
        assignments: currentSyllabus,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateSyllabus = async (
  className: string,
  currentSyllabus: Assignment[],
) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return;
  }

  const token = await user.getIdToken();

  try {
    await fetch("http://localhost:8000/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentClass: className,
        assignments: currentSyllabus,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteSyllabus = async (className: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Not signed in");
    return;
  }

  const token = await user.getIdToken();

  try {
    await fetch("http://localhost:8000/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class: className,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};
