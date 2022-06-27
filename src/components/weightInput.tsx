export function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number | undefined, defaultWeightState: number}){
    return (<>
        <input type={"text"} defaultValue={priorSessionWeightState || defaultWeightState}
               onChange={(e)  => {
                   e.preventDefault();
               }} />
    </>)
}
