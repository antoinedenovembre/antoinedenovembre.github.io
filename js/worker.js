// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(text, i) {
	// check if text isn't finished yet
	if (i < (text.length) && !_stop) {
		// add next character to text
		document.querySelector("#text-type").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
		// wait for a while and call this function again for next character
		setTimeout(
			function() {
				typeWriter(text, i + 1)
			}
		, 50);
	}
}

onmessage = function(e) {
	console.log(e.data);
	typeWriter(e.data[0], 0);
}