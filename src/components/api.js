const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "34cc4979-589f-4718-bdc8-9224888239d5",
    "Content-Type": "application/json",
  },
};

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function renameProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}
function changeAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}

function postNewCard(name, link, _id) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}
function deleteCard(_id) {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      id: _id,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}

function addLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}

function removeLike(_id) {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
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
