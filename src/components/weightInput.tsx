let cc = console.log;

export function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number | undefined, defaultWeightState: number}){

    cc(priorSessionWeightState)
    return (<>
        <input type={"text"} defaultValue={priorSessionWeightState || defaultWeightState} className={"weightGroupData"}
               onChange={(e)  => {
                   e.preventDefault();
               }} />
    </>)
}
