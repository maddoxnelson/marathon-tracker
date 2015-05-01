$.get('unflipped.json', function(data){
	var route = data.route;

	var string = "";

	for (var point in route) {
		var line = route[point];

		string += line[1] + "," + line[0] + " "
	}

	console.log(string)
})