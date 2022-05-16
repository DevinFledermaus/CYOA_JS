let abilities = [];
let weapons = [];
let skills = [];

async function getAbilities() {
    const response = await fetch("https://koumori-cyoa-api.herokuapp.com/abilities");
    const data = await response.json();
    for (i of data) {
        abilities.push(i);
        abilitiesList(i);
    }
}

async function getWeapons() {
    const response = await fetch("https://koumori-cyoa-api.herokuapp.com/weapons");
    const data = await response.json();
    for (i of data) {
        weapons.push(i);
        weaponsList(i);
    }
}

async function getSkills() {
    const response = await fetch("https://koumori-cyoa-api.herokuapp.com/skills");
    const data = await response.json();
    for (i of data) {
        skills.push(i);
        skillsList(i);
    }
}

const abilitiesList = (ability) => {
    const bodyElement = document.querySelector("#ability-body");

    let contentBox = `
	<div class="contentBox ability">
		<div class="label">${ability["name"]}</div>
		<div class="content" id="ability-list">
			<div class="item" id="desc-item">Description: ${ability["description"]}</div>
			<div class="item" id="cost-item">Cost: ${ability["cost"]}</div>
		</div>
	</div>
	`;
    bodyElement.innerHTML += contentBox;

    const accordion = document.querySelectorAll(".contentBox.ability");

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
};

const weaponsList = (weapons) => {
    const bodyElement = document.querySelector("#weapons-body");

    let contentBox = `
	<div class="contentBox weapons">
		<div class="label">${weapons["name"]}</div>
		<div class="content" id="weapons-list">
			<div class="item" id="desc-item">Description: ${weapons["description"]}</div>
			<div class="item" id="cost-item">Skill Required: ${weapons["requirements"]}</div>
		</div>
	</div>
	`;
    bodyElement.innerHTML += contentBox;

    const accordion = document.querySelectorAll(".contentBox.weapons");

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
};

const skillsList = (skills) => {
    const bodyElement = document.querySelector("#skills-body");

    let contentBox = `
	<div class="contentBox skills">
		<div class="label">${skills["name"]}</div>
		<div class="content" id="skills-list">
			<div class="item" id="desc-item">Description: ${skills["description"]}</div>
		</div>
	</div>
	`;
    bodyElement.innerHTML += contentBox;

    const accordion = document.querySelectorAll(".contentBox.skills");

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
};

getAbilities();
getWeapons()
getSkills()
