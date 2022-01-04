import readlineSync from "readline-sync";
import Deck from "./deck.js";
import Player from "./player.js";

export default class Game {
  constructor() {
    this.round = 1;
    this.deck = new Deck();
    this.players = [];
    this.prizePool = 0;
  }

  initGame() {
    this.deck.shuffleDeck();
    this.players.push(new Player("player"));
    this.players.push(new Player("dealer"));
  }

  playGame() {
    console.log(`Round ${this.round}`);
    this.initGame();
    this.play();
  }

  raisePrizePool(playerBet, dealerBet) {
    this.prizePool += playerBet + dealerBet;
  }

  clearCards(Players) {
    for (let i = 0; i < Players.length; i++) {
      Players[i].clearCards();
    }
  }

  clearPrizePool() {
    this.prizePool = 0;
  }

  play() {
    // Clear cards and prizePool.
    this.clearCards(this.players);
    this.clearPrizePool();

    const player = this.players[0];
    const dealer = this.players[1];
    // console.log(`player`, player);
    const playerBet = readlineSync.question("How much do you want to bet? ");
    const dealerBet = playerBet;
    if (this.placeBet(playerBet, player)) {
      this.raisePrizePool(parseInt(playerBet, 10), parseInt(dealerBet, 10));
    }
    console.log(`Your bet is ${playerBet}`);

    // Deal cards.
    this.deck.dealCards([player, dealer]);
    this.showCards();

    this.findWinner();

    this.playAgain();
  }

  showCards() {
    const player = this.players[0];
    const dealer = this.players[1];
    console.log(`Your cards are: ${player.cards}`);
    console.log(`Dealer's cards are: ${dealer.cards}`);
  }

  placeBet(bet, player) {
    if (bet > player.wallet) {
      console.log(`You don't have enough money to place that bet`);
      console.log(`Your init. wallet is ${player.wallet}`);
      process.exit(1);
    } else {
      player.wallet -= bet;
      return true;
    }
  }

  calculateScore(player) {
    let score = 0;
    for (let i = 0; i < player.cards.length; i++) {
      if (player.cards[i].includes("Ace")) {
        score += 1;
      } else if (
        player.cards[i].includes("Jack") ||
        player.cards[i].includes("Queen") ||
        player.cards[i].includes("King") ||
        player.cards[i].includes("10")
      ) {
        score += 0;
      } else {
        score += Number(player.cards[i].split("-")[1]);
      }
    }
    return score;
  }

  findWinner() {
    const player = this.players[0];
    const dealer = this.players[1];
    const playerScore = this.calculateScore(player);
    const dealerScore = this.calculateScore(dealer);
    console.table({ playerScore, dealerScore });
    if (playerScore > dealerScore) {
      console.log(`You win!`);
      player.win(this.prizePool);
    } else if (playerScore < dealerScore) {
      console.log(`Dealer wins!`);
      dealer.win(this.prizePool);
    } else {
      console.log(`It's a tie!`);
    }

    console.log(`this.prizePool`, this.prizePool);
    console.log(`player >> `, player);
    console.log(`dealer >> `, dealer);
  }

  playAgain() {
    const answer = readlineSync.question("Do you want to play again? ", {
      limit: ["y", "n"],
      limitMessage: "Please enter y or n",
    });
    if (answer.toLowerCase() === "y") {
      this.round++;
      this.playGame();
    } else {
      console.log("Thanks for playing!");
      console.log(`Your wallet is ${this.players[0].wallet}`);
    }
  }
}
