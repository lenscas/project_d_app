const fs = require("fs")

const pageText = fs.readdirSync("./pages/")
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
	.join("\n")
const templateText = fs.readFileSync("./templates/index.html",{encoding:"utf-8"})
fs.writeFileSync("www/index.html", templateText.replace("{{PAGES}}",pageText))