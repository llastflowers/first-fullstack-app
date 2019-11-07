import Component from '../Component.js';
import Header from '../common/Header.js';
import { getMonsters } from '../services/monsters-api.js';

class MonsterListApp extends Component {

    onRender(dom) {
        const header = new Header({ title: 'List of Cats' });
        dom.prepend(header.renderDOM());

        const list = new CatList({ cats: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

        getCats().then(cats => {
            list.update({ cats });
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

export default CatListApp;