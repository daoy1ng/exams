import axios from "axios"
import qs from "qs";

// const SERVER_HOST = "http://127.0.0.1:5000"
// const SERVER_HOST = process.env.VUE_APP_SERVER_HOST


class Http {
	constructor() {
		if(process.env.NODE_ENV == 'production'){
			this.server_host = window.location.origin;
		}else{
			this.server_host = ""
		}
		this.http = axios.create({
			baseURL: this.server_host + "/api",
			timeout: 1000*60
		});

		// 请求之前的拦截器，用来设置JWT
		this.http.interceptors.request.use(config => {
			const token = ''
			if (token) {
				config.headers.common.Authorization = "Bearer " + token
			}
			return config
		})

		// 响应拦截
		this.http.interceptors.response.use(response => {
			return response.data;
		})
	}

	_post(url, data){
		return this.http.post(url, qs.stringify(data));
	}

	// addUser(data){

	// }

	getUserList(){
		const url = "/get_user_list"
		return this.http.get(url);
	}

	// getUserList(page){
	// 	const url = "/user/list?page=" + (page?page:1)
	// 	return this.http.get(url)
	// }
}

export default new Http()