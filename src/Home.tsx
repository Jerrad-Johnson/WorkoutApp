import {ReactElement, useState} from "react";
let cc = console.log;

function Home(){

    const [numberOfExercisesState, setNumberOfExercisesState] = useState<number>(4);
    const [defaultNumberOfExercises, setDefaultNumberOfExercises] = useState<number>(4);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Chest Press"]);
    const [defaultRepCount, setDefaultRepCount] = useState<number>(5);

    let date: string = todaysDateForHTMLCalendar()

    return(
      <div className={""}>
        <form>
            <span className={"inputTitle"}>New Entry Date</span>
            <input type={"date"} defaultValue={date}></input>

            <span className={"inputTitle"}>Number of Exercises</span>
            <select defaultValue={defaultNumberOfExercises} className={"genericSelectorShort"}>
                <NumberOfExercises
                    numberOfExercisesState = {numberOfExercisesState}
                />
            </select>

            <br />
            <span className={"inputTitleSideBySide"}>Exercise </span>
            <span className={"inputTitleSideBySide"}>Reps </span>
            <br />
            <select className={"genericSelectorLongSideBySide"}>
                <TypesOfExercises
                    exerciseTypesState = {exerciseTypesState}
                />
            </select>

            <select defaultValue={defaultRepCount} className={"genericSelectorShortSideBySide secondSideBySideSelector"}>
                <RepCount/>
            </select>




        </form>
      </div>
    );
}

function NumberOfExercises({numberOfExercisesState}: {numberOfExercisesState: number}){
    let numberOfExercisesAsArray: number[] = [];

    for (let i = 0; i < numberOfExercisesState;){
        numberOfExercisesAsArray[i] = ++i;
    }

    let exerciseOptionCount: JSX.Element[] = numberOfExercisesAsArray.map((e: number, k: number) => {
       return (
            <option key={k}>{e}</option>
       );
    });

    return (<>{exerciseOptionCount}</>);
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

    for (let i = 0; i < 10; i++){
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
    let date: Date = new Date;
    let DD: number | string = date.getDate();
    if (DD < 10) DD = ("0" + DD);
    let MM: number | string = date.getMonth() +1;
    if (MM < 10) MM = ("0" + MM);
    let yyyy: number = date.getFullYear()

    return (`${yyyy}-${MM}-${DD}`);
}


export default Home;