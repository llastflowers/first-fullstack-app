import Component from '../Component.js';

class MonsterItem extends Component {
    renderHTML() {
        const monster = this.props.monster;

        return /*html*/`
            <li class="monster-item">
                <div class="info-container">
                    <h2>${monster.name}</h2>
                </div>
                <div class="image-container">
                    <img src="${monster.url}" alt="${monster.name} image">
                </div>
                <p class="monster-hp">${monster.hp}</p>
                <p class="monster-alignment">${monster.alignment}</p>
                <p class="monster-is-legendary">${monster.isLegendary}</p>
            </li>
        `;
    }
}

export default MonsterItem;