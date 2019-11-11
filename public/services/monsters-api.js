const URL = '/api';

export async function getMonsters() {
    const url = `${URL}/monsters`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getOneMonster(id) {
    const url = `${URL}/monsters/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function addMonster(monster) {
    const url = `${URL}/monsters`;
//the following line is giving error?
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

//hits alignment endpoint
export async function getAlignments() {
    const url = `${URL}/alignments`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}