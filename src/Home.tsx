import {Dispatch, SetStateAction, useState} from "react";
import Exercises from "./components/Exercises";
import NumberOfExercises from "./components/NumberOfExercises";
import {todaysDateForHTMLCalendar} from "./utils/collective";
let cc = console.log;

function Home(){
    //const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(2);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>(["Chest Press"]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [priorSessionWeightState, setPriorSessionWeightState] = useState<number[][] | undefined>(/*[[100, 200, 250], [109, 110, 111, 150]]*/);
    const [priorSessionRepsState, setPriorSessionRepsState] = useState<number[][] | undefined>(/*[[5, 2, 2, 2], [5, 7, 7, 7], [1, 1, 2]]*/);
    const [priorSessionNumberOfExercisesState, setPriorSessionNumberOfExercisesState] = useState<number | undefined>();
    const [priorSessionTitle, setPriorSessionTitle] = useState<string | undefined>();
    const [setCountState, setSetCountState] = useState<number[]>([3, 3]);
    const [userDefinedDefaultSetsPerWorkoutState, setUserDefinedDefaultSetsPerWorkoutState] = useState<number>(2);
    const [defaultWeightState, setDefaultWeightState] = useState<number>(100);
    const [addOrSelectExerciseState, setAddOrSelectExerciseState] = useState<number[]>([0, 0]);

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
                setAddOrSelectExerciseState = {setAddOrSelectExerciseState}
                addOrSelectExerciseState = {addOrSelectExerciseState}
            />
            <Exercises
                currentNumberOfExercisesState = {currentNumberOfExercisesState}
                defaultRepCountState = {defaultRepCountState}
                exerciseTypesState = {exerciseTypesState}
                priorSessionWeightState = {priorSessionWeightState}
                priorSessionRepsState = {priorSessionRepsState}
                setPriorSessionRepsState = {setPriorSessionRepsState}
                setCountState = {setCountState}
                setSetCountState = {setSetCountState}
                defaultWeightState = {defaultWeightState}
                addOrSelectExerciseState = {addOrSelectExerciseState}
                setAddOrSelectExerciseState = {setAddOrSelectExerciseState}
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

export default Home;