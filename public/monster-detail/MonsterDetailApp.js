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
        const monster = this.props.monster;

        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                <section class="monster-item">
                <h2>${monster.name}</h2>
                <div class="image-container">
                    <img src="${monster.url}" alt="${monster.name} image">
                </div>
                <div class="info-container">
                    <p class="monster-hp">HP: ${monster.hp}</p>
                    <p class="monster-alignment">Alignment: ${monster.alignment}</p>
                    <p class="monster-is-legendary">Legendary: ${monster.isLegendary}</p>
                </div>
                </section>
                </main>
            </div>
        `;
    }
}

export default MonsterDetailApp;