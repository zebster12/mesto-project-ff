function createCard(card, removeCard, likesToogle, openImageBigSize) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  const removeButton = cardClone.querySelector(".card__delete-button");
  const title = cardClone.querySelector(".card__title");
  const img = cardClone.querySelector(".card__image");
  const cardLike = cardClone.querySelector(".card__like-button");
  const cardImage = cardClone.querySelector(".card__image");
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

function removeCard(card) {
  card.remove();
}

export { createCard, removeCard };
