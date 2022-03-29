document.addEventListener('DOMContentLoaded',function() {
	// id for interval
	var id;
	// the page we're on
	let page = 0;
	// array with texts to type in typewriter
	var dataText = ["Hi! I'm Antoine, 19, and you're currently using my presentation software",
	"I have a scientific baccalauréat (equivalent of a british A-level) and am currently studying CompSci in Clermont-Ferrand at Université Clermont Auvergne",
	"I got to learn many programming languages while studying, such as C, C++, Java, Python, PHP, Javascript, and C# </br> I also have experience with DBMS, OS, networking and UML modeling",
	"You can contact me through </br> - <a target='_blank' href='https://www.linkedin.com/in/antoine-duteyrat-175166221/'>linkedIn</a> </br> - <a href='mailto:aduteyrat@gmail.com'>email</a> </br> Or you could see my work on <a target='_blank' href='https://github.com/antoinedenovembre'>Github</a>"];
	// titles array
	var dataTitle = ["Who am I?", "Scholar", "Known languages", "Contact me"];
	// percentages array
	let dataPercentage = [25, 50, 75, 100];
	// current percentage
	let currentPercentage = 25;
	// buttons
	var btn_next = document.getElementById("btn-next");
	var btn_pred = document.getElementById("btn-pred");
	
	btn_next.addEventListener('click', () => {
		page == dataText.length - 1 ? page = page : page++;
		clearTimeout(time);
		clearInterval(id);
		document.querySelector("#text-type").innerHTML = "";
		startTextAnimation(page);
	});
	btn_pred.addEventListener('click', () => {
		page == 0 ? page = page : page--;
		clearTimeout(time);
		clearInterval(id);
		document.querySelector("#text-type").innerHTML = "";
		startTextAnimation(page);
	});
	
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
		move(dataPercentage[i]);
		hideButtonWithPage(page);
		setTitle(i);
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

	// hides button with page number
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

	// sets the title of the page
	function setTitle(i) {
		document.getElementById("title").innerHTML = dataTitle[i];
	}

	function move(width_aimed) {
		var elem = document.getElementById("bar");
		id = setInterval(frame, 10);
		function frame() {
			if (currentPercentage == width_aimed) {
				clearInterval(id);
			} else if (currentPercentage < width_aimed) {
				currentPercentage++;
				elem.style.width = currentPercentage + "%";
				elem.innerHTML = currentPercentage + "%";
			} else {
				currentPercentage--;
				elem.style.width = currentPercentage + "%";
				elem.innerHTML = currentPercentage + "%";
			}
		}
	}

	// start the text animation
	startTextAnimation(page);
});