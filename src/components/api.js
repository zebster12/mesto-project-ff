const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "34cc4979-589f-4718-bdc8-9224888239d5",
    "Content-Type": "application/json",
  },
};

const response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
//Получение всех карточек с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(response);
}
//Получение профиля с сервера
function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(response);
}
//Изменение данных на сервере
function renameProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(response);
}
//Изменение аватара на сервере
function changeAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(response);
}
//Добавление новой карточки на сервер
function postNewCard(name, link, _id) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(response);
}
//Удаление карточки
function deleteCard(_id) {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: _id,
    }),
  }).then(response);
}
//Добавление лайка на сервере
function addLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(response);
}
//Удаление лайка на сервере
function removeLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(response);
}

export {
  getInitialCards,
  renameProfile,
  changeAvatar,
  getProfileData,
  postNewCard,
  deleteCard,
  removeLike,
  addLike,
};
