class Hand {

  constructor() {
    this.cardsInHand = {};
  }

  addCard(card) {
    if (this.cardsInHand[card.id] === undefined) {
      this.cardsInHand[card.id] = new CardInHand(card);
      return true;
    }
    return false;
  }

  deleteCardById(id) {
    delete this.cardsInHand[id];
  }

  contains(cardName) {
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked && card.card.name === cardName) {
          return true;
        }
      }
    }
    return false;
  }

  containsId(cardId) {
    return this.cardsInHand[id] !== undefined && !this.cardsInHand[id].blanked;
  }

  containsSuit(suitName) {
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked && card.card.suit === suitName) {
          return true;
        }
      }
    }
    return false;
  }

  countSuit(suitName) {
    var count = 0;
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked && card.card.suit === suitName) {
          count++;
        }
      }
    }
    return count;
  }

  countSuitExcluding(suitName, excludingCardId) {
    var count = 0;
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked && card.card.suit === suitName && card.card.id !== excludingCardId) {
          count++;
        }
      }
    }
    return count;
  }

  nonBlankedCards() {
    var result = [];
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked) {
          result.push(card);
        }
      }
    }
    return result;
  }

  score() {
    var score = 0;
    for (var id in this.cardsInHand) {
      if (this.cardsInHand.hasOwnProperty(id)) {
        var card = this.cardsInHand[id];
        if (!card.blanked) {
          score += card.card.strength;
        }
      }
    }
    return score;
  }

  clear() {
    this.cardsInHand = {};
  }

  length() {
    return this.cardsInHand.length;
  }

  toString() {
    return Object.keys(this.cardsInHand).join();
  }

  loadFromString(string) {
    this.clear();
    var cardIds = string.split(',');
    for (var i = 0; i < cardIds.length; i++) {
      var cardId = cardIds[i];
      this.addCard(deck.getCardById(cardId));
    }
  }
}

var hand = new Hand();

class CardInHand {

  constructor(card) {
    this.card = card;
    this.id = card.id;
    this.name = card.name;
    this.suit = card.suit;
    this.strength = card.strength;
    this.blanked = false;
  }

}
