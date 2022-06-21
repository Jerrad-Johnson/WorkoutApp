import {ReactElement, useState} from "react";
let cc: any = console.log;

function Home(){

    const [numberOfExercisesState, setNumberOfExercisesState] = useState<number>(4);

    return(
      <div className={""}>
        <form>
            <span className={"inputTitle"}>New Entry</span>
            <input type={"date"}></input>
            <span className={"inputTitle"}>Number of Exercises</span>
            <select></select>
            <span className={"inputTitle"}>Exercise</span>
            <select>
                <NumberOfExercises
                    numberOfExercisesState = {numberOfExercisesState}
                />
            </select>
            <select>
                <option>Chest Press</option>
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

    let exerciseOptions: JSX.Element[] = numberOfExercisesAsArray.map((e: number, k: number) => {
       return (
            <option key={k}>{e}</option>
       )
    });

    return (<>{exerciseOptions}</>);
}

export default Home;