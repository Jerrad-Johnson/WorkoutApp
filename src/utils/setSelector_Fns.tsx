import {JSX} from "cypress/react";
import {Dispatch, SetStateAction} from "react";
import {handleSetPriorRepCountState} from "./typesOfExercises_Fns";
import {WeightInput} from "../components/weightInput";
import {RepSelector} from "../components/repSelector";
let cc = console.log;

export function getRepCounters(intermediateRepsState: number[] | undefined,
                        priorSessionWeightState: number[] | undefined,
                        defaultWeightState: number,
                        setCount: number,
                        defaultRepCountState: number,
                        setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
                        parentInstance: number){

    let maxSetCount: number[] = [];
    let numberOfCountersForThisSet: number[] = [];

    for (let i = 0; i < 12; i++){
        maxSetCount[i] = i+1;
    }

    if (intermediateRepsState !== undefined){
        for (let i = 0; i < intermediateRepsState.length; i++){
            numberOfCountersForThisSet[i] = i+1;
        }
        console.log(5);
        var repCountersForThisSet = numberOfCountersForThisSet.map((e, k) => {
            return (
                <div key={k}>
                    <span className={"inputTitleSideBySide "}>Reps </span>
                    <RepSelector repCountState = {intermediateRepsState[k]} />
                    <br />
                    <span className={"inputTitleSideBySide"}>Weight </span>
                    <WeightInput
                        priorSessionWeightState = {priorSessionWeightState?.[k]}
                        defaultWeightState = {defaultWeightState}
                        setPriorSessionWeightState = {setPriorSessionWeightState}
                        parentInstance = {parentInstance}
                        instance = {k}
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
                        setPriorSessionWeightState = {setPriorSessionWeightState}
                        parentInstance = {parentInstance}
                        instance = {k}
                    />
                </div>
            );
        });
    }

    cc(intermediateRepsState)

    let setCountOptions: JSX.Element[] = maxSetCount.map((e: number, k: number ) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return [repCountersForThisSet, setCountOptions];
}

export function handleSetsSelectorChange(setIntermediateRepsState: Dispatch<SetStateAction<number[] | undefined>>,
                                  intermediateRepsState: number[] | undefined, value: number, instance: number,
                                  defaultWeightState: number, setSetCountState: Dispatch<SetStateAction<number[]>>){

    if (intermediateRepsState !== undefined) {
        handleSetPriorRepCountState(setIntermediateRepsState, value, intermediateRepsState, defaultWeightState);
    } else {
        setSetCountState(prev => prev.map((num: number, index: number) => instance === index ? value : num));
    }
}



