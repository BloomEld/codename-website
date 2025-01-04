(function () {
"use strict";
function randomizeOrder() {
	var mods = document.querySelectorAll(".featured-mod");
	var modsArray = Array.from(mods);

	for (var i = modsArray.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = modsArray[i];
		modsArray[i] = modsArray[j];
		modsArray[j] = temp;
	}

	setModsArray(modsArray, mods);
}

function setModsArray(modsArray, nodes) {
	var parent = nodes[0].parentNode;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < modsArray.length; i++) {
		fragment.appendChild(modsArray[i].cloneNode(true));
	}
	clearElement(parent);
	parent.appendChild(fragment);
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function sortByTime(a, b) {
	var aTime = a.getAttribute("data-time");
	var bTime = b.getAttribute("data-time");

	if (!aTime) return 1;					// Push null to the bottom
	if (!bTime) return -1;
	if (aTime === "unreleased") return 1;	// Push "unreleased" to the bottom
	if (bTime === "unreleased") return -1;
	if (aTime === "unknown") return 1;		// Push "unknown" to the bottom
	if (bTime === "unknown") return -1;

	var aDate = new Date(aTime).getTime();
	var bDate = new Date(bTime).getTime();

	if (aDate === bDate) return 0;
	return bDate > aDate ? 1 : -1;
}

function recentOrder() {
	var mods = document.querySelectorAll(".featured-mod");
	var modsArray = Array.from(mods);

	modsArray.sort(sortByTime);

	setModsArray(modsArray, mods);
}

var sortButtons = document.querySelectorAll(".sort-button");
var orderButtons = document.querySelectorAll(".order-button");
var categoryButtons = document.querySelectorAll(".category-button");
sortButtons.forEach(button => {
	button.addEventListener("click", function(e) {
		e.preventDefault();
		var sort = button.getAttribute("data-sort");
		if(sort == "recent" || sort == "random") {
			if(sort == "random") {
				randomizeOrder();
			} else {
				recentOrder();
			}

			orderButtons.forEach(button => {
				button.classList.remove("selected");
			});
			button.classList.add("selected");
		} else {
			var mods = document.querySelectorAll(".featured-mod");
			if(sort == "all") {
				mods.forEach(mod => {
					var display;
					if(mod.classList.contains("upcoming")) {
						display = "none";
					} else {
						display = "block";
					}
					mod.style.display = display;
				});
			} else {
				mods.forEach(mod => {
					mod.style.display = "none";
				});
				document.querySelectorAll(".featured-mod." + sort).forEach(mod => {
					var display;
					if(sort != "upcoming" && mod.classList.contains("upcoming")) {
						display = "none";
					} else {
						display = "block";
					}
					mod.style.display = display;
				});
			}

			categoryButtons.forEach(button => {
				button.classList.remove("selected");
			});
			button.classList.add("selected");
		}
	});
});

recentOrder();

function getRelativeTimeString(
	date, // Date | number
	lang = "en" // navigator.language
) {
	var timeMs = typeof date === "number" ? date : date.getTime();
	var deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
	var cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
	var units = ["second", "minute", "hour", "day", "week", "month", "year"];
	var unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
	var divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
	var rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
	return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

var lastUpdated = document.querySelectorAll(".last-updated");
if(lastUpdated.length > 0 && window.Intl) {
	lastUpdated.forEach(lastUpdated => {
		var time = lastUpdated.getAttribute("data-time");
		if(time == "unreleased") {
			lastUpdated.style.display = "inline";
		} else if(time != "unknown" && time) {
			lastUpdated.textContent = getRelativeTimeString(new Date(time));
			lastUpdated.style.display = "inline";
		}
	});
}
})();