class PopupAvatar extends Popup {
  constructor(container, validation, user) {
    super(container);
    
    this.validation = validation;
    this.profile = user;
    this.save = this.save.bind(this);
  }
  open() {
    super.open();
    this.container.insertAdjacentHTML("beforeend", this.popupContent());
    this.gettingItems();
    this.setEventListener();   
  }
  popupContent(){ 
    return  `<div class="popup__content popup__all-content">
              <img src="./images/close.svg" alt="" class="popup__close popup-edit__close">
              <h3 class="popup__title">Обновить аватар</h3>
              <form class="popup__form" novalidate name="new">
                <input type="url" required name="other" class="popup__input popup__input_type_link-url" placeholder="Ссылка на аватар">
                <span class="popup__error popup__input_type_other-error"></span>
                <button type="submit" name='saveButton' class="button popup__button popup__button_save">Сохранить</button>
              </form>
            </div>`;
  }
  gettingItems() {
    this.form = this.container.querySelector('.popup__form')
    this.inputOther = this.form.elements.other;
    this.popupButton = this.container.querySelector('.popup__button');
    this.popupCloseButton = this.container.querySelector('.popup__close');
    
  }
  setEventListener(){
    this.form.addEventListener('input', this.validation.checkForm);
    this.popupButton.addEventListener('click', this.save);
    this.popupCloseButton.addEventListener('click', this.closePopup);
  }
  removeEventListener(){
    this.form.removeEventListener('input', this.validation.checkForm);
    this.popupButton.removeEventListener('click', this.save);
  }
  save() {
    event.preventDefault();
    super.renderLoading();
    this.profile.changeProfile('/users/me/avatar',
                                {
                                avatar:`${this.inputOther.value}`
                                });
    super.closePopup();
    this.removeEventListener();
  } 
}