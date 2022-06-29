import {Dispatch, SetStateAction, useState} from "react";
import Exercises from "./components/Exercises";
import NumberOfExercises from "./components/NumberOfExercises";
import {todaysDateForHTMLCalendar} from "./utils/collective";
import {submitSession, login, getExercises, getRecentSessions} from "./utils/queries";
import {submissionData, exercises} from "./utils/interfaces";
import {isEmptyArray} from "./utils/genericFunctions";
let cc = console.log;
var getInitialLoadDataAttempted: boolean = false;

function Home(){
    //const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(2);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[] | undefined>([]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [priorSessionWeightState, setPriorSessionWeightState] = useState<number[][] | undefined>(/*[[100, 200, 250], [109, 110, 111, 150]]*/);
    const [priorSessionRepsState, setPriorSessionRepsState] = useState<number[][] | undefined>(/*[[5, 2, 2, 2], [5, 7, 7, 7], [1, 1, 2]]*/);
    const [priorSessionNumberOfExercisesState, setPriorSessionNumberOfExercisesState] = useState<number | undefined>();
    const [priorSessionTitle, setPriorSessionTitle] = useState<string | undefined>();
    const [setCountState, setSetCountState] = useState<number[]>([3, 3]);
    const [userDefinedDefaultSetsPerWorkoutState, setUserDefinedDefaultSetsPerWorkoutState] = useState<number>(2);
    const [defaultWeightState, setDefaultWeightState] = useState<number>(100);
    const [addOrSelectExerciseState, setAddOrSelectExerciseState] = useState<number[]>([0, 0]);

    getUserData(setExerciseTypesState, setPriorSessionTitle, setPriorSessionNumberOfExercisesState,
        setPriorSessionRepsState, setPriorSessionWeightState);

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
                defaultRepCountState = {defaultRepCountState} // @ts-ignore
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
            <SubmitButton />
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

function SubmitButton(){
    return(
        <button onClick={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>Submit</button>
    )
}

function handleSubmit(){
    let submission: submissionData = {};
    let title: HTMLInputElement | null = document.querySelector(".sessionTitle");
    let date: HTMLDataElement | null = document.querySelector('.sessionDate');
    let exerciseNames: NodeListOf<HTMLSelectElement> | null = document.querySelectorAll('.exerciseSelector');
    let groupData: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.exerciseGroupData');
    let repSelectors: Array<NodeList | undefined | null> = [];
    let repData: number[][] | undefined = [];
    let weightSelectors: Array<NodeList | undefined | null> = [];
    let weightData: number[][] | undefined = [];

    for (let i = 0; i < groupData?.length; i++){
        repSelectors[i] = groupData[i].querySelectorAll(".repGroupData");
        weightSelectors[i] = groupData[i].querySelectorAll(".weightGroupData");
    }

    for (let i = 0; i < repSelectors.length; i++) {
        repData[i] = [];
        weightData[i] = []; // @ts-ignore
        for (let j = 0; j < repSelectors[i]?.length; j++) { // @ts-ignore
            repData[i][j] = +repSelectors[i][j]?.value || undefined; // @ts-ignore
            weightData[i][j] = +weightSelectors[i][j]?.value || undefined;
        }
    }

    submission.title = title?.value;
    submission.date = date?.value;
    submission.exercises = [];
    submission.reps = repData;
    submission.weights = weightData;

    for (let i = 0; i < exerciseNames.length; i++){
        submission.exercises[i] = exerciseNames[i].value || null;
    }

    submitSession(submission);

}

async function getUserData(setExerciseTypesState: Dispatch<SetStateAction<string[] | undefined>>,
                           setPriorSessionTitle: Dispatch<SetStateAction<string | undefined>>,
                           setPriorSessionNumberOfExercisesState: Dispatch<SetStateAction<number | undefined>>,
                           setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                           setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>> ){

    if (getInitialLoadDataAttempted === false){
        let exerciseQueryResponse: exercises = await getExercises(); // @ts-ignore
        let exerciseList: string[] = exerciseQueryResponse?.data;
        setExerciseTypesState(exerciseList);
        getInitialLoadDataAttempted = true;

        let mostRecentSessions = await getRecentSessions();
    }


}

export default Home;