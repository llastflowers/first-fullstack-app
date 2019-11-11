import Component from '../Component.js';
import Header from '../common/Header.js';
import MonsterList from './MonsterList.js';
import { getMonsters } from '../services/monsters-api.js'; 

class MonsterListApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'D&D MONSTERS' });
        dom.prepend(header.renderDOM());

        const list = new MonsterList({ monsters: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

        getMonsters().then(monsters => {
            list.update({ monsters });
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main></main>
            </div>
        `;
    }
}

export default MonsterListApp;