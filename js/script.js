document.addEventListener('DOMContentLoaded',function() {
	// id for interval
	var id;
	// the page we're on
	let page = 0;
	// array with texts to type in typewriter
	var dataText = ["Hi there, I'm Antoine, French student, 20, and you're currently using my presentation website",
	"I have a scientific baccalauréat (equivalent of a british A-level) and a technical bachelor's degree in CompSci </br> I'm currently studying image processing and engineering at Telecom Saint-Etienne",
	"I got to learn many programming languages while studying, such as C, C++, Java, Python, PHP, Javascript, and C# </br> I also have experience with DBMS, OS, networking and UML modeling </br> I'm currently learning about image processing and computer vision",
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
			if (currentPercentage == width_aimed)
				clearInterval(id);
			else if (currentPercentage < width_aimed)
				currentPercentage++;
			else
				currentPercentage--;
			elem.style.width = currentPercentage + "%";
			elem.innerHTML = currentPercentage + "%";
		}
	}

	// start the text animation
	startTextAnimation(page);
});

function onClickShell() {
	document.getElementById("btn-shell").className = "btn-tab btn-selected";
	document.getElementById("btn-pres").className = "btn-tab";
	document.getElementById("shell-window").className = "container shell-window";
	document.getElementById("pres-window").className = "container hidden";
}

function onClickPres() {
	document.getElementById("btn-pres").className = "btn-tab btn-selected";
	document.getElementById("btn-shell").className = "btn-tab";
	document.getElementById("pres-window").className = "container";
	document.getElementById("shell-window").className = "container hidden";
}

let id_prompt = "input-prompt";

function onEnterCommand(command) {
	// deprecated but no other way to do it
	if(KeyboardEvent.code === 13 || event.keyCode === 13) {
		var shell = document.getElementById("shell-content");

		// building result
		var new_line = document.createElement('div');
		new_line.className = "text prompt";
		new_line.innerHTML = commandOutput(command);
		shell.appendChild(new_line);

		// getting the prompt down
		var prompt_line = document.getElementById(id_prompt);
		prompt_line.disabled = true;
		var new_prompt = document.createElement('span');
		new_prompt.className = "text prompt";
		new_prompt.innerHTML = "(user@localOS) ~ » ";
		var new_prompt_line = document.createElement('input');
		id_prompt = "input-prompt" + Math.floor(Math.random() * 100);
		new_prompt_line.id = id_prompt;
		new_prompt_line.className = "command";
		new_prompt_line.type = "text";
		shell.appendChild(new_prompt);
		shell.appendChild(new_prompt_line);
		new_prompt_line.addEventListener('keydown', () => onEnterCommand(new_prompt_line.value));
		new_prompt_line.focus();
	} else {
		return;
	}
}

function commandOutput(input) {
	switch(input) {
		case "help" : 
			return "'help' - displays all the available commands.</br>'whoami' - displays the presentation</br>'projects' - displays my github link</br>'socials' - \
				displays my socials links";

		case "whoami" :
			return "Hi there, I'm Antoine, French student, 20, and you're currently using my presentation website";

		case "projects" :
			window.open('https://github.com/antoinedenovembre', '_blank').focus()
			return "";

		case "socials" :
			return "<a target='_blank' href='https://www.linkedin.com/in/antoine-duteyrat-175166221/'>linkedIn</a>; <a href='mailto:aduteyrat@gmail.com'>email</a>; \
				<a target='_blank' href='https://github.com/antoinedenovembre'>Github</a>"

		default :
			return "command not found";
	}
}

// TODO : add a command to display the ip address
// TODO : fix the bar at the top of shell container
