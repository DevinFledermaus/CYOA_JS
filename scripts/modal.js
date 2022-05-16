const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const openMiniModalButtons = document.querySelectorAll("[data-mini-modal-target]");
const closeMiniModalButtons = document.querySelectorAll("[data-mini-close-button]");

openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});
openMiniModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.miniModalTarget);
        openMiniModal(modal);
    });
});

closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        closeModal(modal);
    });
});
closeMiniModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        closeMiniModal(modal);
    });
});

const overlay = document.querySelector(".overlay");
const miniOverlay = document.querySelector(".mini-overlay");

function openModal(modal) {
    if (modal === null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}
function openMiniModal(modal) {
    if (modal === null) return;
    modal.classList.add("active");
    miniOverlay.classList.add("active");
}

function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
function closeMiniModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    miniOverlay.classList.remove("active");
}

const accordion = document.querySelectorAll(".contentBox");

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
        this.classList.toggle("active");
    });
}
