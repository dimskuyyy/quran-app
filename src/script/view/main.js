
import logo from "../../assets/logo.png";
import dataQuran from "../data/api.js";

const main = ()=>{
	const suratList = document.querySelector("surat-list");
	const loadSuratAnimation = document.querySelector("#load-surat");
	const inputSearch = document.querySelector("#input-search");
	const buttonSearch = document.querySelector("#button-search");
	const img = document.querySelector("#logo");
	const icon = document.querySelector("[rel='icon']");
	img.src = logo;
	icon.href = logo;

	const loadSurat = async (search) =>{
		try {
			loadSuratAnimation.classList.remove("hidden");
			const results = await dataQuran.surat();
			suratList.daftar = results;
			if(search != undefined){
				suratList.searchSurat = search;
			}
			loadSuratAnimation.classList.add("hidden");
		} catch (message) {
			suratList.renderError(message);
		}
	};

	loadSurat();

	buttonSearch.addEventListener("click",function(){
		const value = inputSearch.value;
		loadSurat(value);
	});
};

export default main;