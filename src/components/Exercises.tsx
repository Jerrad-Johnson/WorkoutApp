import {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {getAddExerciseButton, getListOfExercises} from "../utils/typesOfExercises_Fns";
import {JSX} from "cypress/react";
import {getRepCounters, handleSetsSelectorChange} from "../utils/setSelector_Fns";
let cc = console.log;

function Exercises({currentNumberOfExercisesState, defaultRepCountState, exerciseTypesState,
                                priorSessionWeightState, priorSessionRepsState, setPriorSessionRepsState,
                                setCountState, setSetCountState, defaultWeightState, addOrSelectExerciseState,
                                setAddOrSelectExerciseState, setPriorSessionWeightState}:
                                {currentNumberOfExercisesState: number,
                                    defaultRepCountState: number,
                                    exerciseTypesState: string[],
                                    priorSessionWeightState: number[][] | undefined,
                                    priorSessionRepsState: number[][] | undefined,
                                    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                                    setCountState: number[],
                                    setSetCountState: Dispatch<SetStateAction<number[]>>,
                                    defaultWeightState: number,
                                    addOrSelectExerciseState: number[],
                                    setAddOrSelectExerciseState: Dispatch<SetStateAction<number[]>>,
                                    setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>}){

    let priorSessionSetsSelectorsDefaultValue: number[] = [];

    if (priorSessionRepsState !== undefined){
        for (let i = 0; i < priorSessionRepsState.length; i++){
            priorSessionSetsSelectorsDefaultValue[i] = priorSessionRepsState[i].length || 2;
        }
    }


    let exercisesComponents: JSX.Element[] =
        Array.from({length: currentNumberOfExercisesState}, (_v, k) => {
            return (
                <div key={k} className={"exerciseGroupData"}>
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
                        setPriorSessionWeightState = {setPriorSessionWeightState}
                        parentInstance = {k}
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
                         priorSessionSetsSelectorDefaultValue, setPriorSessionWeightState, parentInstance}:
                         {defaultRepCountState: number,
                             priorSessionWeightState: number[] | undefined,
                             priorSessionRepsState: number[] | undefined,
                             setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                             setCount: number,
                             setCountState: number[],
                             setSetCountState: Dispatch<SetStateAction<number[]>>,
                             instance: number,
                             defaultWeightState: number,
                             priorSessionSetsSelectorDefaultValue: number,
                             setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
                             parentInstance: number}){

    const [intermediateRepsState, setIntermediateRepsState] = useState<number[] | undefined>
        (priorSessionRepsState || undefined);

    //cc(setCount)

    let repCountersForThisSet: JSX.Element[], setCountOptions: JSX.Element[];
    [repCountersForThisSet, setCountOptions] = getRepCounters(intermediateRepsState, priorSessionWeightState,
        defaultWeightState, setCount, defaultRepCountState, setPriorSessionWeightState, parentInstance);


    return (<>
        <br />
        <span className={"inputTitleSideBySide"}>Sets</span>
        <select defaultValue={priorSessionSetsSelectorDefaultValue || 3} onChange={(e) => {
            e.preventDefault();
            handleSetsSelectorChange(setIntermediateRepsState, intermediateRepsState, +e.target.value, instance,
                defaultWeightState, setSetCountState);
        }}>{setCountOptions}
        </select>
        {repCountersForThisSet}
    </>);
}

export default Exercises;