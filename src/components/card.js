function createCard(
  card,
  removeCard,
  openImageBigSize,
  profileIdMe,
  setLikeActive,
  likesToogle
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  const removeButton = cardClone.querySelector(".card__delete-button");
  const title = cardClone.querySelector(".card__title");
  const img = cardClone.querySelector(".card__image");
  const cardLike = cardClone.querySelector(".card__like-button");
  const cardImage = cardClone.querySelector(".card__image");
  const cardLikeNumber = cardClone.querySelector(".card__like-text");
  cardLikeNumber.textContent = card.likes.length;

  let isLiked = false;
  card.likes.forEach((element) => {
    if (element._id === profileIdMe) {
      isLiked = true;
      return true;
    }
  });
  setLikeActive(cardLike, isLiked);

  cardLike.addEventListener("click", (event) => {
    event.preventDefault();
    likesToogle(cardLike, card._id, cardLikeNumber);
  });

  cardImage.addEventListener("click", function (event) {
    event.preventDefault();
    openImageBigSize(event);
  });

  if (profileIdMe === card.owner._id) {
    removeButton.addEventListener("click", function (event) {
      event.preventDefault();
      removeCard(cardClone, card._id);
    });
  } else {
    removeButton.remove();
  }

  title.textContent = card.name;
  img.src = card.link;
  img.alt = card.name;
  return cardClone;
}

export { createCard };
