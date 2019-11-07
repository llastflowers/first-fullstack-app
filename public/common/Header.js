import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Dnd Monsters';

        return /*html*/`
            <header>
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./monster-list.html">Monsters</a>
                    <a href="./monster-form.html">Add a Monster</a>
                </nav>
            </header>
        `;
    }
}

export default Header;