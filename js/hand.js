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
    return this.cardsInHand[cardId] !== undefined && !this.cardsInHand[cardId].blanked;
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

  cards() {
    return Object.values(this.cardsInHand);
  }

  score() {
    var score = 0;
    this._resetHand();
    this._clearPenalties();
    this._applyBlanking();
    for (const card of this.nonBlankedCards()) {
      score += card.score(this);
    }
    return score;
  }

  _resetHand() {
    for (const card of this.cards()) {
      card.reset();
    }
  }

  _clearPenalties() {
    for (const card of this.cards()) {
      if (card.card.clearsPenalty !== undefined) {
        for (const target of this.cards()) {
          if (card.card.clearsPenalty(target)) {
            target.penaltyCleared = true;
          }
        }
      }
    }
  }

  _applyBlanking() {
    // TODO: cards that are blanked should not blank other cards?
    for (const card of this.cards()) {
      if (card.card.blanks !== undefined) {
        for (const target of this.cards()) {
          if (card.card.blanks(target)) {
            console.log(card.name + ' blanks ' + target.name);
            target.blanked = true;
          }
        }
      }
    }
  }

  clear() {
    this.cardsInHand = {};
  }

  size() {
    return Object.keys(this.cardsInHand).length;
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
    this.reset();
  }

  reset() {
    this.id = this.card.id;
    this.name = this.card.name;
    this.suit = this.card.suit;
    this.strength = this.card.strength;
    this.blanked = false;
    this.penalty = 0;
    this.bonus = 0;
  }

  score(hand) {
    if (this.card.bonusScore !== undefined) {
      this.bonus = this.card.bonusScore(hand);
    } else {
      this.bonus = 0;
    }
    if (this.card.penaltyScore !== undefined) {
      this.penalty = this.card.penaltyScore(hand);
    } else {
      this.penalty = 0;
    }
    return this.strength + this.bonus + this.penalty;
  }

  points() {
    return this.blanked ? 0 : (this.strength + this.bonus + this.penalty);
  }

}
