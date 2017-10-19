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
    return this.cards().map(function(card) {
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
            target.blanked = true;
          }
        }
      }
    }
    for (const card of this.cards()) {
      if (card.card.blankedIf !== undefined && !card.penaltyCleared) {
        if (card.card.blankedIf(this)) {
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
    var stringValue = Object.keys(this.cardsInHand).join();
    var actions = [];
    for (const card of this.cards()) {
      if (card.special !== undefined) {
        actions.push(card.id + ':' + card.special);
      }
    }
    return Object.keys(this.cardsInHand).join() + '|' + actions.join();
  }

  loadFromString(string) {
    this.clear();
    var parts = string.split('|');
    var cardIds = parts[0].split(',');
    var cardActions = parts[1].split(',');
    for (const cardId of cardIds) {
      this.addCard(deck.getCardById(cardId));
    }
    for (const cardAction of cardActions) {
      var actionParts = cardAction.split(':');
      var cardId = parseInt(actionParts[0]);
      var action = actionParts[1];
      this.performCardAction(cardId, action);
    }
  }

  performCardAction(id, action) {
    if (id === 51 || id === 52) { // Shapeshifter or Mirage
      var selectedCard = deck.getCardById(action);
      var target = this.cardsInHand[id];
      target.name = selectedCard.name;
      target.suit = selectedCard.suit;
      target.special = action;
    }
  }

}

var hand = new Hand();

class CardInHand {

  constructor(card) {
    this.card = card;
    this.id = this.card.id;
    this.name = this.card.name;
    this.suit = this.card.suit;
    this.strength = this.card.strength;
    this.reset();
  }

  reset() {
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
