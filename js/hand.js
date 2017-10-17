class Hand {

  constructor() {
    this.cardsInHand = {};
  }

  addCard(card) {
    if (this.cardsInHand[card.id] === undefined && !this.complete()) {
      this.cardsInHand[card.id] = new CardInHand(card);
      return true;
    }
    return false;
  }

  deleteCardById(id) {
    delete this.cardsInHand[id];
  }

  contains(cardName) {
    for (const card of this.nonBlankedCards()) {
      if (card.name === cardName) {
        return true;
      }
    }
    return false;
  }

  containsId(cardId) {
    return this.cardsInHand[cardId] !== undefined && !this.cardsInHand[cardId].blanked;
  }

  containsSuit(suitName) {
    for (const card of this.nonBlankedCards()) {
      if (card.suit === suitName) {
        return true;
      }
    }
    return false;
  }

  countSuit(suitName) {
    var count = 0;
    for (const card of this.nonBlankedCards()) {
      if (card.suit === suitName) {
        count++;
      }
    }
    return count;
  }

  countSuitExcluding(suitName, excludingCardId) {
    var count = 0;
    for (const card of this.nonBlankedCards()) {
      if (card.suit === suitName && card.id !== excludingCardId) {
        count++;
      }
    }
    return count;
  }

  nonBlankedCards() {
    return this.cards().filter(function(card) {
      return !card.blanked;
    });
  }

  cards() {
    return Object.values(this.cardsInHand);
  }

  cardNames() {
    return this.cards().map(function (card) {
      return card.name;
    });
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
    for (const card of this.cards()) {
      if (card.card.blanks !== undefined && !card.penaltyCleared && !this._cardBlanked(card)) {
        for (const target of this.cards()) {
          if (card.card.blanks(target, this)) {
            console.log(card.name + ' blanks ' + target.name);
            target.blanked = true;
          }
        }
      }
    }
    for (const card of this.cards()) {
      if (card.card.blankedIf !== undefined && !card.penaltyCleared) {
        if (card.card.blankedIf(this)) {
          console.log(card.name + ' is blanked');
          card.blanked = true;
        }
      }
    }
  }

  // a card that is blanked by another card cannot blank other cards
  _cardBlanked(card) {
    for (const by of this.nonBlankedCards()) {
      if (by.card.blanks !== undefined && !by.penaltyCleared) {
        if (by.card.blanks(card, this)) {
          return true;
        }
      }
    }
    return false;
  }

  clear() {
    this.cardsInHand = {};
  }

  size() {
    return Object.keys(this.cardsInHand).length;
  }

  limit() {
    return this.contains('Necromancer') ? 8 : 7;
  }

  complete() {
    return this.size() === this.limit();
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
    if (this.card.penaltyScore !== undefined && !this.penaltyCleared) {
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
