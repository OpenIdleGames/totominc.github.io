function beautify(x, n) {
	if (x >= 1e6) {
		var z = Math.floor(logFloor(x)/3);
		var prefixes = ["m ","b ","t ","q ","Q ","s ","S ","o ","n ",
		"D ","UD ","DD ","TD ","qD ","QD ","sD ","SD ","OD ","ND ",
		"V ","UV ","DV ","TV ","qV ","QV ","sV ","SV ","OV ","NV ",
		"T ","UT ","DT ","TT ","qT ","QT ","sT ","ST ","OT ","NT ",
		"~q ","Uq ","Dq ","Tq ","qq ","Qq ","sq ","Sq ","Oq ","Nq "];
		var s = beautify(x/Math.pow(10,3*z),n);
		return s+""+prefixes[z-2];
	} else {
		return numberWithCommas(x.toFixed(n));
	};
};
function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
};
function logFloor(x) {
	var count = 0;
	while (x >= 10) {
		count++;
		x /= 10;
	};
	return count;
};
function fix(x, type) {
	if (options.numbers == "shortscale") {
		if (type == "0d")
			return beautify(x, 0);

		if (type == "1d") {
			if (x >= 1e6)
				return beautify(x, 1);
			else
				return beautify(x, 0);
		};

		if (type == "2d")
			return beautify(x, 2);

		if (type == "3d") {
			if (x >= 1e6)
				return beautify(x, 3);
			else
				return beautify(x, 0);
		};
	} else {
		if (options.numbers == "scientific") {
			var y = Math.floor(x);
			var exp = numberWithCommas(y.toExponential());
			var i = exp.indexOf("+");
			var part1 = exp.substring(0, i);
			var part2 = exp.substring((i+1), exp.length);
			return part1 + part2;
		};
	}
};