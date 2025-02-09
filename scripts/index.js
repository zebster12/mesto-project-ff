// @todo: Темплейт карточки
let cardTemp = document.querySelector("#card-template").content;

// @todo: DOM узлы
let list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(card, removeCard) {
  let cardClone = cardTemp.querySelector(".card").cloneNode(true);
  let removeButton = cardClone.querySelector(".card__delete-button");
  let title = cardClone.querySelector(".card__title");
  let img = cardClone.querySelector(".card__image");
  removeButton.addEventListener("click", function () {
    removeCard(cardClone);
  });
  title.textContent = card.name;
  img.src = card.link;
  return cardClone;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function (card) {
    list.append(addCard(card, removeCard));
  });
}
renderCards();
