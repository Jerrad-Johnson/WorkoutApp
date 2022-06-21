import {Dispatch, SetStateAction, useState} from "react";
let cc = console.log;

function Home(){
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(4);
    const [defaultNumberOfExercisesState, setDefaultNumberOfExercisesState] = useState<number>(4);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Please Choose"]);
    const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);

    let date: string = todaysDateForHTMLCalendar()

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
                                {currentNumberOfExercisesState: number, defaultRepCountState: number, exerciseTypesState: string[]}){
    let exercisesComponents: JSX.Element[] = Array.from({length: currentNumberOfExercisesState}, (_v, k) => {
        return (
            <div key={k}>
                <span className={"inputTitleSideBySide"}>Exercise -- </span>
                <span className={"inputTitleSideBySide"}>Reps </span>
                <br />
                <select className={"genericSelectorLongSideBySide"}>
                    <TypesOfExercises
                        exerciseTypesState = {exerciseTypesState}
                    />
                </select>

                <select defaultValue={defaultRepCountState} className={"genericSelectorShortSideBySide secondSideBySideSelector"}>
                    <RepCount/>
                </select>
            </div>
        );
    });

return (<>{exercisesComponents}</>);

}

function NumberOfExercises({currentNumberOfExercisesState, defaultRepCountState, setCurrentNumberOfExercisesState, defaultNumberOfExercisesState}:
                           {currentNumberOfExercisesState: number, defaultRepCountState: number, setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>, defaultNumberOfExercisesState: number}){
    let exerciseOptionCount: JSX.Element[] = Array.from({length: 12}, (_e, k) => {
       return (
            <option key={k}>{k+1}</option>
       );
    });

    return (<>
                <span className={"inputTitle"}>Number of Exercises in This Workout</span>
                <select defaultValue={defaultNumberOfExercisesState} className={"genericSelectorShort"} onChange={(e) => {
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


export default Home;