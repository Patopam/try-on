import Film, { AttributeFilm } from './components/card/card';
import { getFilms } from './services/DataFetch';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const dataFilms = await getFilms();
		this.render(dataFilms);
	}

	render(dataFilm: any) {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
            <film-card></film-card>
            `;
		}
		dataFilm.forEach((dataFilm: any) => {
			const cardFilm = this.ownerDocument.createElement('film-card') as Film;
			cardFilm.setAttribute(AttributeFilm.tittle, dataFilm.title);
			cardFilm.setAttribute(AttributeFilm.img, dataFilm.image);
			cardFilm.setAttribute(AttributeFilm.uid, dataFilm.uid);
			console.log(dataFilm.people);

			this.shadowRoot?.appendChild(cardFilm);
		});
	}
}

customElements.define('app-container', AppContainer);
