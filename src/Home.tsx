import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Exercises from "./components/Exercises";
import NumberOfExercises from "./components/NumberOfExercises";
import {todaysDateForHTMLCalendar, getSessionFromDom, getSessionDOMElements} from "./utils/collective";
import {submitSession, login, getExercises, getRecentSessions, getSpecificSession} from "./utils/queries";
import {submissionData, exercises, specificSessionInput} from "./utils/interfaces";
import {isEmptyArray} from "./utils/genericFunctions";
let cc = console.log;


function Home(){
    //const [exercisesPresetState, setExercisesPresetState] = useState<string[]>([]);
    const [currentNumberOfExercisesState, setCurrentNumberOfExercisesState] = useState<number>(2);
    const [exerciseTypesState, setExerciseTypesState] = useState<string[]>([]);
    const [defaultRepCountState, setDefaultRepCountState] = useState<number>(5);
    const [priorSessionWeightState, setPriorSessionWeightState] = useState<number[][] | undefined>(/*[[100, 200, 250], [109, 110, 111, 150]]*/);
    const [priorSessionRepsState, setPriorSessionRepsState] = useState<number[][] | undefined>(/*[[5, 2, 2, 2], [5, 7, 7, 7], [1, 1, 2]]*/);
    const [priorSessionNumberOfExercisesState, setPriorSessionNumberOfExercisesState] = useState<number | undefined>();
    const [priorSessionTitle, setPriorSessionTitle] = useState<string | undefined>();
    const [priorSessionTitlesAndDatesState, setPriorSessionTitlesAndDatesState] = useState<string[]>([]);
    const [setCountState, setSetCountState] = useState<number[]>([3, 3]);
    const [userDefinedDefaultSetsPerWorkoutState, setUserDefinedDefaultSetsPerWorkoutState] = useState<number>(2);
    const [defaultWeightState, setDefaultWeightState] = useState<number>(100);
    const [addOrSelectExerciseState, setAddOrSelectExerciseState] = useState<number[]>([0, 0]);
    const [initialLoadDataAttemptedState, setInitialLoadDataAttemptedState] = useState<boolean>(false);
    const [initialDateLoadAttemptSucceededState, setInitialDateLoadAttemptSucceededState] = useState<boolean>(false);

    getUserData(setExerciseTypesState, setPriorSessionTitle, setPriorSessionNumberOfExercisesState,
        setPriorSessionRepsState, setPriorSessionWeightState, initialLoadDataAttemptedState,
        setInitialLoadDataAttemptedState, setInitialDateLoadAttemptSucceededState, setPriorSessionTitlesAndDatesState);

    return(
      <div className={""}>
        <br />
        <form>
            <Options
                initialDateLoadAttemptSucceededState = {initialDateLoadAttemptSucceededState}
                priorSessionTitlesAndDatesState = {priorSessionTitlesAndDatesState}
                setPriorSessionWeightState = {setPriorSessionWeightState}
                setPriorSessionRepsState = {setPriorSessionRepsState}
                setPriorSessionNumberOfExercisesState = {setPriorSessionNumberOfExercisesState}
                setPriorSessionTitle = {setPriorSessionTitle}
                setSetCountState = {setSetCountState}
                setCurrentNumberOfExercisesState = {setCurrentNumberOfExercisesState}

            />
            <NewEntryTitleAndDate
                priorSessionTitle = {priorSessionTitle} />
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
                setPriorSessionWeightState = {setPriorSessionWeightState}
            />
            <SubmitButton />
        </form>
      </div>
    ); //TODO Add a Notes field, auto-increment upon last session's weights
}

function Options({initialDateLoadAttemptSucceededState,
                     priorSessionTitlesAndDatesState,
                     setPriorSessionWeightState,
                     setPriorSessionRepsState,
                     setPriorSessionNumberOfExercisesState,
                     setPriorSessionTitle,
                     setSetCountState,
                     setCurrentNumberOfExercisesState}: {
    initialDateLoadAttemptSucceededState: boolean,
    priorSessionTitlesAndDatesState: string[],
    setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
    setPriorSessionNumberOfExercisesState: Dispatch<SetStateAction<number | undefined>>,
    setPriorSessionTitle: Dispatch<SetStateAction<string | undefined>>,
    setSetCountState: Dispatch<SetStateAction<number[]>>,
    setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>
    }){

    if (initialDateLoadAttemptSucceededState){
        return (
          <PreviousSessionSelector
              priorSessionTitlesAndDatesState = {priorSessionTitlesAndDatesState}
              setPriorSessionWeightState = {setPriorSessionWeightState}
              setPriorSessionRepsState = {setPriorSessionRepsState}
              setPriorSessionNumberOfExercisesState = {setPriorSessionNumberOfExercisesState}
              setPriorSessionTitle = {setPriorSessionTitle}
              setSetCountState = {setSetCountState}
              setCurrentNumberOfExercisesState = {setCurrentNumberOfExercisesState}
          />
        );
    } else {
        return (<></>);
    }
}

function PreviousSessionSelector({priorSessionTitlesAndDatesState,
                                     setPriorSessionWeightState,
                                     setPriorSessionRepsState,
                                     setPriorSessionNumberOfExercisesState,
                                     setPriorSessionTitle,
                                     setSetCountState,
                                     setCurrentNumberOfExercisesState }: {
    priorSessionTitlesAndDatesState: string[],
    setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
    setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
    setPriorSessionNumberOfExercisesState: Dispatch<SetStateAction<number | undefined>>,
    setPriorSessionTitle: Dispatch<SetStateAction<string | undefined>>,
    setSetCountState: Dispatch<SetStateAction<number[]>>,
    setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>>}){

    if (priorSessionTitlesAndDatesState?.length > 0){
        let listOfPreviousSessions = priorSessionTitlesAndDatesState?.map((e, k) => {
           return (
               <option key={k}>{e}</option>
           );
        });

        return (<div>
            <select className={"previousSessionSelector"}>
                {listOfPreviousSessions}
            </select>
            <button onClick={(e) => {
                e.preventDefault();
                handleLoadSession(setPriorSessionWeightState, setPriorSessionRepsState,
                    setPriorSessionNumberOfExercisesState, setPriorSessionTitle, setSetCountState,
                    setCurrentNumberOfExercisesState);
            }}>Load</button>
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
    let submission: submissionData = getSessionFromDom();
    submitSession(submission);
}

async function handleLoadSession(setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
                                 setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                                 setPriorSessionNumberOfExercisesState: Dispatch<SetStateAction<number | undefined>>,
                                 setPriorSessionTitle: Dispatch<SetStateAction<string | undefined>>,
                                 setSetCountState: Dispatch<SetStateAction<number[]>>,
                                 setCurrentNumberOfExercisesState: Dispatch<SetStateAction<number>> ){
    let previousSessionSelector: HTMLSelectElement | null = document.querySelector(".previousSessionSelector");
    let previousSessionTitle: string | undefined = previousSessionSelector?.value;

    if (previousSessionTitle !== undefined) {
        let splitTitleAndDate: string | string[] = previousSessionTitle.split(" - ");
        let sessionTitle = splitTitleAndDate[0];
        let sessionDate = splitTitleAndDate[1];
        let specificSessionResponse: any = await getSpecificSession(sessionDate, sessionTitle); //TODO update type

        let sessionWeights: number[][] = [];
        let sessionReps: number[][] = [];
        let sessionExercises: string[] = [];
        let sessionSets: number[] = [];

        for (let i = 0; i < specificSessionResponse.data.length; i++){ // @ts-ignore
            sessionWeights[i] = specificSessionResponse.data[i].weight_lifted.split(","); // @ts-ignore
            sessionReps[i] = specificSessionResponse.data[i].reps.split(",");
            sessionSets[i] = sessionReps[i].length;
            sessionExercises[i] = specificSessionResponse.data[i].exercise;
        }

        setPriorSessionWeightState(sessionWeights);
        setSetCountState(sessionSets);
        setPriorSessionTitle(sessionTitle)
        setPriorSessionRepsState(sessionReps);
        setCurrentNumberOfExercisesState(sessionExercises.length);
    }
}

async function getUserData(setExerciseTypesState: Dispatch<SetStateAction<string[]>>,
                           setPriorSessionTitle: Dispatch<SetStateAction<string | undefined>>,
                           setPriorSessionNumberOfExercisesState: Dispatch<SetStateAction<number | undefined>>,
                           setPriorSessionRepsState: Dispatch<SetStateAction<number[][] | undefined>>,
                           setPriorSessionWeightState: Dispatch<SetStateAction<number[][] | undefined>>,
                           initialLoadDataAttemptedState: boolean,
                           setInitialLoadDataAttemptedState: Dispatch<SetStateAction<boolean>>,
                           setInitialDateLoadAttemptSucceededState: Dispatch<SetStateAction<boolean>>,
                           setPriorSessionTitlesAndDatesState: Dispatch<SetStateAction<string[]>>, ){

    if (initialLoadDataAttemptedState === false){
        setInitialLoadDataAttemptedState(true);

        let exerciseQueryResponse: exercises = await getExercises(); // @ts-ignore
        let exerciseList: string[] = exerciseQueryResponse?.data;
        let mostRecentSessions = await getRecentSessions();
        let convertedDateFormat: string[] = []

        for (let i = 0; i < mostRecentSessions.data.length; i++){
            convertedDateFormat[i] = mostRecentSessions.data[i].session_date.replaceAll("-", "/");
        }

        let listOfSessionsWithDate: string[] = [];

        for (let i = 0; i < mostRecentSessions.data.length; i++){
            listOfSessionsWithDate[i] = mostRecentSessions.data[i].session_title + " - " + convertedDateFormat[i];
        }

        setExerciseTypesState(exerciseList);
        setInitialDateLoadAttemptSucceededState(true);
        setPriorSessionTitlesAndDatesState(listOfSessionsWithDate)
    }
}


export default Home;