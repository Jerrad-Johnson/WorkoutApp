let cc = console.log;

export function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number | undefined, defaultWeightState: number}){
    return (<>
        {priorSessionWeightState}
        <input type={"text"} value={priorSessionWeightState || "5"} className={"weightGroupData"} onChange={(e) => {

        }}/>
    </>)
}
