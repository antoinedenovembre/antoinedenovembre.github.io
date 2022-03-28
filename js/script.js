document.addEventListener('DOMContentLoaded',function(){
	// the page we're on
	var page = 0;
	// array with texts to type in typewriter
	var dataText = ["Hi! I'm Antoine, currently studying CompSci in Clermont-Ferrand at Université Clermont Auvergne", "txt page 2", "txt page 3"];
	
	// type one text in the typwriter
	// keeps calling itself until the text is finished
	function typeWriter(text, i) {

		// check if text isn't finished yet
		if (i < (text.length)) {

			// add next character to text
			document.querySelector("#text-type").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

			// wait for a while and call this function again for next character
			time = setTimeout(
				function() {
					typeWriter(text, i + 1)
				}
			, 50);
		}
	}

	// start a typewriter animation for a text in the dataText array
	function startTextAnimation(i) {
		hideButtonWithPage(page);
		if (typeof dataText[i] == 'undefined') {
			setTimeout(function() {
				startTextAnimation(0);
			}, 20000);
		}
		// check if dataText[i] exists
		if (i < dataText.length) {
			// text exists! start typewriter animation
			typeWriter(dataText[i], 0);
		}
	}

	function hideButtonWithPage(page) {
		switch(true) {
			case (page < 1):
				document.getElementById("btn-pred").hidden = true;
				document.getElementById("bottom").style.justifyContent = 'right';
				break;
			default:
				document.getElementById("btn-pred").hidden = false;
				document.getElementById("bottom").style.justifyContent = 'space-between';
				break;
		}
		switch(true) {
			case (page >= dataText.length - 1):
				document.getElementById("btn-next").hidden = true;
				break;
			default:
				document.getElementById("btn-next").hidden = false;
				break;
		}
	}

	var btn_next = document.getElementById("btn-next");
	var btn_pred = document.getElementById("btn-pred");
	btn_next.addEventListener('click', () => {
		page == dataText.length - 1 ? page = page : page++;
		clearTimeout(time);
		document.querySelector("#text-type").innerHTML = "";
		startTextAnimation(page);
	});
	btn_pred.addEventListener('click', () => {
		page == 0 ? page = page : page--;
		clearTimeout(time);
		document.querySelector("#text-type").innerHTML = "";
		startTextAnimation(page);
	});
	// start the text animation
	startTextAnimation(page);
});