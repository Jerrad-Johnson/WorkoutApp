import {Dispatch, SetStateAction, useState} from "react";
let cc = console.log;

function Home(){
    //const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(2);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Please Choose"]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [priorSessionWeightState, setPriorSessionWeightState] = useState<number[][] | undefined>(/*[[100, 200, 250], [109, 110, 111, 150]]*/);
    const [priorSessionRepsState, setPriorSessionRepsState] = useState<number[][] | undefined>(/*[[5, 2, 2, 2], [5, 7, 7, 7], [1, 1, 2]]*/);
    const [priorSessionNumberOfExercisesState, setPriorSessionNumberOfExercisesState] = useState<number | undefined>();
    const [priorSessionTitle, setPriorSessionTitle] = useState<string | undefined>();
    const [setCountState, setSetCountState] = useState<number[]>([2, 2]);
    const [userDefinedDefaultSetsPerWorkoutState, setUserDefinedDefaultSetsPerWorkoutState] = useState<number>(2);
    const [defaultWeightState, setDefaultWeightState] = useState<number>(100);

    return(
      <div className={""}>
        <br />
        <form>
            <PreviousSessionSelector />
            <NewEntryTitleAndDate priorSessionTitle = {priorSessionTitle} />
            <NumberOfExercises
                currentNumberOfExercisesState = {currentNumberOfExercisesState}
                defaultRepCountState = {defaultRepCountState}
                setCurrentNumberOfExercisesState = {setCurrentNumberOfExercisesState}
                setCountState = {setCountState}
                setSetCountState = {setSetCountState}
                userDefinedDefaultSetsPerWorkoutState = {userDefinedDefaultSetsPerWorkoutState}
                priorSessionNumberOfExercisesState = {priorSessionNumberOfExercisesState}
            />
            <ExercisesComponent
                currentNumberOfExercisesState = {currentNumberOfExercisesState}
                defaultRepCountState = {defaultRepCountState}
                exerciseTypesState = {exerciseTypesState}
                priorSessionWeightState = {priorSessionWeightState}
                priorSessionRepsState = {priorSessionRepsState}
                setPriorSessionRepsState = {setPriorSessionRepsState}
                setCountState = {setCountState}
                setSetCountState = {setSetCountState}
                defaultWeightState = {defaultWeightState}
            />
        </form>
      </div>
    );
}

function PreviousSessionSelector(){
    let listOfPreviousSessions: string[] = []; //TODO

    if (listOfPreviousSessions.length > 0){
        return (<div>
            <select>
                {listOfPreviousSessions}
            </select>
        </div>);
    } else {
        return (<></>);
    }
}

function NewEntryTitleAndDate({priorSessionTitle}: {priorSessionTitle: string | undefined}){
    let date: string = todaysDateForHTMLCalendar();

    return (<div>
            <input type={"text"} defaultValue={priorSessionTitle || "Session Title"} className={"sessionTitle"}></input>
            <span className={"inputTitle"}>New Entry Date</span>
            <input type={"date"} defaultValue={date} className={"sessionDate"}></input>
        </div>
    );
}

function NumberOfExercises({currentNumberOfExercisesState, defaultRepCountState, setCurrentNumberOfExercisesState,
                               setCountState, setSetCountState, userDefinedDefaultSetsPerWorkoutState,
                               priorSessionNumberOfExercisesState}:
                               {currentNumberOfExercisesState: number,
                                   defaultRepCountState: number,
                                   setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>,
                                   setCountState: number[],
                                   setSetCountState: Dispatch<SetStateAction<number[]>>,
                                   userDefinedDefaultSetsPerWorkoutState: number,
                                   priorSessionNumberOfExercisesState: number | undefined
                               }){
    let exerciseOptionCount: JSX.Element[] = Array.from({length: 12}, (_e, k) => {
        return (
            <option key={k}>{k+1}</option>
        );
    });

    return (<>
            <span className={"inputTitle"}>Number of Exercises in This Workout</span>
            <select defaultValue={priorSessionNumberOfExercisesState || currentNumberOfExercisesState} className={"genericSelectorShort"} // priorSessionNumberOfExercisesState
                    onChange={(e) => {
                        e.preventDefault();
                        handleChangeNumberOfExercises(setCurrentNumberOfExercisesState, setCountState, setSetCountState,
                            +e.target.value, userDefinedDefaultSetsPerWorkoutState);
                    }}>
                {exerciseOptionCount}
            </select>
        </>
    );
}


function ExercisesComponent({currentNumberOfExercisesState, defaultRepCountState, exerciseTypesState,
                                priorSessionWeightState, priorSessionRepsState, setPriorSessionRepsState,
                                setCountState, setSetCountState, defaultWeightState}:
                                {currentNumberOfExercisesState: number,
                                    defaultRepCountState: number,
                                    exerciseTypesState: string[], priorSessionWeightState: number[][] | undefined,
                                    priorSessionRepsState: number[][] | undefined,
                                    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                                    setCountState: number[],
                                    setSetCountState: Dispatch<SetStateAction<number[]>>,
                                    defaultWeightState: number}){

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

function TypesOfExercises({exerciseTypesState}: {exerciseTypesState: string[]}){
    let listOfExercises: JSX.Element[] = exerciseTypesState.map((e: string, k: number) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return (
        <div>
            <span className={"inputTitleSideBySide"}>Exercise  </span>
            <select className={"genericSelectorLongSideBySide exerciseSelector"}>
                {listOfExercises}
            </select>
        </div>
        );
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
        <span className={"inputTitleSideBySide"}>Sets</span>
        <select defaultValue={priorSessionSetsSelectorDefaultValue || 1} onChange={(e) => {
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

function handleChangeNumberOfExercises(setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>,
                                       setCountState: number[], setSetCountState: Dispatch<SetStateAction<number[]>>,
                                       targetValue: number, userDefinedDefaultSetsPerWorkoutState: number){

    let setCountNewLength: number[] = [];

    for (let i = 0; i < targetValue; i++){
        setCountNewLength[i] = setCountState[i] || userDefinedDefaultSetsPerWorkoutState;
    }

    setSetCountState(setCountNewLength);
    setCurrentNumberOfExercisesState(targetValue)
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

function WeightInput({priorSessionWeightState, defaultWeightState}: {priorSessionWeightState: number | undefined, defaultWeightState: number}){
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