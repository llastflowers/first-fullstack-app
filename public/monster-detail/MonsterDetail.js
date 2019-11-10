import Component from '../Component.js';

class MonsterDetail extends Component {
    renderHTML() {
        const monster = this.props.monster;
        const json = JSON.stringify(monster, true, 4);
        return /*html*/`
            <pre>${json}</pre>
        `;
    }
}

export default MonsterDetail;