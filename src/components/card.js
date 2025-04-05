import { addLike, removeLike } from "./api";

//Функция для создания карточки
function createCard(card, openImageBigSize, profileIdMe, removeCard) {
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
    removeButton.onclick = function (event) {
      event.preventDefault();
      removeCard(cardClone, card._id);
    };
  } else {
    removeButton.remove();
  }

  title.textContent = card.name;
  img.src = card.link;
  img.alt = card.name;
  return cardClone;
}

//Добавление или удаление лайка у карточки
function likesToogle(likeButton, cardId, likeCounterElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      if (likeCounterElement) {
        likeCounterElement.textContent = updatedCard.likes.length;
      }
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    });
}
//Добавить или убрать класс для лайка
function setLikeActive(likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

export { createCard, likesToogle };
