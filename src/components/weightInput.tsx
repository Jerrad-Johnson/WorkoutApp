import {Dispatch, SetStateAction} from "react";

let cc = console.log;


export function WeightInput({singlePriorSessionWeightState, defaultWeightState, setPriorSessionWeightState,
                                parentInstance, instance, originalPriorSessionWeightState}: {

                                    singlePriorSessionWeightState: number,
                                    defaultWeightState: number,
                                    setPriorSessionWeightState: Dispatch<SetStateAction<number[][]>>,
                                    parentInstance: number,
                                    instance: number,
                                    originalPriorSessionWeightState: number[][] }){

    return (<>
        <input type={"number"} value={singlePriorSessionWeightState} className={"weightGroupData"}
               onChange={(e) => {
            //@ts-ignore
            setPriorSessionWeightState((prev) => { //@ts-ignore
                    prev[parentInstance][instance] = e.target.value;
                    setPriorSessionWeightState(prev);
            })
            //@ts-ignore
        }}/>
    </>)
}
