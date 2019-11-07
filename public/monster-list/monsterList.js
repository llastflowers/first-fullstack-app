import Component from '../Component.js';
import monsterItem from './monsterItem.js';

class monsterList extends Component {
    
    onRender(dom) {
        const monsters = this.props.monsters;

        monsters.forEach(monster => {
            const props = { monster: monster };
            const monsterItem = new monsterItem(props);
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

export default monsterList;