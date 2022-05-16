let storyTexts = [];

// Array of possessed Items. Skills and Abilities
let acquiredInventory = {};
let acquiredWeapons = {};
let acquiredSkills = {};
let acquiredAbilities = {};

const restart = document.querySelector("#restart")

function restartGame() {
	if (confirm("Sure?") == true) {
		startGame()
	}
}

restart.addEventListener("click", restartGame)

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function getStory() {
    const response = await fetch("https://koumori-cyoa-api.herokuapp.com/story-texts");
    const data = await response.json();
    for (i of data) {
        storyTexts.push(i);
    }
}

//// Handles The Game
// Starts The game by call 1st storyText
function startGame() {
    getStory()
	.then(() => {
		updateAbilities()
		updateBackPack()
		updateSkills()
		updateWeapons()
		let page = parseInt(localStorage.getItem("page"))
		showText(1);
	})
}

function showText(storyTextIndex) {
    const textElement = document.querySelector("#text");
    const optionButtonsElement = document.querySelector("#option-buttons");
    const storyText = storyTexts.find((storyText) => storyText.page === storyTextIndex);

	localStorage.setItem("page", storyText.page)

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
}

function showOption(option) {
    return (
        option.requireItem == null ||
        option.requireItem(acquiredInventory) ||
        option.requireWeapon(acquiredWeapons) ||
        option.requireSkill(acquiredSkills) ||
        option.requireAbility(acquiredAbilities)
    );
}

function selectOption(option) {
    const nextStoryTextIndex = option.nextPage;
    if (nextStoryTextIndex <= 0) {
        acquiredInventory = {};
        acquiredWeapons = {};
        acquiredSkills = {};
        acquiredAbilities = {};
        alert("GAMEOVER!!!!!!");
        return startGame();
    }
	
    let qacquiredInventory = option.setItem;
	let blah = JSON.stringify(qacquiredInventory)
	if (blah !== undefined) {
		localStorage.setItem("acquiredInventory", blah)
	}
    // updateBackPack();
    // acquiredWeapons = Object.assign(acquiredWeapons, option.setWeapon);
    // updateWeapons();
    // acquiredSkills = Object.assign(acquiredSkills, option.setSkill);
    // updateSkills();
    // acquiredAbilities = Object.assign(acquiredAbilities, option.setAbility);
    // updateAbilities();
    showText(nextStoryTextIndex);
}

// Updates Arrays of possessed inventory
function updateBackPack() {
    let items = Object.keys(acquiredInventory);
    let trueItems = items.filter(function (key) {
        return acquiredInventory[key];
    });
    let bodyElement = document.querySelector("#backpack-content");

    bodyElement.innerHTML = "";

    for (x of trueItems) {
        createBackPackList(x);
    }
}

function updateWeapons() {
    let items = Object.keys(acquiredWeapons);
    let trueWeapons = items.filter(function (key) {
        return acquiredWeapons[key];
    });
    let bodyElement = document.querySelector("#weapons-content");

    bodyElement.innerHTML = "";

    for (x of trueWeapons) {
        createWeaponsList(x);
    }
}

function updateAbilities() {
    let items = Object.keys(acquiredAbilities);
    let trueAbilities = items.filter(function (key) {
        return acquiredAbilities[key];
    });
    let bodyElement = document.querySelector("#abilities-content");

    bodyElement.innerHTML = "";

    for (x of trueAbilities) {
        createAbilityList(x);
    }
}

function updateSkills() {
    let items = Object.keys(acquiredSkills);
    let trueSkills = items.filter(function (key) {
        return acquiredSkills[key];
    });
    let bodyElement = document.querySelector("#skills-content");

    bodyElement.innerHTML = "";

    for (x of trueSkills) {
        createSkillList(x);
    }
}

// Creates HTML For Modals
const createBackPackList = (backPackItem) => {
    const bodyElement = document.querySelector("#backpack-content");

    let itemRow = `<div class="item" id="item">${backPackItem}</div>`;
    bodyElement.innerHTML += itemRow;
};

const createWeaponsList = (weapon) => {
    const bodyElement = document.querySelector("#weapons-content");

    let itemRow = `<div class="item" id="item">${weapon}</div>`;
    bodyElement.innerHTML += itemRow;
};

const createAbilityList = (ability) => {
    const bodyElement = document.querySelector("#abilities-content");

    let itemRow = `<div class="item" id="item">${ability}</div>`;
    bodyElement.innerHTML += itemRow;
};

const createSkillList = (skill) => {
    const bodyElement = document.querySelector("#skills-content");

    let itemRow = `<div class="item" id="item">${skill}</div>`;
    bodyElement.innerHTML += itemRow;
};

window.onload = () => {
	startGame()
}
