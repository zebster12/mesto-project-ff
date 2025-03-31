import "./pages/index.css";

import { openModal, closeModal } from "./components/modal";
import { createCard, removeCard } from "./components/card";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getInitialCards,
  renameProfile,
  changeAvatar,
  getProfileData,
  postNewCard,
} from "./components/api";

let profileIdMe = "";

const popups = document.querySelectorAll(".popup");

const popupTypeImg = document.querySelector(".popup_type_image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileNewCard = document.querySelector(".popup_type_new-card");
const popupProfileNewImg = document.querySelector(
  ".popup_type_new-image-profile"
);
//
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

getProfileData().then((data) => {
  profileTitle.textContent = data.name;
  profileDesk.textContent = data.about;
  popupBtnProfileImg.style.backgroundImage = `url(${data.avatar})`;
  profileIdMe = data._id;
});

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
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

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
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

function changeImageNew(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  changeAvatar(imgInput.value)
    .then((data) => {
      popupBtnProfileImg.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupProfileNewImg);
    })
    .catch((err) => {
      console.log("Ошибка:", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

function renderLoader(toogle = false, button, text) {
  const submitButton = button;
  const originalText = submitButton.textContent;
  submitButton.textContent = text;
  submitButton.disabled = toogle;
}

function addNewCard(event) {
  event.preventDefault();
  renderLoader(true, event.submitter, "Сохранение...");
  const nameNewCard = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const urlNewCard = document.querySelector(".popup__input_type_url").value;

  postNewCard(nameNewCard, urlNewCard).then((data) => {
    const cardClone = createCard(
      data,
      removeCard,
      likesToogle,
      openImageBigSize,
      profileIdMe
    );
    cardsContainer.prepend(cardClone);
    event.target.reset();
    closeModal(popupProfileNewCard);
  });
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

//рендер всех карточек
function renderInitialCards() {
  getInitialCards()
    .then((cards) => {
      cards.forEach((card) => {
        console.log(card);
        cardsContainer.append(
          createCard(card, removeCard, openImageBigSize, profileIdMe)
        );
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
    });
}

//вызов валидации с передачей обьекта параметров
enableValidation(validationConfig);

//вызов рендера карточек
renderInitialCards();
