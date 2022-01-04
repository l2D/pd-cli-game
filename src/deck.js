export default class Deck {
  constructor() {
    this.deck = [];
    this.initDeck();
  }

  initDeck() {
    let FACES = ["♣ Clubs", "♦ Diamons", "♥ Hearts", "♠ Spades"];
    let VALUES = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    for (var i = 0; i < FACES.length; i++) {
      for (var j = 0; j < VALUES.length; j++) {
        this.deck.push(`${FACES[i]}-${VALUES[j]}`);
      }
    }
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCards(players) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < players.length; j++) {
        players[j].receiveCard(this.deck.pop());
      }
    }
  }
}
