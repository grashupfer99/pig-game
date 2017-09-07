// Loading screen 
( function()  {

	const loadingScreen = document.getElementById("loading-screen");
	const percent = document.querySelector(".percent");
	let loader = 0;
	let counter = 0;

	// Set the speed of an object (50)
	const id = setInterval(frame, 50);

	function frame() {
		// the loader reaches 100, clearInterval and open a new page
		if(loader == 100) {
			clearInterval(id);
			window.open("game.html", "_self");

		// Else, keep ++
		} else {
			loader += 2;
			counter += 2;
			percent.innerHTML = counter + '%';
		}
	}

})();
