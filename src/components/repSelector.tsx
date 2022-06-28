import {JSX} from "cypress/react";

export function RepSelector({repCountState}: {repCountState: number}){
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
            "secondSideBySideSelector repGroupData"}>
            {repCountOptions}
        </select>
    );
}
