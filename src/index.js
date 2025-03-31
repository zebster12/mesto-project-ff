import "./pages/index.css";
import { openModal, closeModal } from "./components/modal";
import { createCard } from "./components/card";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getInitialCards,
  renameProfile,
  changeAvatar,
  getProfileData,
  postNewCard,
  deleteCard,
  addLike,
  removeLike,
} from "./components/api";

let profileIdMe = "";

const popups = document.querySelectorAll(".popup");

const popupTypeImg = document.querySelector(".popup_type_image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileNewCard = document.querySelector(".popup_type_new-card");
const popupProfileNewImg = document.querySelector(
  ".popup_type_new-image-profile"
);
const popupConfirme = document.querySelector(".popup_type_confirme");
console.log(popupConfirme);
const cardsContainer = document.querySelector(".places__list");

const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupBtnProfileImg = document.querySelector(".profile__image");

const popupProfileEditForm = document.forms["edit-profile"];
const popupProfileAddForm = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDesk = document.querySelector(".profile__description");

const nameInput = popupProfileEdit.querySelector(".popup__input_type_name");
const jobInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);

const imgInput = document.querySelector(".popup__input_type_card-change");
popupBtnProfileImg.addEventListener("click", () =>
  openModal(popupProfileNewImg)
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button__active",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

function handleProfileFormSubmitEdit(evt) {
  evt.preventDefault();

  renameProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDesk.textContent = data.about;
      closeModal(popupProfileEdit);
    })

    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoader(true, evt.submitter, "Сохранение...");
    });
}

function changeImageNew(evt) {
  evt.preventDefault();
  renderLoader(true, evt.submitter, "Сохранение...");
  changeAvatar(imgInput.value)
    .then((data) => {
      popupBtnProfileImg.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupProfileNewImg);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoader(false, evt.submitter, "Сохранить");
    });
}

function renderLoader(isLoad, button, buttonText) {
  const submitButton = button;
  const originalText = submitButton.textContent;
  submitButton.textContent = buttonText;
  submitButton.disabled = isLoad;
}

function addNewCard(evt) {
  evt.preventDefault();

  const nameNewCard = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const urlNewCard = document.querySelector(".popup__input_type_url").value;

  renderLoader(true, evt.submitter, "Сохранение...");
  postNewCard(nameNewCard, urlNewCard)
    .then((data) => {
      let cardClone = createCard(
        data,
        removeCard,
        openImageBigSize,
        profileIdMe,
        setLikeActive,
        likesToogle
      );
      cardsContainer.prepend(cardClone);
      evt.target.reset();
      closeModal(popupProfileNewCard);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      renderLoader(false, evt.submitter, "Сохранить");
    });
}

function likesToogle(likeButton, cardId, likeCounterElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId).then((updatedCard) => {
    likeButton.classList.toggle("card__like-button_is-active");
    if (likeCounterElement) {
      likeCounterElement.textContent = updatedCard.likes.length;
    }
  });
}
function setLikeActive(likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
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

function removeCard(card, _id) {
  const button = popupConfirme.querySelector(".popup__button");
  console.log(button);
  let deleteConfirme = (event) => {
    event.preventDefault();
    deleteCard(_id).then(() => {
      card.remove();
      closeModal(popupConfirme);
      button.removeEventListener("click", deleteConfirme);
    });
  };

  button.addEventListener("click", deleteConfirme);

  openModal(popupConfirme);
}
function deleteConfirme(event, card, _id) {
  event.preventDefault();
  deleteCard(_id).then(() => {
    card.remove();
  });
}
//Закрытие по крестику или вне попапа
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

//открытие попап для добавления карточки
popupBtnAdd.addEventListener("click", function () {
  clearValidation(popupProfileAddForm, validationConfig);
  popupProfileAddForm.reset();
  openModal(popupProfileNewCard);
});

//Открытие попап для редактирование профиля
popupBtnEdit.addEventListener("click", function () {
  clearValidation(popupProfileEditForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesk.textContent;
  openModal(popupProfileEdit);
});

//Отправка форм
popupProfileNewCard.addEventListener("submit", addNewCard);

popupProfileEdit.addEventListener("submit", handleProfileFormSubmitEdit);

popupProfileNewImg.addEventListener("submit", changeImageNew);

//вызов валидации с передачей обьекта параметров
enableValidation(validationConfig);

Promise.all([getInitialCards(), getProfileData()])
  .then(([cards, profile]) => {
    profileTitle.textContent = profile.name;
    profileDesk.textContent = profile.about;
    popupBtnProfileImg.style.backgroundImage = `url(${profile.avatar})`;
    profileIdMe = profile._id;
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card,
          removeCard,
          openImageBigSize,
          profileIdMe,
          setLikeActive,
          likesToogle
        )
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке карточек:", err);
  });
