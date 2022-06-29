import {submissionData} from "./interfaces";
let cc = console.log;

export function login() {
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

export function submitSession(entries: submissionData) {
    fetch("http://localhost:80/php/sessionentry.php", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(entries),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => cc(data));
}


export function getExercises(){
    let dataToBeReturned = fetch("http://localhost:80/php/getexercises.php", {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(response => response.json())
            .then(data => data);

    return dataToBeReturned;
}
