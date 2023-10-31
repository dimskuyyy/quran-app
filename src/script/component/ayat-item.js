import { sheet, tw } from "../setup/twind.js";

class ayatItem extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM = this.attachShadow({mode:"open"});
		this.shadowDOM.adoptedStyleSheets = [sheet.target];	
	}

	set ayat(ayat){
		this._ayat = ayat;
		this.render();
	}
	set oddEven(oddEven){
		this.isEven = oddEven;
	}
	set bismillah(isSet) {
		this._bismillah = isSet;
	}
	
	render(){
		this.shadowDOM.innerHTML = `
		<div class="${tw`py-8 ${this.isEven ? `bg-[hsl(var(--b1))]` : `bg-[hsl(var(--b2))]`}`}">
		${this._bismillah ? "" : 
		`<div class="${tw`flex justify-center mb-4`}">
						<span class="${tw`inline-block w-12 h-6 font-['Poppins'] leading-6 rounded-md mt-2 text-[hsl(var(--b1))] text-center bg-[hsl(var(--a))]`}">${this._ayat.number.inSurah}</span>
				</div>`}
			<div class="${tw`px-2 gap-8 flex flex-col`}">
					<p class="${tw`text-center text-2xl align-baseline leading-[3rem]`}">
						${this._ayat.text.arab}
					</p>
					<p class="${tw`text-sm font-['Poppins'] text-center italic`}">
						${this._ayat.translation.id}
					</p>
			</div>
		</div>
		`;
	}
}

customElements.define("ayat-item",ayatItem);