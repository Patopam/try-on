import { getFilms } from '../../services/DataFetch';
import stylesFilm from './Film.css';

export enum AttributeFilm {
	'uid' = 'uid',
	'tittle' = 'tittle',
	'img' = 'img',
}

class Film extends HTMLElement {
	uid?: number;
	tittle?: string;
	img?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.mount();
	}

	mount() {
		this.render();
	}

	static get observedAttributes() {
		const attrs: Record<AttributeFilm, null> = {
			uid: null,
			tittle: null,
			img: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeFilm, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case AttributeFilm.uid:
				this.uid = newValue ? Number(newValue) : undefined;

				break;
			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      			<h1>${this.uid}</h1>
      			<h2>${this.tittle}</h2>
            <img src="${this.img}"></img>
            `;
		}
	}
}

customElements.define('film-card', Film);
export default Film;
