const url = "https://koumori-cyoa-api.herokuapp.com/stories";

async function getStories() {
    const response = await fetch(url);
    const data = await response.json();
    for (i of data) {
		appendStoryButtons(i.name)
    }
	let btnArray = document.querySelectorAll("#story-btn")

	btnArray.forEach(button => {
		button.addEventListener("click", () => {
			localStorage.setItem("story-name", button.innerText)
			localStorage.removeItem("page")
			location.reload()
		})
	});
	
}

const appendStoryButtons = (story) => {
	const bodyElement = document.querySelector("#list-body");

	const button = `<button class="option-btn" id="story-btn">${story}</button>`
	bodyElement.innerHTML += button
	

}

getStories();
