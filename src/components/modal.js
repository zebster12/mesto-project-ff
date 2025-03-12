function openModal(item) {
  item.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
 
}

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, handleEscape };
