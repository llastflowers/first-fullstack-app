import Component from '../Component.js';

class MonsterItem extends Component {
    renderHTML() {
        const monster = this.props.monster;

        return /*html*/`
            <a href="monster-detail.html?id=${monster.id}"><li class="monster-item">
                    <h2>${monster.name}</h2>
                <div class="image-container">
                    <img src="${monster.url}" alt="${monster.name} image">
                </div>
                <div class="info-container">
                    <p class="monster-hp">HP: ${monster.hp}</p>
                    <p class="monster-alignment">Alignment: ${monster.alignment}</p>
                    <p class="monster-is-legendary">Legendary: ${monster.isLegendary}</p>
                </div>
            </li></a>
        `;
    }
}

export default MonsterItem;