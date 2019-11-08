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
                name: formData.get('monster-name'),
                typeId: parseInt(formData.get('alignment-id')),
                url: formData.get('url'), //??? url from form or response from server?
                hp: parseInt(formData.get('hp')),
                isLegendary: formData.get('is-legendary') === 'on'
            };

        }//ends event listener
    }; // ends onRender





} //ends MonsterForm Component