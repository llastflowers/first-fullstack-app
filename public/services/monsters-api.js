const URL = '/api';

export async function getMonsters() {
    const url = `${URL}/monsters`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export function getOneMonster(id) {  
    const url = `${URL}/monsters/${id}`;
    return fetch(url)
        .then(response => response.json());
}

export async function addMonster(monster) {
    const url = `${URL}/monsters`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monster)
    });

    const data = await response.json();
    return data;
}