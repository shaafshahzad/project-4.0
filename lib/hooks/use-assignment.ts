import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Assignment } from "@/types";

export const useAssignments = (userId: string | undefined) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (userId) {
      const assignmentsRef = collection(db, "users", userId, "assignments");
      const q = query(assignmentsRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedAssignments: Assignment[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedAssignments.push({
            id: doc.id,
            ...data,
            dueDate: data.dueDate.toDate(),
          } as Assignment);
        });
        setAssignments(fetchedAssignments);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  return assignments;
};