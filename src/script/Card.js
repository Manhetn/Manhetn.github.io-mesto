class Card{
  constructor(api, owner){
    this.api = api;
    this.owner = owner;
  }
  getTemplateCard(cardData){
    let styleButtonDeleteCard = 'none';
    let stylelike = '';
    if(this.owner._id === cardData.owner._id){
      styleButtonDeleteCard = 'block';
    }
    if(cardData.likes.some(like => this.owner._id === like._id)){
      stylelike = 'place-card__like-icon_liked';
    }
    return `<div class="place-card" id = "${cardData._id}">
              <div class="place-card__image" style="background-image:url(${cardData.link})">
                <button class="place-card__delete-icon" style= "display: ${styleButtonDeleteCard}"></button>
              </div>
              <div class="place-card__description">
                <h3 class="place-card__name">${cardData.name}</h3>
                <div class="place-card__like-container">
                  <button class="place-card__like-icon ${stylelike}"></button>
                  <p class="place-card__like-counter">${cardData.likes.length}</p>
                </div>
              
              </div>
            </div>`;
  } 
  like(event) {
    let likeCounter = event.target.nextElementSibling;
    if (event.target.classList.contains("place-card__like-icon_liked")) {
      this.api.delete(`/cards/like/${event.target.closest(".place-card").id}`)
              .then(res => likeCounter.textContent = `${res.likes.length}`)
              .then(event.target.classList.remove("place-card__like-icon_liked"));          
    } else {
      this.api.put(`/cards/like/${event.target.closest(".place-card").id}`)
              .then(res =>likeCounter.textContent = `${res.likes.length}`)
              .then(event.target.classList.add("place-card__like-icon_liked"));  
    }
  }
  remove(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      
      this.api.delete(`/cards/${event.target.closest(".place-card").id}`)
              .then(event.target.closest(".place-card").remove())
    }
  }
}