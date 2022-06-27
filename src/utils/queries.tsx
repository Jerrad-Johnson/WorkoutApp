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

export function submitSession({serverResponseState}: {serverResponseState: string}) {
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