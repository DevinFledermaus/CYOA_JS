let storyTexts = [];
let storyObj = [];
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

//// Gets Story Object Array
// Fetch story depended on which character you've selected
async function getStory() {
	let storyName = localStorage.getItem("story-name")
	if(!storyName) {
		storyName = "default"
		localStorage.setItem("story-name", storyName)
	} 
    const response = await fetch(`https://koumori-cyoa-api.herokuapp.com/${storyName}`);
	handleErrors(response)
    const data = await response.json();
	storyObj = data[0]
}

// Starts story from the prologue
function prologue() {
	getStory()
	.then(() => {
		let check = Object.keys(storyObj)
		if (check.includes("default")) {
			storyTexts = storyObj.default
		} else {
			storyTexts = storyObj.prologue
		}
		let page = parseInt(localStorage.getItem("page"))
		if (page > 1) {
			showText(page)
		} else {
			showText(1)
		}
	})
}

// Starts story from the main story
function story() {
	getStory()
	.then(() => {
		let storyName = localStorage.getItem("story-name")
		if (storyName !== "default") {
			let character = localStorage.getItem("character")
			console.log(character);
			let story1
			if (!character) {
				story1 = "story"
			} else {
				story1 = character
			}
			storyTexts = storyObj[story1]
			let page = parseInt(localStorage.getItem("page"))
			if (page) {
				showText(page)
			} else {
				showText(1)
			}	
		}
	})
}

// Checks whether or not prologue has been completed and calls appropriate story function
function start() {
	let check = localStorage.getItem("prologue")
	console.log(check);
	if (!check) {
		prologue()
	} else {
		story()
	}
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
			if (option.character) {
				button.style.backgroundColor = "red"
			}
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
	if (option.character) {
		localStorage.setItem("character", option.character)
	}

	if (option.prologue) {
		localStorage.setItem("prologue", option.prologue)
		localStorage.removeItem("page")
		story()
	} else {
		const nextStoryTextIndex = option.nextPage;
		if (nextStoryTextIndex <= 0) {
			alert("GAMEOVER!!!!!!");
			return restart();
		} else if (nextStoryTextIndex === 0) {
			alert("HAHAHAHAHAHAHAHAHAHHAHA")
		}
		showText(nextStoryTextIndex);
	}
	storeInventory(option)

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
		storyTexts = [];
		storyObj = [];
		possessedItems = {}
		possessedWeapons = {}
		possessedSkills = {}
		possessedAbilities = {}
		localStorage.clear();
		return prologue();
};

const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", () => {
	if (confirm("Are you sure you'd like to start over?")) {
		restart();
	}
});

start()
