class PopupAddImage extends Popup {
  constructor(container, validation, cardList) {
    super(container);
    this.container = container;
    this.validation = validation;
    this.cardList = cardList;
    this.addImageCard = this.addImageCard.bind(this);
  }
  open() {
    super.open();
    this.container.insertAdjacentHTML("beforeend", this.popupContent());
    super.gettingItems();
    this.setEventListener();
  }
  popupContent(){
    return  `<div class="popup__content popup__all-content">
              <img src="./images/close.svg" alt="" class="popup__close popup-image__close">
              <h3 class="popup__title">Новое место</h3>
              <form class="popup__form" name="new">
                <input type="text" required minlength="2" maxlength="30" name="name" class="popup__input popup__input_type_name" placeholder="Название">
                <span class="popup__error popup__input_type_name-error"></span>
                <input type="url" required name="other" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
                <span class="popup__error popup__input_type_other-error"></span>
                <button type="submit" class="button popup__button popup__button_add">+</button>
              </form>
            </div>`;
  }
  setEventListener(){
    this.form.addEventListener('input', this.validation.checkForm);
    this.popupButton.addEventListener('click', this.addImageCard);
  }
  removeEventListener(){
    this.form.removeEventListener('input', this.validation.checkForm);
    this.popupButton.removeEventListener('click', this.addImageCard);
  }
  addImageCard(event) {
    event.preventDefault();
    super.renderLoading();
    let newCard = {
                name: `${this.inputName.value}`,
                link: `${this.inputOther.value}`
              };
    this.cardList.cardObj.api.sendData('/cards', newCard)
                             .then(this.cardList.add);
    super.closePopup();
    this.removeEventListener();
  }
}