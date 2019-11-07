import Component from '../Component.js';
import MonsterItem from './MonsterItem.js';

class MonsterList extends Component {
    
    onRender(dom) {
        const monsters = this.props.monsters;

        monsters.forEach(monster => {
            const props = { monster: monster };
            const monsterItem = new MonsterItem(props);
            const monsterItemDOM = monsterItem.renderDOM();
            dom.appendChild(monsterItemDOM);
        });

    }

    renderHTML() {
        
        return /*html*/`
            <ul class="monsters"></ul>
        `;
    }
}

export default MonsterList;