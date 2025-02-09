// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, removeCard) {
  let cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  let removeButton = cardClone.querySelector(".card__delete-button");
  let title = cardClone.querySelector(".card__title");
  let img = cardClone.querySelector(".card__image");
  removeButton.addEventListener("click", function () {
    removeCard(cardClone);
  });
  title.textContent = card.name;
  img.src = card.link;
  img.alt=card.name;
  return cardClone;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach(function (card) {
    cardsContainer.append(createCard(card, removeCard));
  });
}
renderInitialCards();
