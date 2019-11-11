import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import MonsterDetail from './MonsterDetail.js';
import { getOneMonster } from '../services/monsters-api.js';

class MonsterDetailApp extends Component {

    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());

        const searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get('id');
        if (!id) {
            window.location = 'monster-list.html';
            return;
        }

        try {
            const monster = await getOneMonster(id);
            const monsterDetail = new MonsterDetail({ monster });
            main.appendChild(monsterDetail.renderDOM());
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <footer><button>Delete Monster</button></footer>
                </main>
            </div>
        `;
    }
}

export default MonsterDetailApp;