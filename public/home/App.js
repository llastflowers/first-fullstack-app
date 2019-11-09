import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    <img class="home-image" src="/assets/home-image.jpg">
                    <a href="./monster-list.html"><button class="enter">Click to Enter</button></a>
                </main>
            </div>
        `;
    }
}

export default App;