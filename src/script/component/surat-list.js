import {sheet, tw} from "../setup/twind.js";
import "./surat-item.js";
import dataQuran from "../data/api.js";

class suratList extends HTMLElement{
	constructor(){
		super();
		this.shadowDOM  = this.attachShadow({mode:"open"});
		this.shadowDOM.adoptedStyleSheets = [sheet.target];
		this.activeItemIndex = -1;
		this.search="";
	}
	
	static get observedAttributes(){
		return ["id","data-name","data-verse"];
	}

	set daftar(daftar){
		this._daftar = daftar;
		this.renderData(this.search);
	}

	setActiveItem(index) {
		this.activeItemIndex = index;
		this.renderData(this.search);
	}

	set searchSurat(input = ""){
		this.search = input;
		this.renderData(input);
	}

	async loadAyat(id){
		const ayatList = document.querySelector("ayat-list");
		const loadAyatAnimation = document.querySelector("#load-ayat");
		try {
			loadAyatAnimation.classList.remove("hidden");
			const results = await dataQuran.ayat(id);
			ayatList.daftar = results;
			loadAyatAnimation.classList.add("hidden");
		} catch (message) {
			ayatList.renderError(message);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name){
		case "id":
			this.loadAyat(newValue);
			this.setActiveItem(newValue-1);
			break;
		case "data-name":
			document.querySelector(".nama-surat").innerText = `Q.S. ${newValue}`;
			break;
		case "data-verse":
			document.querySelector(".verse-surat").innerText = `${newValue} Ayat`;
			break;
		}
	}

	async renderData(search = ""){
		this.shadowDOM.innerHTML = "";
		let checkFail = true;
		await this._daftar.forEach((surat,index) => {
			const data = surat.name.transliteration.id;
			const result = data.toLowerCase().includes(search.toLowerCase());
			if(result){
				const item = document.createElement("surat-item");
				item.surat = surat;
				item.active = index == this.activeItemIndex;
				item.setAttribute("id",surat.number);
				item.addEventListener("click", () => {
					this.setAttribute("id",`${surat.number}`);
					this.setAttribute("data-name",`${surat.name.transliteration.id}`);
					this.setAttribute("data-verse",`${surat.numberOfVerses}`);
				});
				this.shadowDOM.appendChild(item);
				checkFail = checkFail && false;
			}
		});
		if(checkFail){
			this.shadowDOM.innerHTML = `
					<div class="${tw`w-full flex items-center flex-col py-8`}">
						<div class="${tw`mb-4`}">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${tw`w-8 h-8 text-[hsl(var(--bc))] opacity-60`}">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
							</svg>		
						</div>
						<div class="${tw`px-4`}">
							<p class="${tw`text-[hsl(var(--bc))] opacity-60 font-bold font-['Poppins'] text-center`}">${search} Tidak Ditemukan, Silahkan Coba Lagi</p>
						</div>
					</div>
				`;
		}
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

customElements.define("surat-list",suratList);