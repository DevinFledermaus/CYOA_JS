// Creates HTML For Modals
const appendBackPackList = (backPackItem) => {
    const bodyElement = document.querySelector("#backpack-content");

    let itemRow = `<div class="item" id="item">${backPackItem}</div>`;
    bodyElement.innerHTML += itemRow;
};

const appendWeaponsList = (weapon) => {
    const bodyElement = document.querySelector("#weapons-content");

    let itemRow = `<div class="item" id="item">${weapon}</div>`;
    bodyElement.innerHTML += itemRow;
};

const appendAbilityList = (ability) => {
    const bodyElement = document.querySelector("#abilities-content");

    let itemRow = `<div class="item" id="item">${ability}</div>`;
    bodyElement.innerHTML += itemRow;
};

const appendSkillList = (skill) => {
    const bodyElement = document.querySelector("#skills-content");

    let itemRow = `<div class="item" id="item">${skill}</div>`;
    bodyElement.innerHTML += itemRow;
};

// Updates The list of possessions
function updateBackPack() {
	let bodyElement = document.querySelector("#backpack-content")
	let stringifiedItems = localStorage.getItem("acquiredInventory")
	let parsedItems = JSON.parse(stringifiedItems)
	if (parsedItems) {
		let items = Object.keys(parsedItems)
		trueItems = items.filter(function (key) {
			return parsedItems[key];
		});
		
		bodyElement.innerHTML = ""
		
		for (x of trueItems) {
			appendBackPackList(x);
		};
	} else {
		bodyElement.innerHTML = ""
	}
};

function updateWeapons() {
	let bodyElement = document.querySelector("#weapons-content")
	let stringifiedWeapons = localStorage.getItem("acquiredWeapons")
	let parsedWeapons = JSON.parse(stringifiedWeapons)
	if (parsedWeapons) {
		let weapons = Object.keys(parsedWeapons)
		trueWeapons = weapons.filter(function (key) {
			return parsedWeapons[key];
		});
		
		bodyElement.innerHTML = ""
		
		for (x of trueWeapons) {
			appendWeaponsList(x);
		};
	} else {
		bodyElement.innerHTML = ""
	}
}

function updateSkills() {
	let bodyElement = document.querySelector("#skills-content")
	let stringifiedSkills = localStorage.getItem("acquiredSkills")
	let parsedSkills = JSON.parse(stringifiedSkills)
	if (parsedSkills) {
		let skills = Object.keys(parsedSkills)
		trueSkills = skills.filter(function (key) {
			return parsedSkills[key];
		});
		
		bodyElement.innerHTML = ""
		
		for (x of trueSkills) {
			appendSkillList(x);
		};
	} else {
		bodyElement.innerHTML = ""
	}
}

function updateAbilities() {
	let bodyElement = document.querySelector("#abilities-content")
	let stringifiedAbilities = localStorage.getItem("acquiredAbilities")
	let parsedAbilities = JSON.parse(stringifiedAbilities)
	if (parsedAbilities) {
		let abilities = Object.keys(parsedAbilities)
		trueAbilities = abilities.filter(function (key) {
			return parsedAbilities[key];
		});
		
		bodyElement.innerHTML = ""
		
		for (x of trueAbilities) {
			appendAbilityList(x);
		};
	} else {
		bodyElement.innerHTML = ""
	}
}

// Calls updates on "Your..." button click
const button = document.querySelector("#your");

button.addEventListener("click", () => {
	updateBackPack()
	updateWeapons()
	updateSkills()
	updateAbilities()
})
