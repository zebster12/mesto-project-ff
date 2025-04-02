(()=>{"use strict";function e(e){e.classList.add("popup_is-animated","popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"34cc4979-589f-4718-bdc8-9224888239d5","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function c(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(o)}function a(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(o)}function i(e,t,n,r,o,i){var u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__title"),d=u.querySelector(".card__image"),p=u.querySelector(".card__like-button"),f=u.querySelector(".card__image"),_=u.querySelector(".card__like-text");_.textContent=e.likes.length;var m=!1;return e.likes.forEach((function(e){if(e._id===n)return m=!0,!0})),function(e,t){t?e.classList.add("card__like-button_is-active"):e.classList.remove("card__like-button_is-active")}(p,m),p.addEventListener("click",(function(t){var n,r,o;t.preventDefault(),console.log("1"),n=p,r=e._id,o=_,(n.classList.contains("card__like-button_is-active")?a:c)(r).then((function(e){n.classList.toggle("card__like-button_is-active"),o&&(o.textContent=e.likes.length)}))})),f.addEventListener("click",(function(e){e.preventDefault(),t(e)})),n===e.owner._id?l.onclick=function(t){t.preventDefault(),console.log("1"),function(e,t,n,r,o){o(n),n.querySelector(".popup__button").onclick=function(n){n.preventDefault(),r(e,t)}}(u,e._id,r,o,i)}:l.remove(),s.textContent=e.name,d.src=e.link,d.alt=e.name,u}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),l(n,r,t)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p="",f=document.querySelectorAll(".popup"),_=document.querySelector(".popup_type_image"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_new-image-profile"),h=document.querySelector(".popup_type_confirme"),b=document.querySelector(".places__list"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__image"),C=document.forms["edit-profile"],E=document.forms["new-place"],L=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),x=m.querySelector(".popup__input_type_name"),A=m.querySelector(".popup__input_type_description"),U=document.querySelector(".popup__input_type_card-change"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button__active",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function D(e,t,n){var r=t;r.textContent,r.textContent=n,r.disabled=e}function O(t){var n=t.target,r=_.querySelector(".popup__image"),o=_.querySelector(".popup__caption");r.src=n.src,r.alt=n.alt,o.textContent=n.alt,e(_)}function T(e,n){(function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers,body:JSON.stringify({_id:e})}).then(o)})(n).then((function(t){e.remove()})),t(h)}f.forEach((function(e){e.addEventListener("click",(function(n){(n.target.classList.contains("popup__close")||n.target.classList.contains("popup"))&&t(e)}))})),g.addEventListener("click",(function(){E.reset(),s(E,w),e(y)})),q.addEventListener("click",(function(){return e(v)})),S.addEventListener("click",(function(){s(C,w),x.value=L.textContent,A.value=k.textContent,e(m)})),y.addEventListener("submit",(function(n){var c,a;n.preventDefault(),D(!0,n.submitter,"Сохранение..."),(c=document.querySelector(".popup__input_type_card-name").value,a=document.querySelector(".popup__input_type_url").value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:c,link:a})}).then(o)).then((function(r){var o=i(r,O,p,h,T,e);b.prepend(o),n.target.reset(),t(y)})).catch((function(e){console.log("Ошибка:",e)})).finally((function(){D(!1,n.submitter,"Сохранить")}))})),m.addEventListener("submit",(function(e){var n,c;e.preventDefault(),D(!0,e.submitter,"Сохранение..."),(n=x.value,c=A.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:c})}).then(o)).then((function(e){L.textContent=e.name,k.textContent=e.about,t(m)})).catch((function(e){console.log("Ошибка:",e)})).finally((function(){D(!1,e.submitter,"Сохранить")}))})),v.addEventListener("submit",(function(e){var n;e.preventDefault(),D(!0,e.submitter,"Сохранение..."),(n=U.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),t(v)})).catch((function(e){console.log("Ошибка:",e)})).finally((function(){D(!1,e.submitter,"Сохранить")}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=t.dataset.errorMessage,o=t.validationMessage;t.validity.patternMismatch?t.setCustomValidity(r):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,o,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(w),Promise.all([fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then(o)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];L.textContent=a.name,k.textContent=a.about,q.style.backgroundImage="url(".concat(a.avatar,")"),p=a._id,c.forEach((function(t){b.append(i(t,O,p,h,T,e))}))})).catch((function(e){console.error("Ошибка при загрузке карточек:",e)}))})();