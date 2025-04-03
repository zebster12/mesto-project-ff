//Функция для открытия модального окна
function openModal(item) {
  item.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}
//Функция для закрытия модального окна
function closeModal(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}
//Функция для закрытия модального окна по кнопке "Escape"
function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, handleEscape };
