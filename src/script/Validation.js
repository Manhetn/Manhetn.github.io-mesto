class Validation{
    constructor(words) {
        this.errorMessages = words;
        this.checkForm = this.checkForm.bind(this);
    }
  //метод проверки валидности формы
  checkForm(event) {
    if (event.target.classList.contains('popup__input')) {
      this.checkInput(event);
    }
    const [inputOne, inputTwo] = event.currentTarget.elements;
    if (!inputOne.validity.valid || !inputTwo.validity.valid) {      
      this.deactivationPopupButton(event);
    } else {
      this.activationPopupButton(event);
      this.removeErrorMessage(event.target);
    }
  }
  //метод проверки input
  checkInput(event) {
    if (!event.target.validity.valid) {
      this.checkLink(event);
      this.checkRange(event);
      this.checkEmptyInput(event);
    } else if (event.target.validity.valid) {
      this.removeErrorMessage(event.target);
    }
  }
  checkEmptyInput(event) {
    if (event.target.value.length === 0) {
      return this.makeErrorMessage(event.target, this.errorMessages['emptyInput']);
    }
  }
  checkLink(event){
    if (event.target.getAttribute('type') === 'url') {
      return this.makeErrorMessage(event.target, this.errorMessages['invalidLink']);
    }
  }
  checkRange(event){
    if (event.target.getAttribute('type') === 'text') {
      // можно лучше: Для валидации используйте кастомный метод validation
      // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
      if (event.target.value.length < 2 || event.target.value.length > 30) {
        return this.makeErrorMessage(event.target, this.errorMessages['outOfRange']);
      }
    }
  }
  //метод делающий сообщение ошибки  
  makeErrorMessage(elem, text) {
    let errorMessage = elem.parentElement.querySelector(`.popup__input_type_${elem.getAttribute('name')}-error`);
    errorMessage.classList.add('popup__error-active');
    errorMessage.textContent = text;
  }
  //метод удаляющий сообщение ошибки 
  removeErrorMessage(element) {
    let errorMessage = element.parentElement.querySelector(`.popup__input_type_${element.getAttribute('name')}-error`);
    errorMessage.classList.remove('popup__error-active');
    errorMessage.textContent = this.errorMessages['correctInput'];
  }
  //метод активации кнопки popup
  activationPopupButton(event) {
    const popupButton = event.currentTarget.querySelector("button");
    popupButton.classList.add('popup__button_active');
    popupButton.removeAttribute('disabled', false);
  }
  //метод деактивации кнопки popup
  deactivationPopupButton(event) {
    const popupButton = event.currentTarget.querySelector("button");
    popupButton.classList.remove('popup__button_active');
    popupButton.setAttribute('disabled', true);
  }
}