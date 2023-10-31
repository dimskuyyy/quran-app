import {sheet, tw} from "../setup/twind.js";
import "./ayat-item.js";

class ayatList extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM  = this.attachShadow({mode:"open"});
		this.shadowDOM.adoptedStyleSheets = [sheet.target];
	}
	
	set daftar(daftar){
		this._daftar = daftar;
		this.renderBismillah = -1;
		this.renderData();
	}
	
	checkEvenOdd(index){
		return index % 2 == 0;
	}

	connectedCallback(){
		this.shadowDOM.innerHTML = `
			<div class="${tw`w-full flex items-center flex-col py-8`}">
				<div class="${tw`mb-4`}">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${tw`w-8 h-8 text-[hsl(var(--bc))] opacity-60`}">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
					</svg>			
				</div>
				<div>
					<p class="${tw`text-[hsl(var(--bc))] opacity-60 font-bold font-['Poppins'] text-center`}">Silahkan pilih surah yang ingin dibaca</p>
				</div>
			</div>
		`;
	}

	renderData(){
		this.shadowDOM.innerHTML = ``;
		if(this._daftar.preBismillah != null && this.renderBismillah <0){
			const item = document.createElement("ayat-item");
			item.bismillah = true;
			item.oddEven = this.checkEvenOdd(1);
			item.ayat = this._daftar.preBismillah;
			this.shadowDOM.appendChild(item);	
		}
		this._daftar.verses.forEach((ayat,index) => {
			const item = document.createElement("ayat-item");
			const isEven = this._daftar.preBismillah != null ? this.checkEvenOdd(index) : this.checkEvenOdd(index+1);
			item.oddEven = isEven;
			item.ayat = ayat;
			this.shadowDOM.appendChild(item);
		});
	}

	renderError(message){
		this.shadowDOM.innerHTML = `
			<div class="${tw`w-full flex items-center flex-col py-8`}">
				<div class="${tw`mb-4`}">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${tw`w-8 h-8 text-[hsl(var(--bc))] opacity-60`}">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
					</svg>		
				</div>
				<div>
					<p class="${tw`text-[hsl(var(--bc))] opacity-60 font-bold font-['Poppins'] text-center`}">${message}</p>
				</div>
			</div>
		`;
	}
}

customElements.define("ayat-list",ayatList);