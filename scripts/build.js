const fs = require("fs")
const components = fs.readdirSync("./components")
	.map(v=>({
		name : v.split(".")[0],
		path : "./components/" + v
	}))
	.map(v=>({
		name : v.name,
		text : fs.readFileSync(v.path,{encoding:"utf-8"})
	}))
	.reduce((v,a)=>{v[a.name] = a.text; return v},{})
let pageText = fs.readdirSync("./pages/")
	.map(v=>({
		id : v.split(".")[0],
		path : "./pages/"+v
	}))
	.map(
		v=>(
			{
				id : v.id,
				text : fs.readFileSync(
					v.path,
					{
						encoding: "utf-8"
					}
				)
			}
		)
	)
	.map(
		v=>'<div class="page" id="'+v.id+'">\n'+v.text+"\n</div>"
	)
	.join("\n");
Object.keys(components).forEach(
	v=>{
		pageText = pageText.split("<"+v+"/>").join(components[v])
	}
)
const templateText = fs.readFileSync("./templates/index.html",{encoding:"utf-8"})
fs.writeFileSync("www/index.html", templateText.replace("{{PAGES}}",pageText))