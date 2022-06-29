import {submissionData} from "./interfaces";

export function todaysDateForHTMLCalendar(){
    let date: Date = new Date();
    let DD: number | string = date.getDate();
    if (DD < 10) DD = ("0" + DD);
    let MM: number | string = date.getMonth() +1;
    if (MM < 10) MM = ("0" + MM);
    let yyyy: number = date.getFullYear()

    return (`${yyyy}-${MM}-${DD}`);
}

export function getSessionFromDom(){
    let session: submissionData = {};
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

    session.title = title?.value;
    session.date = date?.value;
    session.exercises = [];
    session.reps = repData;
    session.weights = weightData;

    for (let i = 0; i < exerciseNames.length; i++){
        session.exercises[i] = exerciseNames[i].value || null;
    }

    return session;
}

export function getSessionDOMElements(){
    let title: HTMLInputElement | null = document.querySelector(".sessionTitle");
    let exerciseNames: NodeListOf<HTMLSelectElement> | null = document.querySelectorAll('.exerciseSelector');
    let groupData: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.exerciseGroupData');
    let repSelectors: Array<NodeList | undefined | null> = [];
    let weightSelectors: Array<NodeList | undefined | null> = [];

    return [title, exerciseNames, groupData, repSelectors, weightSelectors]
}