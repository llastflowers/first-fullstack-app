import Component from '../Component.js';
import Header from '../common/Header.js';
import MonsterForm from './MonsterForm.js';
import { getOneMonster } from '../services/monsters-api.js';

class MonsterFormApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'D&D MONSTERS' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const alignments = await getOneMonster();
        const monsterForm = new MonsterForm({ alignments });
        main.appendChild(monsterForm.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default MonsterFormApp;