import {Dispatch, SetStateAction} from "react";

let cc = console.log;

export function WeightInput({priorSessionWeightState, defaultWeightState, setPriorSessionWeightState,
                                parentInstance, instance}: {
                                    priorSessionWeightState: number | undefined,
                                    defaultWeightState: number,
                                    setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
                                    parentInstance: number,
                                    instance: number }){
    return (<>
        <input type={"text"} value={priorSessionWeightState || defaultWeightState} className={"weightGroupData"}/>
    </>)
}
