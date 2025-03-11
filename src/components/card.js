import { initialCards } from "../cards";
import { openModal, closeModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(card, removeCard, likesToogle, openImageBigSize) {
  let cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  let removeButton = cardClone.querySelector(".card__delete-button");
  let title = cardClone.querySelector(".card__title");
  let img = cardClone.querySelector(".card__image");
  let cardLike = cardClone.querySelector(".card__like-button");
  let cardImage = cardClone.querySelector(".card__image");
  cardLike.addEventListener("click", function () {
    likesToogle(cardLike);
  });
  cardImage.addEventListener("click", function (event) {
    openImageBigSize(event);
  });
  removeButton.addEventListener("click", function () {
    removeCard(cardClone);
  });
  title.textContent = card.name;
  img.src = card.link;
  img.alt = card.name;
  return cardClone;
}

function newCardAdd(event) {
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

  const popup = document.querySelector(".popup_type_new-card");
  closeModal(popup);
}

function likesToogle(event) {
  event.classList.toggle("card__like-button_is-active");
}

function openImageBigSize(event) {
  const clickedImage = event.target;
  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");
  popupImage.src = clickedImage.src;
  popupImage.alt = clickedImage.alt;
  popupCaption.textContent = clickedImage.alt;
  openModal(popup);
}

function removeCard(card) {
  card.remove();
}

function renderInitialCards() {
  initialCards.forEach(function (card) {
    cardsContainer.append(
      createCard(card, removeCard, likesToogle, openImageBigSize)
    );
  });
}

renderInitialCards();
export {
  createCard,
  removeCard,
  renderInitialCards,
  likesToogle,
  openImageBigSize,
  newCardAdd,
};
