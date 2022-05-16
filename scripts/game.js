let storyTexts = [];
let possessedItems = {}
let possessedWeapons = {}
let possessedSkills = {}
let possessedAbilities = {}
 
//// Fetch Request
// Error Handling
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Gets Story Object Array
async function getStory() {
    const response = await fetch("https://koumori-cyoa-api.herokuapp.com/story-texts");
	handleErrors(response)
    const data = await response.json();
    for (i of data) {
        storyTexts.push(i);
    }
}

// Starts story at the beginning
function beginning() {
	getStory()
	.then(() => {
		let page = parseInt(localStorage.getItem("page"))
		if (page > 1) {
			showText(page)
		} else {
			showText(1)
		}
	})
}

function showText(storyTextIndex) {
	const textElement = document.querySelector("#text");
    const optionButtonsElement = document.querySelector("#option-buttons");
    const storyText = storyTexts.find((storyText) => storyText.page === storyTextIndex);

	textElement.innerText = storyText.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    storyText.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("option-btn");
            button.addEventListener("click", () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });

	localStorage.setItem("page", storyTextIndex)

}

function showOption(option) {
	let fnItem = eval(option["requireItem"]);
	let fnWeapon = eval(option["requireWeapon"]);
	let fnSkill = eval(option["requireSkill"]);
	let fnAbility = eval(option["requireAbility"]);

	if (!fnItem && !fnWeapon && !fnSkill && !fnAbility) return true;
	
	let show = false;

	if (fnItem) {
		show = show || fnItem(possessedItems);
	}
	if (fnWeapon) {
		show = show || fnWeapon(possessedWeapons);
	}
	if (fnSkill) {
		show = show || fnSkill(possessedSkills);
	}
	if (fnAbility) {
		show = show || fnAbility(possessedAbilities);
	}
	return show;
}

function selectOption(option) {
	const nextStoryTextIndex = option.nextPage;
    if (nextStoryTextIndex <= 0) {
        alert("GAMEOVER!!!!!!");
		return restart();
    }
	storeInventory(option)
	
    showText(nextStoryTextIndex);
}

// Save any items obtained into localStorage
function storeInventory(option) {
	possessedItems = Object.assign(possessedItems, option.setItem)
	let acquiredInventory = JSON.stringify(possessedItems)
	if (acquiredInventory !== undefined) {
		localStorage.setItem("acquiredInventory", acquiredInventory)
	}

	possessedWeapons = Object.assign(possessedWeapons, option.setWeapon)
	let acquiredWeapon = JSON.stringify(possessedWeapons)
	if (acquiredWeapon !== undefined) {
		localStorage.setItem("acquiredWeapons", acquiredWeapon)
	}

	possessedSkills = Object.assign(possessedSkills, option.setSkill)
	let acquiredSkill = JSON.stringify(possessedSkills)
	if (acquiredSkill !== undefined) {
		localStorage.setItem("acquiredSkills", acquiredSkill)
	}

	possessedAbilities = Object.assign(possessedAbilities, option.setAbility)
	let acquiredAbility = JSON.stringify(possessedAbilities)
	if (acquiredAbility !== undefined) {
		localStorage.setItem("acquiredAbilities", acquiredAbility)
	}
}

function restart() {
		possessedItems = {}
		possessedWeapons = {}
		possessedSkills = {}
		possessedAbilities = {}
		localStorage.removeItem("page");
		localStorage.removeItem("acquiredInventory");
		localStorage.removeItem("acquiredWeapons");
		localStorage.removeItem("acquiredSkills");
		localStorage.removeItem("acquiredAbilities");
		return beginning();
};

const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", () => {
	if (confirm("Are you sure you'd like to start over?")) {
		restart();
	}
});

beginning();
