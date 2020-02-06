import {Popup} from './Popup.js';
export class PopupEdit extends Popup {
  constructor(container, validation, user) {
    super(container);
    this.validation = validation;
    this.profile = user;
    this.saveEdit = this.saveEdit.bind(this);
  }
  open() {
    super.open();
    this.container.insertAdjacentHTML("beforeend", this.popupContent());
    super.gettingItems();
    this.setEventListener();
    this.inputName.value = this.profile.name.textContent;
    this.inputOther.value = this.profile.other.textContent;    
  }
  popupContent(){ 
    return  `<div class="popup__content popup__all-content">
              <Button class="popup__close popup-edit__close"></button>
              <h3 class="popup__title">Редактировать профиль</h3>
              <form class="popup__form" novalidate name="new">
                <input type="text" required minlength="2" maxlength="30" name="name" class="popup__input popup__input_type_name" placeholder="Имя">
                <span class="popup__error popup__input_type_name-error"></span>
                <input type="text" required minlength="2" maxlength="30" name="other" class="popup__input popup__input_type_job" placeholder="О себе">
                <span class="popup__error popup__input_type_other-error"></span>
                <button type="submit" name='saveButton' class="button popup__button popup__button_save popup__button_active">Сохранить</button>
              </form>
            </div>`;
  }
  setEventListener(){
    this.form.addEventListener('input', this.validation.checkForm);
    this.popupButton.addEventListener('click', this.saveEdit);
  }
  removeEventListener(){
    this.form.removeEventListener('input', this.validation.checkForm);
    this.popupButton.removeEventListener('click', this.saveEdit);
  }
  saveEdit() {
    event.preventDefault();
    super.renderLoading();
    this.profile.changeProfile('/users/me',
                               {
                                name: `${this.inputName.value}`,
                                about: `${this.inputOther.value}`
                               });
    super.closePopup();
    this.removeEventListener();
  }
}


