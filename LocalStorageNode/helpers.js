const fs = require('fs');


module.exports.GetPart = function(file, replaces = []) {
	let k = fs.readFileSync(file, 'utf8')
	for (let each of replaces) {
		k = k.split(each.search).join(each.replace)
	}
	return k
}
