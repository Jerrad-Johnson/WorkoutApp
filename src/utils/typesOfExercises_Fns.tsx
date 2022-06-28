import {Dispatch, SetStateAction} from "react";

export function handleSetPriorRepCountState(setIntermediateRepsState: Dispatch<SetStateAction<number[] | undefined>>,
                                     newCount: number, intermediateRepsState: number[], defaultWeightState: number){
    let newRepCounts: number[] = [];

    for (let i = 0; i < newCount; i++){
        newRepCounts[i] = intermediateRepsState[i] || defaultWeightState;
    }

    setIntermediateRepsState(newRepCounts);
}

export function handleAddExercise(setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>, instance: number, addOrRemove: boolean){

    setAddOrSelectExerciseState(prev => prev.map((e, k) => k === instance ? +addOrRemove : e));
}

export function getAddExerciseButton(listOfExercises: JSX.Element[], addOrSelectExerciseState: number,
                              setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>, instance: number){

    let exercisesSelector: JSX.Element[] = [];

    if (listOfExercises?.length > 0 && addOrSelectExerciseState === 0){
        exercisesSelector = [0].map((e, k) => {
            return (
                <div key={k}>
                    <span className={"inputTitleSideBySide"}>Exercise  </span>
                    <select className={`genericSelectorLongSideBySide exerciseSelector `}>
                        {listOfExercises}
                    </select>
                    <span onClick={(e) => {
                        e.preventDefault();
                        handleAddExercise(setAddOrSelectExerciseState, instance, true);
                    }}> Add</span>
                </div>
            );
        });
    } else if (listOfExercises?.length > 0 && addOrSelectExerciseState === 1) {
        exercisesSelector = [0].map((e, k) => {
            return (
                <div key={k}>
                    <span className={"inputTitleSideBySide"}>Exercise  </span>
                    <input type={"text"} defaultValue={"Exercise Name"} className={`addAnExercise exerciseSelector`}></input>
                    <span onClick={(e) => {
                        e.preventDefault();
                        handleAddExercise(setAddOrSelectExerciseState, instance,false);
                    }}> Select Instead</span>
                </div>
            );
        });
    } else {
        exercisesSelector = [0].map((e) => {
            return (
                <div className={"exerciseName"}>
                    <input type={"text"} defaultValue={"Exercise Name"} className={"addAnExercise exerciseSelector"}></input>
                </div>
            );
        })
    }

    return exercisesSelector;
}

export function getListOfExercises(exerciseTypesState: string[]){
    let listOfExercises: JSX.Element[] | JSX.Element = [];

    if (exerciseTypesState.length > 0) {
        listOfExercises = exerciseTypesState.map((e: string, k: number) => {
            return (
                <option key={k}>{e}</option>
            );
        });
    }

    return listOfExercises;
}
