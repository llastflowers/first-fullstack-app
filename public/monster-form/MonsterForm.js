import Component from '../Component.js';
import { addMonster } from '../services/monsters-api.js';

class MonsterForm extends Component {

    onRender(form) {
        const hpRange = form.querySelector('#hp');
        const hpDisplay = form.querySelector('#hp-display');
        const syncHp = () => hpDisplay.textContent = hpRange.value;
        hpRange.addEventListener('input', syncHp);
        syncHp();

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);

            const monster = {
                name: formData.get('name'),
                alignment: formData.get('alignment'), //check that this is right
                url: formData.get('url'), 
                hp: parseInt(formData.get('hp')),
                isLegendary: formData.get('is-legendary') === 'on'
            };

            try {
                const saved = await addMonster(monster);
                console.log(saved);

                window.location = `monster-list.html`;
            }
            catch (err) {
                console.log('monster not saved', err);
            }
        });

    }//ends event listener

    renderHTML() {
        const alignments = this.props.alignments;
        const optionsList = alignments.map(alignment => {
            return `<option>${alignment.alignment}</option>`;
        });

        //const joinedOptionsList = optionsList.join('');

        return /*html*/`
            <form class="monster-form">
                <p>
                    <label for="name">Name:</label>
                    <input id="name" name="name">
                </p>
                <p>
                    <label for="alignment">Alignment:</label>
                    <select id="alignment" name="alignment" required>
                        <option disabled selected>Select Alignment</option>
                        ${optionsList}
                    </select>
                </p>
                <p>
                    <label for="url">Image URL:</label>
                    <input id="url" name="url">
                </p>
                <p>
                    <label for="hp">HP:</label>
                    <span class="horizontally-centered">
                        <input id="hp" name="hp" type="range" min="0" max="400" value="0" step="10">
                    <span id="hp-display"></span>
                    </span>
                </p>
                    <fieldset for="is-legendary" class="is-legendary">
                        <legend>Legendary?</legend>
                        <label class="horizontally-centered">
                        <input id="is-legendary" name="is-legendary" type="checkbox"> Yes
                        </label>
                    </fieldset>
                <p>
                    <button id="add-monster">Add Monster</button>
                </p>
            </form>
        `;
    }
}

export default MonsterForm;