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
} from "./components/api";

//ID профиля
let profileIdMe = "";
//Все попапы страницы
const popups = document.querySelectorAll(".popup");
//Попапы страницы по отдельности
const popupTypeImg = document.querySelector(".popup_type_image");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileNewCard = document.querySelector(".popup_type_new-card");
const popupProfileNewImg = document.querySelector(
  ".popup_type_new-image-profile"
);
const popupConfirme = document.querySelector(".popup_type_confirme");
//Контейнер для рендера карточек
const cardsContainer = document.querySelector(".places__list");
//Все кнопки на странице(добавления карточки, редактирования профиля, редактирования картинки профиля)
const popupBtnEdit = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector(".profile__add-button");
const popupBtnProfileImg = document.querySelector(".profile__image");
//Все формы на странице
const popupProfileEditForm = document.forms["edit-profile"];
const popupProfileAddForm = document.forms["new-place"];
const popupProfileNewImgForm = document.forms["edit-change"];
//Нахождения классов имя и должность профиля
const profileTitle = document.querySelector(".profile__title");
const profileDesk = document.querySelector(".profile__description");
//Классы инпута уже в самой форме редактирования карточки
const nameInput = popupProfileEdit.querySelector(".popup__input_type_name");
const jobInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);
//Класс инпута в попап для изменения изображения
const imgInput = document.querySelector(".popup__input_type_card-change");
//Конфиг с классами для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button__active",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
//Изменение данных профиля имя и должность
function handleProfileFormSubmitEdit(evt) {
  evt.preventDefault();
  renderLoader(true, evt.submitter, "Сохранение...");
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
      renderLoader(false, evt.submitter, "Сохранить");
    });
}
//Функция для изменения изображения профиля
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
//Функция для смены текста у кнопки при загрузки данных с сервера
function renderLoader(isLoad, button, buttonText) {
  const submitButton = button;
  const originalText = submitButton.textContent;
  submitButton.textContent = buttonText;
  submitButton.disabled = isLoad;
}
//Добавления новой карточки на сервер
function addNewCard(evt) {
  evt.preventDefault();
  renderLoader(true, evt.submitter, "Сохранение...");

  const nameNewCard = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const urlNewCard = document.querySelector(".popup__input_type_url").value;

  postNewCard(nameNewCard, urlNewCard)
    .then((data) => {
      let cardClone = createCard(
        data,
        openImageBigSize,
        profileIdMe,
        removeCard
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

//Открытие изображения карточки в большом размере
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
//открытие попап добавления карточки
popupBtnAdd.addEventListener("click", function () {
  popupProfileAddForm.reset();
  clearValidation(popupProfileAddForm, validationConfig);
  openModal(popupProfileNewCard);
});
//Открытие попап по клику аватарки профиля
popupBtnProfileImg.addEventListener("click", function () {
  popupProfileNewImgForm.reset();
  clearValidation(popupProfileNewImgForm, validationConfig);
  openModal(popupProfileNewImg);
});

function deleteConfirme(card, _id) {
  deleteCard(_id)
    .then((_id) => {
      card.remove();
      closeModal(popupConfirme);
    })
    .catch((error) => {
      console.log(error);
    });
}
//Функция для удаления карточки
function removeCard(card, id) {
  openModal(popupConfirme);

  const button = popupConfirme.querySelector(".popup__button");

  button.onclick = function (event) {
    event.preventDefault();

    deleteConfirme(card, id);
  };
}

//Открытие попап редактирование профиля
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
//Одновременная загрузка карточек и профиля
Promise.all([getInitialCards(), getProfileData()])
  .then(([cards, profile]) => {
    profileTitle.textContent = profile.name;
    profileDesk.textContent = profile.about;
    popupBtnProfileImg.style.backgroundImage = `url(${profile.avatar})`;
    profileIdMe = profile._id;
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(card, openImageBigSize, profileIdMe, removeCard)
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке карточек:", err);
  });
