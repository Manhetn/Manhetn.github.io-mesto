import {Popup} from './Popup.js';
export class PopupImage extends Popup {
  constructor(container) {
    super(container);
    this.open = this.open.bind(this);
  }
  open() { 
    super.open();
    this.container.insertAdjacentHTML("beforeend", this.popupContent());
    this.gettingItems();
    this.image.setAttribute(`src`, `${event.target.style.backgroundImage.slice(5, -2)}`);
  }
  popupContent(){
    return `<div class="popup__image-container popup__all-content">
              <button class="popup__close popup__close_image-on-screen"></button>
              <img src="" alt="" class="image-popup"/>
            </div>`;
  }
  gettingItems() {
    this.image = this.container.querySelector('.image-popup');
    this.popupCloseButton = this.container.querySelector('.popup__close');
    this.popupCloseButton.addEventListener('click', this.closePopup);
  }
}