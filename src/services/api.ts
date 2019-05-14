import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';
@Injectable()

export class ApiData {
	constructor(private http: Http, public storage: Storage) {
		console.log(Enums.APIURL.URL);
	
	}



	// getData(url) {
	
	// 	return this.storage.get("userLoggedData").then(accessTokendata => {
	// 		var headers = new Headers();
	// 		console.log(data);
	// 		if (accessTokendata.data.id == null) {
	// 			headers.append('Authorization', '');

	// 			return new Promise((resolve, reject) => {
	// 				this.http.post(uri, data, { headers: headers })
	// 					.map(res => res.json())
	// 					.subscribe(data => {
	// 						// this.data = data;
	// 						resolve(data);
	// 						console.log(data.status);
	// 					}, error => {
	// 						reject(error.json());
	// 					});
	// 			});

	// 		} else {
				
	// 			headers.append('Authorization', accessTokendata.data.id);

	// 			return new Promise((resolve, reject) => {
	// 				this.http.post(uri, data, { headers: headers })
	// 					.map(res => res.json())
	// 					.subscribe(data => {
	// 						// this.data = data;
	// 						resolve(data);
	// 						console.log(data.status);
	// 					}, error => {
	// 						reject(error.json());
	// 					});
	// 			});

	// 		}
	// 	});
	// 	// return this.http.get(Enums.APIURL.URL+url, {headers: this.headers}).map( res => res.json() );
	// }

	// postRequest(uri, data) {
	// 	return this.storage.get("userLoggedData").then(accessTokendata => {
	// 		var headers = new Headers();
	// 		console.log(data);
	// 		if (accessTokendata.data.id == null) {
	// 			headers.append('Authorization', '');

	// 			return new Promise((resolve, reject) => {
	// 				this.http.post(uri, data, { headers: headers })
	// 					.map(res => res.json())
	// 					.subscribe(data => {
	// 						// this.data = data;
	// 						resolve(data);
	// 						console.log(data.status);
	// 					}, error => {
	// 						reject(error.json());
	// 					});
	// 			});

	// 		} else {
				
	// 			headers.append('Authorization', accessTokendata.data.id);

	// 			return new Promise((resolve, reject) => {
	// 				this.http.post(uri, data, { headers: headers })
	// 					.map(res => res.json())
	// 					.subscribe(data => {
	// 						// this.data = data;
	// 						resolve(data);
	// 						console.log(data.status);
	// 					}, error => {
	// 						reject(error.json());
	// 					});
	// 			});

	// 		}
	// 	});

	// 	// return this.http.post(Enums.APIURL.URL+url, data, this.headers).map( res => res.json() );
	// }



	  // GET DATA
		getData(url) {
			console.log("inside getData URL is ",url);
			console.log("inside getData Enums.APIURL.URL+url is ",Enums.APIURL.URL+url);
			
			
			return this.storage.get("userLoggedData").then(userData => {
				var headers = new Headers();
				headers.append('Authorization', userData.data.id);
				return new Promise((resolve, reject) => {
					this.http.get(Enums.APIURL.URL+url, { headers: headers })
						.map(res => res.json())
						.subscribe(data => {
							resolve(data);
							console.log(data.status);
						}, error => {
							console.log("error inside getData ",error);
							reject(error.json());
						});
				});
			});
		}

		

	 // POST DATA
	 postRequest(url, data) {
		console.log("inside postRequest URL is ",url);
		console.log("inside postRequest Enums.APIURL.URL+url is ",Enums.APIURL.URL+url);
		console.log("inside postRequest data is ",data);
					var headers = new Headers();
					console.log(data);
						headers.append('Authorization', '');
						return new Promise((resolve, reject) => {
							this.http.post(Enums.APIURL.URL+url, data, { headers: headers })
								.map(res => res.json())
								.subscribe(data => {
									resolve(data);
									console.log(data.status);
								}, error => {
							console.log("error inside postRequest ",error);
							
									reject(error.json());
								});
						});
			
			}

			 // POST DATA
	 postRequestWithToken(url, data) {
		console.log("inside postRequest URL is ",url);
		console.log("inside postRequest Enums.APIURL.URL+url is ",Enums.APIURL.URL+url);
		console.log("inside postRequest data is ",data);
		
				return this.storage.get("userLoggedData").then(userData => {
					var headers = new Headers();
					console.log(data);
					console.log("userData -->",userData);
					
					if (userData.data.id != null) {
						headers.append('Authorization', userData.data.id);
						// headers.append('Authorization', '');
						return new Promise((resolve, reject) => {
							this.http.post(Enums.APIURL.URL+url, data, { headers: headers })
								.map(res => res.json())
								.subscribe(data => {
									resolve(data);
									console.log(data.status);
								}, error => {
							console.log("error inside postRequestWithToken ",error);
							
									reject(error.json());
								});
						});
					} 
				});
			}
}