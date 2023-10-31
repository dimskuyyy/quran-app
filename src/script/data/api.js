import axios from "axios";

class dataQuran{
	static surat(){
		return axios({
			method:"get",
			url:"https://api.quran.gading.dev/surah/",
		}).then(response=>{
			return response.data;
		}).then(responseJSON=>{
			return Promise.resolve(responseJSON.data);
		}).catch(error=>{
			return Promise.reject(error.message);
		});
	}

	static ayat(id){
		return axios({
			method:"get",
			url:`https://api.quran.gading.dev/surah/${id}`
		}).then(response=>{
			return response.data;
		}).then(responseJSON=>{
			return Promise.resolve(responseJSON.data);
		}).catch(error=>{
			return Promise.reject(error.message);
		});
	}
}

export default dataQuran;