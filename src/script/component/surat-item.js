import { sheet, tw } from "../setup/twind.js";

class suratItem extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM = this.attachShadow({mode:"open"});
		this.shadowDOM.adoptedStyleSheets = [sheet.target];
		this.activeBtn = "bg-[hsl(var(--n))] text-[hsl(var(--nc))]";
		this.inactiveBtn = "hover:cursor-pointer hover:bg-[hsl(var(--bc)/var(--tw-bg-opacity))] hover:bg-opacity-10 hover:text-[hsl(var(--bc))]";
	}

	connectedCallback() {
		this.addEventListener("click", () => {
			
		});
	}

	set surat(surat){
		this._surat = surat;
		this.render();
	}

	set active(isActive) {
		this._active = isActive;
		this.render();
	}
	
	render(){
		this.shadowDOM.innerHTML = `
			<style>
				:host{
					position:relative;
					display:flex;
					flex-shrink:0;
					flex-direction:column;
					flex-wrap:wrap;
					align-items:stretch;
					padding: 0.25rem 0.5rem;
				}
			</style>
			<a
				class="${tw`
					px-4 py-2 text-left transition-all duration-200 rounded-lg break-all 
					grid grid-flow-col content-start items-center gap-2 auto-cols-[minmax(auto)] select-none
					${this._active ? this.activeBtn : this.inactiveBtn}
				`}"
				id="${this._active ? "" : this._surat.number }"
			>
				${this._surat.name.transliteration.id}
			</a>
		`;
	}
}

customElements.define("surat-item",suratItem);