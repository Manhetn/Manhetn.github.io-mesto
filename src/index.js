import './pages/style.css';
import {Api} from './modules/Api.js';
import {Card} from './modules/Card.js';
import {CardList} from './modules/CardList.js';
import {Owner } from './modules/Owner.js';
import {PopupAddImage} from './modules/PopupAddImage.js';
import {PopupAvatar} from './modules/PopupAvatar.js';
import {PopupEdit} from './modules/PopupEdit.js';
import {PopupImage} from './modules/PopupImage.js';
import {Profile} from './modules/Profile.js';
import {Validation} from './modules/Validation.js';
import {Popup} from './modules/Popup.js';

const errorMessages = {
  emptyInput: "Это обязательное поле",
  outOfRange: "Должно быть от 2 до 30 символов",
  invalidLink: "Здесь должна быть ссылка",
  correctInput: ""
};
const buttonEdit = document.querySelector('.edit_button');
const addImageButton = document.querySelector('.add-image__button');
const placesList = document.querySelector(".places-list");
const popupContainer = document.querySelector(".popup");
const avatar = document.querySelector('.user-info__photo');

const api = new Api({
  url: "http://95.216.175.5/cohort6",
  headers: {
    authorization: "4f8897cc-db33-44fa-9718-d936c615848c",
    "Content-Type": "application/json"
  }
});
const owner = new Owner();
const profile = new Profile(document.querySelector(".user-info"), api, owner);
const card = new Card(api, owner);
const cardList = new CardList(placesList, card);
const validation = new Validation(errorMessages);
const popup = new Popup(popupContainer);
const popupAvatar = new PopupAvatar(popupContainer, validation, profile);
const popupEdit = new PopupEdit(popupContainer, validation, profile);
const popupAddImage = new PopupAddImage(popupContainer, validation, cardList, api);
const popupImage = new PopupImage(popupContainer);

profile.getProfile('/users/me');
cardList.render('/cards');
buttonEdit.addEventListener('click', popupEdit.open);
addImageButton.addEventListener('click', popupAddImage.open);
avatar.addEventListener('click', popupAvatar.open);

placesList.addEventListener('click', event => {
  if (event.target.classList.contains('place-card__like-icon')) {
    return card.like(event);
  }
  if (event.target.classList.contains('place-card__delete-icon')){
    return card.remove(event);
  }
  if (event.target.classList.contains('place-card__image')) {
    return popupImage.open();
  }
});



