import {Dispatch, SetStateAction, useState} from "react";
let cc = console.log;

function Home(){
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(4);
    const [defaultNumberOfExercisesState, setDefaultNumberOfExercisesState] = useState<number>(4);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Please Choose"]);
    const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [serverResponseState, setServerResponseState] = useState<string>("Awaiting response...");

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
            />
            <br />
        </form>
      </div>
    );
}

function ExercisesComponent({currentNumberOfExercisesState, defaultRepCountState, exerciseTypesState}:
                                {currentNumberOfExercisesState: number, defaultRepCountState: number,
                                    exerciseTypesState: string[]}){
    let exercisesComponents: JSX.Element[] =
        Array.from({length: currentNumberOfExercisesState}, (_v, k) => {
        return (
            <div key={k}>
                <span className={"inputTitleSideBySide"}>Exercise -- </span>
                <span className={"inputTitleSideBySide"}>Sets -- </span>
                <span className={"inputTitleSideBySide"}>Reps </span>
                <br />
                <select className={"genericSelectorLongSideBySide"}>
                    <TypesOfExercises
                        exerciseTypesState = {exerciseTypesState}
                    />
                </select>

                <select defaultValue={defaultRepCountState} className={"genericSelectorShortSideBySide " +
                    "secondSideBySideSelector"}>
                    <RepCount/>
                </select>
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

    return (<>{listOfExercises}</>)
}

function RepCount(){
    let maxRepCount: number[] = [];

    for (let i = 0; i < 20; i++){
        maxRepCount[i] = i+1;
    }

    let repCountOptions: JSX.Element[] = maxRepCount.map((e: number, k: number ) => {
        return (
            <option key={k}>{e}</option>
        );
    });

    return (<>{repCountOptions}</>);
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