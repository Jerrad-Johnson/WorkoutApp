import {Dispatch, SetStateAction} from "react";

function NumberOfExercises({currentNumberOfExercisesState, defaultRepCountState, setCurrentNumberOfExercisesState,
                               setCountState, setSetCountState, userDefinedDefaultSetsPerWorkoutState,
                               priorSessionNumberOfExercisesState, setAddOrSelectExerciseState, addOrSelectExerciseState}:
                               {currentNumberOfExercisesState: number,
                                   defaultRepCountState: number,
                                   setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>,
                                   setCountState: number[],
                                   setSetCountState: Dispatch<SetStateAction<number[]>>,
                                   userDefinedDefaultSetsPerWorkoutState: number,
                                   priorSessionNumberOfExercisesState: number | undefined,
                                   setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>,
                                   addOrSelectExerciseState: number[],
                               }){
    let exerciseOptionCount: JSX.Element[] = Array.from({length: 12}, (_e, k) => {
        return (
            <option key={k}>{k+1}</option>
        );
    });

    return (<>
            <span className={"inputTitle"}>Number of Exercises in This Workout</span>
            <select defaultValue={priorSessionNumberOfExercisesState || currentNumberOfExercisesState} className={"genericSelectorShort"} // priorSessionNumberOfExercisesState
                    onChange={(e) => {
                        e.preventDefault();
                        handleChangeNumberOfExercises(setCurrentNumberOfExercisesState, setCountState, setSetCountState,
                            +e.target.value, userDefinedDefaultSetsPerWorkoutState, setAddOrSelectExerciseState, addOrSelectExerciseState);
                    }}>
                {exerciseOptionCount}
            </select>
        </>
    );
}

function handleChangeNumberOfExercises(setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>,
                                       setCountState: number[],
                                       setSetCountState: Dispatch<SetStateAction<number[]>>,
                                       targetValue: number,
                                       userDefinedDefaultSetsPerWorkoutState: number,
                                       setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>,
                                       addOrSelectExerciseState: number[]){

    let setCountNewLength: number[] = [];
    let addOrSelectExercisesNewLength = addOrSelectExerciseState;

    for (let i = 0; i < targetValue; i++){
        setCountNewLength[i] = setCountState[i] || userDefinedDefaultSetsPerWorkoutState;
        if (addOrSelectExercisesNewLength[i] !== (0 || 1)) {
            addOrSelectExercisesNewLength[i] = 0;
        }
    }

    setSetCountState(setCountNewLength);
    setCurrentNumberOfExercisesState(targetValue)
    setAddOrSelectExerciseState(addOrSelectExercisesNewLength);
}

export default NumberOfExercises;