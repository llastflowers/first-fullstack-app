const URL = '/api';

export async function getMonsters() {
    const url = `${URL}/monsters`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}