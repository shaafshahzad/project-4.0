import { useEffect, useState } from 'react';

interface Grading {
    [assignment: string]: {
        mark: string;
        weight: string;
    };
}

export const useGrades = (marks: Grading) => {
    const [currentGrade, setCurrentGrade] = useState(0);
    const [totalGrade, setTotalGrade] = useState(0);
    const [remainingWeight, setRemainingWeight] = useState(100);

    useEffect(() => {
        const completedAssignments = Object.values(marks).filter(
            ({ mark }) => mark !== ""
        );
        const currentGradeWeightedSum = completedAssignments.reduce(
            (acc, { mark, weight }) =>
                acc + parseFloat(mark) * parseFloat(weight),
            0
        );
        const currentWeightSum = completedAssignments.reduce(
            (acc, { weight }) => acc + parseFloat(weight),
            0
        );
        const currentGradeAvg =
            currentWeightSum > 0
                ? currentGradeWeightedSum / currentWeightSum
                : 0;

        const totalAssignments = Object.values(marks);
        const totalGradeWeightedSum = totalAssignments.reduce(
            (acc, { mark, weight }) =>
                acc + (mark ? parseFloat(mark) : 0) * parseFloat(weight),
            0
        );
        const totalWeightSum = totalAssignments.reduce(
            (acc, { weight }) => acc + parseFloat(weight),
            0
        );
        const totalGradeAvg =
            totalWeightSum > 0 ? totalGradeWeightedSum / totalWeightSum : 0;

        setCurrentGrade(parseFloat(currentGradeAvg.toFixed(2)));
        setTotalGrade(parseFloat(totalGradeAvg.toFixed(2)));
        setRemainingWeight(100 - currentWeightSum);
    }, [marks]);

    return { currentGrade, totalGrade, remainingWeight };
};