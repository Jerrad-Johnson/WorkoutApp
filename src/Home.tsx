import {Dispatch, SetStateAction, useState} from "react";
let cc = console.log;

function Home(){
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(4);
    const [defaultNumberOfExercisesState, setDefaultNumberOfExercisesState] = useState<number>(4);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Please Choose"]);
    const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [serverResponseState, setServerResponseState] = useState<string>("Awaiting response...");
    const [priorSessionWeightState, setPriorSessionWeightState] = useState<number[][]>([[150, 110, 150, 150], [120, 120, 120], [120, 120, 120], [120, 120, 120]]);
    const [priorSessionRepsState, setPriorSessionRepsState] = useState<number[][] | undefined>([[5, 5, 5, 5], [10, 10, 10, 10], [5, 5, 4], [9, 8, 7, 6]]);


    let date: string = todaysDateForHTMLCalendar();

    return(
      <div className={""}>
        <form>
            <span className={"inputTitle"}>New Entry Date</span>
            <input type={"date"} defaultValue={date}></input>

            <NumberOfExercises
                currentNumberOfExercisesState = {currentNumberOfExercisesState}
                defaultRepCountState = {defaultRepCountState}
                setCurrentNumberOfExercisesState = {setCurrentNumberOfExercisesState}
                defaultNumberOfExercisesState = {defaultNumberOfExercisesState}
            />
            <ExercisesComponent
                currentNumberOfExercisesState = {currentNumberOfExercisesState}
                defaultRepCountState = {defaultRepCountState}
                exerciseTypesState = {exerciseTypesState}
                priorSessionWeightState = {priorSessionWeightState}
                priorSessionRepsState = {priorSessionRepsState}
                setPriorSessionRepsState = {setPriorSessionRepsState}
            />
            <br />
        </form>
      </div>
    );
}

function ExercisesComponent({currentNumberOfExercisesState, defaultRepCountState, exerciseTypesState,
                                priorSessionWeightState, priorSessionRepsState, setPriorSessionRepsState}:
                                {currentNumberOfExercisesState: number, defaultRepCountState: number,
                                    exerciseTypesState: string[], priorSessionWeightState: number[][],
                                    priorSessionRepsState: number[][] | undefined,
                                    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>}){

    let exercisesComponents: JSX.Element[] =
        Array.from({length: currentNumberOfExercisesState}, (_v, k) => {
        return (
            <div key={k}>
                <span className={"inputTitleSideBySide"}>Exercise -- </span>
                <span className={"inputTitleSideBySide"}>Sets -- </span>
                <span className={"inputTitleSideBySide"}>Reps </span>
                <br />
                <TypesOfExercises
                    exerciseTypesState = {exerciseTypesState}
                />
                <SetSelector
                    defaultRepCountState = {defaultRepCountState}
                    priorSessionWeightState = {priorSessionWeightState[k]}
                    priorSessionRepsState = {priorSessionRepsState?.[k]}
                    setPriorSessionRepsState = {setPriorSessionRepsState}
                />

            </div>
        );
    });

return (<>{exercisesComponents}</>);

}

function NumberOfExercises({currentNumberOfExercisesState, defaultRepCountState, setCurrentNumberOfExercisesState,
                               defaultNumberOfExercisesState}:
                           {currentNumberOfExercisesState: number,
                               defaultRepCountState: number,
                               setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>,
                               defaultNumberOfExercisesState: number}){
    let exerciseOptionCount: JSX.Element[] = Array.from({length: 12}, (_e, k) => {
       return (
            <option key={k}>{k+1}</option>
       );
    });

    return (<>
                <span className={"inputTitle"}>Number of Exercises in This Workout</span>
                <select defaultValue={defaultNumberOfExercisesState} className={"genericSelectorShort"}
                        onChange={(e) => {
                    e.preventDefault();
                    setCurrentNumberOfExercisesState(+e.target.value);
                }}>
                    {exerciseOptionCount}
                </select>
            </>
    );
}

function TypesOfExercises({exerciseTypesState}: {exerciseTypesState: string[]}){
    let listOfExercises: JSX.Element[] = exerciseTypesState.map((e: string, k: number) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return (
        <select className={"genericSelectorLongSideBySide"}>
            {listOfExercises}
        </select>
        )
}

function SetSelector({defaultRepCountState, priorSessionWeightState, priorSessionRepsState, setPriorSessionRepsState}:
                         {defaultRepCountState: number, priorSessionWeightState: number[],
                             priorSessionRepsState: number[] | undefined,
                             setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>}){

    const [setCountState, setSetCountState] = useState<number>(1);
    const [defaultWeightState, setDefaultWeightState] = useState<number>(100);
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
                    <RepSelector
                        repCountState = {intermediateRepsState[k]}
                    />
                    <WeightInput
                        priorSessionWeightState = {priorSessionWeightState[k]}
                        defaultWeightState = {defaultWeightState}
                    />
                </div>
            );
        });

    } else {

        for (let i = 0; i < setCountState; i++){
            numberOfCountersForThisSet[i] = i+1;
        }

        var repCountersForThisSet = numberOfCountersForThisSet.map((e, k) => {
            return (
                <div key={k}>
                    <RepSelector repCountState = {defaultRepCountState} />
                    <WeightInput
                        priorSessionWeightState = {priorSessionWeightState[k]}
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
        <select onChange={(e) => {
            e.preventDefault();
            if (intermediateRepsState !== undefined) {
                handleSetPriorRepCountState(setIntermediateRepsState, +e.target.value, intermediateRepsState,
                    defaultWeightState);

            } else {
                setSetCountState(+e.target.value);
            }
        }}>{setCountOptions}
        </select>
        {repCountersForThisSet}
    </>);
}

function handleSetPriorRepCountState(setIntermediateRepsState: Dispatch<SetStateAction<number[] | undefined>>,
                                     newCount: number, intermediateRepsState: number[], defaultWeightState: number){
    let newRepCounts: number[] = [];

    for (let i = 0; i < newCount; i++){
        newRepCounts[i] = intermediateRepsState[i] || defaultWeightState;
    }

    setIntermediateRepsState(newRepCounts);
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

function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number, defaultWeightState: number}){
    return (<>
            <input type={"text"} defaultValue={priorSessionWeightState || defaultWeightState}
                onChange={(e)  => {
                e.preventDefault();
            }} />
    </>)
}

function todaysDateForHTMLCalendar(){
    let date: Date = new Date();
    let DD: number | string = date.getDate();
    if (DD < 10) DD = ("0" + DD);
    let MM: number | string = date.getMonth() +1;
    if (MM < 10) MM = ("0" + MM);
    let yyyy: number = date.getFullYear()

    return (`${yyyy}-${MM}-${DD}`);
}

function login() {
    let entry: object = {
        "password": "abc",
        "username": "elseif",
    };

    fetch("http://localhost:80/php/login.php", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(entry),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json' }
    }).then(response => response.json())
        .then(data => cc(data));
}

function submitSession({serverResponseState}: {serverResponseState: string}) {
    let entries: object[] = [{
        "date": "2022-02-02",
        "title": "Upper Body",
        "exercise": "Chest Press",
        "weightLifted": [150, 150, 150, 150],
        "reps": [10, 10, 10, 10],
    }, {
        "date": "2022-02-02",
        "title": "Upper Body",
        "exercise": "Bicep Curl",
        "weightLifted": [30, 30, 30],
        "reps": [5, 5, 5],
    }];

    fetch("http://localhost:80/php/sessionentry.php", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(entries),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => testMe(data));

    function testMe(data: []) {
        cc(data);
    }
}


export default Home;