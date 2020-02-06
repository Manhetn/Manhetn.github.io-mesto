class CardList {
  constructor(placesList, cardObj){
    this.placesList = placesList;
    this.cardObj = cardObj;
    this.add = this.add.bind(this);
    this.render = this.render.bind(this);
  }
  add(cardData) {
    this.placesList.insertAdjacentHTML("beforeend", this.cardObj.getTemplateCard(cardData));
  }
  render(path) {
    this.cardObj.api.getData(path)
            .then(cardsArr =>{ 
              for (let cardData of cardsArr){
                this.add(cardData);
              }
            }); 
  }
}

