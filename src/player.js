export default class Player {
  constructor(type) {
    this.type = type;
    this.wallet = 50;
    this.score = 0;
    this.cards = [];
  }

  receiveCard(card) {
    this.cards.push(card);
  }

  clearCards() {
    this.cards = [];
  }

  win(amount) {
    this.wallet += amount;
  }

  loose(amount) {
    this.wallet -= amount;
  }
}
