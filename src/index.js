import "./pages/index.css";
import { renderInitialCards, newCardAdd } from "./components/card";
import { openModal, closeModal, handleEscape } from "./components/modal";

const popupBtnOpenEdit = document.querySelector(".profile__edit-button");
const popupBtnOpenAdd = document.querySelector(".profile__add-button");

let formElement = document.forms["edit-profile"];
let nameInput = document.forms["edit-profile"].elements["name"];
let jobInput = document.forms["edit-profile"].elements["description"];

let profileTitle = document.querySelector(".profile__title");
let profileDesk = document.querySelector(".profile__description");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let popup = document.querySelector(".popup");
  profileTitle.textContent = nameInput.value;
  profileDesk.textContent = jobInput.value;
  closeModal(popup);
}

popupBtnOpenEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesk.textContent;
  openModal(popupEdit);
});

document.querySelectorAll(".popup").forEach((item) => {
  item.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(item);
    }
  });
});

formElement.addEventListener("submit", handleFormSubmit);
popupBtnOpenAdd.addEventListener("click", () => openModal(popupAdd));
document.addEventListener("keydown", handleEscape);
popupAdd.addEventListener("click", newCardAdd);

renderInitialCards();
