const popups = document.querySelectorAll(".popup");

function openModal(item) {
  item.classList.add("popup_is-animated", "popup_is-opened");
  item.addEventListener("click", () => handleEscape);
}

function closeModal(item) {
  item.classList.remove("popup_is-opened");
  item.removeEventListener("click", () => handleEscape);
}

function handleEscape(event) {
  if (event.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_is-opened")) {
        closeModal(popup);
      }
    });
  }
}

export { openModal, closeModal, handleEscape };
