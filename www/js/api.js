API = (function(){
	const addMinimal = async (url,data)=>{
		data = data || {}
		const res = await fetch(config.speaker_url + "/"+ url, {
			...data,
			mode : "cors",
			headers : {
				"Content-Type": "application/json"
			},
		})
		return await res.json()
	}
	return {
		get(url) {
			return addMinimal(url)
		},
		post(url, data){
			return addMinimal(url,{
				method :"POST",
				body: JSON.stringify(data)
			})
		},
		put(url,data) {
			return addMinimal(url,{
				method : "PUT",
				body: JSON.stringify(data)
			})
		},
		delete(url) {
			return addMinimal(url,{method:"DELETE"})
		}
	}
})()