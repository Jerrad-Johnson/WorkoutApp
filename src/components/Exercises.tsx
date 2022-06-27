import {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {handleSetPriorRepCountState, handleAddExercise, getAddExerciseButton, getListOfExercises} from "../utils/typesOfExercises_Fns";

function Exercises({currentNumberOfExercisesState, defaultRepCountState, exerciseTypesState,
                                priorSessionWeightState, priorSessionRepsState, setPriorSessionRepsState,
                                setCountState, setSetCountState, defaultWeightState, addOrSelectExerciseState, setAddOrSelectExerciseState}:
                                {currentNumberOfExercisesState: number,
                                    defaultRepCountState: number,
                                    exerciseTypesState: string[], priorSessionWeightState: number[][] | undefined,
                                    priorSessionRepsState: number[][] | undefined,
                                    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                                    setCountState: number[],
                                    setSetCountState: Dispatch<SetStateAction<number[]>>,
                                    defaultWeightState: number,
                                    addOrSelectExerciseState: number[],
                                    setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>}){

    let priorSessionSetsSelectorsDefaultValue: number[] = [];

    if (priorSessionRepsState !== undefined){
        for (let i = 0; i < priorSessionRepsState.length; i++){
            priorSessionSetsSelectorsDefaultValue[i] = priorSessionRepsState[i].length || 2;
        }
    }

    let exercisesComponents: JSX.Element[] =
        Array.from({length: currentNumberOfExercisesState}, (_v, k) => {
            return (
                <div key={k}>
                    <br />
                    <TypesOfExercises
                        exerciseTypesState = {exerciseTypesState}
                        addOrSelectExerciseState = {addOrSelectExerciseState[k]}
                        addOrSelectExercisesState = {addOrSelectExerciseState}
                        setAddOrSelectExerciseState = {setAddOrSelectExerciseState}
                        instance = {k}
                    />

                    <SetSelector
                        defaultRepCountState = {defaultRepCountState}
                        priorSessionWeightState = {priorSessionWeightState?.[k]}
                        priorSessionRepsState = {priorSessionRepsState?.[k]}
                        setPriorSessionRepsState = {setPriorSessionRepsState}
                        setCount = {setCountState[k]}
                        setCountState = {setCountState}
                        setSetCountState = {setSetCountState}
                        instance = {k}
                        defaultWeightState = {defaultWeightState}
                        priorSessionSetsSelectorDefaultValue = {priorSessionSetsSelectorsDefaultValue[k]}
                    />
                </div>
            );
        });

    return (<>{exercisesComponents}</>);
}


function TypesOfExercises({exerciseTypesState, addOrSelectExercisesState, setAddOrSelectExerciseState, instance,
                              addOrSelectExerciseState}:
                              {exerciseTypesState: string[],
                                  addOrSelectExercisesState: number[],
                                  setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>,
                                  instance: number,
                                  addOrSelectExerciseState: number}){
    let listOfExercises: JSX.Element[] | JSX.Element = getListOfExercises(exerciseTypesState);
    let exercisesSelector: JSX.Element[] = getAddExerciseButton(listOfExercises, addOrSelectExerciseState, setAddOrSelectExerciseState, instance);

    return ( <>{exercisesSelector.length > 0 && exercisesSelector }</> );
}

function SetSelector({defaultRepCountState, priorSessionWeightState, priorSessionRepsState,
                         setPriorSessionRepsState, setCount, setCountState, setSetCountState, instance, defaultWeightState,
                         priorSessionSetsSelectorDefaultValue}:
                         {defaultRepCountState: number,
                             priorSessionWeightState: number[] | undefined,
                             priorSessionRepsState: number[] | undefined,
                             setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                             setCount: number,
                             setCountState: number[],
                             setSetCountState: Dispatch<SetStateAction<number[]>>,
                             instance: number,
                             defaultWeightState: number,
                             priorSessionSetsSelectorDefaultValue: number}){

    const [intermediateRepsState, setIntermediateRepsState] = useState<number[] | undefined>(priorSessionRepsState || undefined);

    let maxSetCount: number[] = [];
    let numberOfCountersForThisSet: number[] = [];

    for (let i = 0; i < 12; i++){
        maxSetCount[i] = i+1;
    }

    if (intermediateRepsState !== undefined){
        for (let i = 0; i < intermediateRepsState.length; i++){
            numberOfCountersForThisSet[i] = i+1;
        }

        var repCountersForThisSet = numberOfCountersForThisSet.map((e, k) => {
            return (
                <div key={k}>
                    <span className={"inputTitleSideBySide"}>Reps </span>
                    <RepSelector repCountState = {intermediateRepsState[k]} />
                    <br />
                    <span className={"inputTitleSideBySide"}>Weight </span>
                    <WeightInput
                        priorSessionWeightState = {priorSessionWeightState?.[k]}
                        defaultWeightState = {defaultWeightState}
                    />
                </div>
            );
        });
    } else {
        for (let i = 0; i < setCount; i++){
            numberOfCountersForThisSet[i] = i+1;
        }

        var repCountersForThisSet = numberOfCountersForThisSet.map((e, k) => {
            return (
                <div key={k}>
                    <span className={"inputTitleSideBySide"}>Reps </span>
                    <RepSelector repCountState = {defaultRepCountState} />
                    <br />
                    <span className={"inputTitleSideBySide"}>Weight </span>
                    <WeightInput
                        priorSessionWeightState = {priorSessionWeightState?.[k]}
                        defaultWeightState = {defaultWeightState}
                    />
                </div>
            );
        });

    }

    let setCountOptions: JSX.Element[] = maxSetCount.map((e: number, k: number ) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return (<>
        <br />
        <span className={"inputTitleSideBySide"}>Sets</span>
        <select defaultValue={priorSessionSetsSelectorDefaultValue || 3} onChange={(e) => {
            e.preventDefault();
            if (intermediateRepsState !== undefined) {
                handleSetPriorRepCountState(setIntermediateRepsState, +e.target.value, intermediateRepsState,
                    defaultWeightState);
            } else {
                setSetCountState(prev => prev.map((num: number, index: number) => instance === index ? +e.target.value : num));
            }
        }}>{setCountOptions}
        </select>
        {repCountersForThisSet}
    </>);
}


function RepSelector({repCountState}: {repCountState: number}){
    let maxRepCount: number[] = [];

    for (let i = 0; i < 20; i++){
        maxRepCount[i] = i+1;
    }

    let repCountOptions: JSX.Element[] = maxRepCount.map((e: number, k: number ) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return (
        <select defaultValue={repCountState} className={"genericSelectorShortSideBySide " +
            "secondSideBySideSelector"}>
            {repCountOptions}
        </select>
    );
}

function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number | undefined, defaultWeightState: number}){
    return (<>
        <input type={"text"} defaultValue={priorSessionWeightState || defaultWeightState}
               onChange={(e)  => {
                   e.preventDefault();
               }} />
    </>)
}

export default Exercises;