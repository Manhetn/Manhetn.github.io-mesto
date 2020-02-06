export class Popup {
  constructor(container) {
    this.container = container;//popup
    this.closePopup = this.closePopup.bind(this);
    this.open = this.open.bind(this);
  }
  open() {
    this.container.classList.add('popup_is-opened');  
  }
  gettingItems() {
    this.form = this.container.querySelector('.popup__form')
    this.inputName = this.form.elements.name;
    this.inputOther = this.form.elements.other;
    this.popupButton = this.container.querySelector('.popup__button');
    this.popupCloseButton = this.container.querySelector('.popup__close');
    this.popupCloseButton.addEventListener('click', this.closePopup);
  }
  closePopup() {
    this.container.classList.remove('popup_is-opened');
    this.container.removeChild(event.target.closest('.popup__all-content'));
    this.popupCloseButton.removeEventListener('click', this.closePopup);
  }  
  renderLoading(){
    this.popupButton.textContent = 'Загрузка...';
    this.popupButton.style.fontSize = '18px';
    this.popupButton.style.lineHeight = '22px';
  }
}