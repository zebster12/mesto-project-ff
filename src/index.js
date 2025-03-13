import "./pages/index.css";
import { initialCards } from "./cards";
import { openModal, closeModal, handleEscape } from "./components/modal";
import { createCard, removeCard } from "./components/card";

const popups = document.querySelectorAll(".popup");

const popupTypeImg = document.querySelector(".popup_type_image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileNewCard = document.querySelector(".popup_type_new-card");

const cardsContainer = document.querySelector(".places__list");

const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");

const nameInput = popupProfileEdit.querySelector(".popup__input_type_name");
const jobInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDesk = document.querySelector(".profile__description");

function handleProfileFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesk.textContent = jobInput.value;
  closeModal(popupProfileEdit);
}

popupBtnEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesk.textContent;
  openModal(popupProfileEdit);
});

function addNewCard(event) {
  event.preventDefault();
  const nameNewCard = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const urlNewCard = document.querySelector(".popup__input_type_url").value;
  const card = {
    name: nameNewCard,
    link: urlNewCard,
  };
  const cardClone = createCard(card, removeCard, likesToogle, openImageBigSize);
  cardsContainer.prepend(cardClone);
  event.target.reset();
  closeModal(popupProfileNewCard);
}

function likesToogle(event) {
  event.classList.toggle("card__like-button_is-active");
}

function openImageBigSize(event) {
  const clickedImage = event.target;
  const popupImage = popupTypeImg.querySelector(".popup__image");
  const popupCaption = popupTypeImg.querySelector(".popup__caption");
  popupImage.src = clickedImage.src;
  popupImage.alt = clickedImage.alt;
  popupCaption.textContent = clickedImage.alt;
  openModal(popupTypeImg);
}

popups.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
});

popupBtnAdd.addEventListener("click", () => openModal(popupProfileNewCard));
popupProfileNewCard.addEventListener("submit", addNewCard);
popupProfileEdit.addEventListener("submit", handleProfileFormSubmitEdit);

function renderInitialCards() {
  initialCards.forEach(function (card) {
    cardsContainer.append(
      createCard(card, removeCard, likesToogle, openImageBigSize)
    );
  });
}

renderInitialCards();
