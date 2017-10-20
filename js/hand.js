class Hand {

  constructor() {
    this.cardsInHand = {};
  }

  addCard(card) {
    if (this._canAdd(card)) {
      this.cardsInHand[card.id] = new CardInHand(card);
      return true;
    }
    return false;
  }

  deleteCardById(id) {
    if (id === BOOK_OF_CHANGES) {
      var bookOfChanges = this.getCardById(id);
      if (bookOfChanges.actionData !== undefined) {
        var target = hand.getCardById(bookOfChanges.actionData[0]);
        if (target !== undefined) {
          target.suit = previousTarget.card.previousSuit;
        }
      }
    }
    delete this.cardsInHand[id];
  }

  getCardById(id) {
    return this.cardsInHand[id];
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

  _canAdd(newCard) {
    if (this.cardsInHand[newCard.id] !== undefined) {
      return false;
    } else if (this.size() < 7) {
      return true;
    } else if (this.size() > 7) {
      return false;
    } else if (this.containsId(NECROMANCER) || newCard.id === NECROMANCER) {
      var targetFound = false;
      for (const card of this.cards()) {
        if (card.card.id !== NECROMANCER && deck.getCardById(NECROMANCER).relatedSuits.includes(card.card.suit)) {
          targetFound = true;
        }
      }
      return targetFound || this.containsId(NECROMANCER) && deck.getCardById(NECROMANCER).relatedSuits.includes(newCard.suit);
    } else {
      return false;
    }
  }

  _isValidNecromancerTarget(card) {
    return;
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
    return this.containsId(NECROMANCER) ? 8 : 7;
  }

  toString() {
    var stringValue = Object.keys(this.cardsInHand).join();
    var actions = [];
    for (const card of this.cards()) {
      if (card.actionData !== undefined) {
        actions.push(card.id + ':' + card.actionData.join(':'));
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
      if (cardAction.length > 0) {
        var actionParts = cardAction.split(':');
        var cardId = parseInt(actionParts[0]);
        var action = actionParts.slice(1);
        this.performCardAction(cardId, action);
      }
    }
  }

  performCardAction(id, action) {
    var actionCard = this.getCardById(id);
    actionCard.actionData = action;
    if (id === BOOK_OF_CHANGES) {
      var target = this.cardsInHand[action[0]];
      var suit = action[1];
      target.previousSuit = target.suit;
      target.suit = suit;
      target.magic = true;
    } else if (id === SHAPESHIFTER || id === MIRAGE) {
      var selectedCard = deck.getCardById(action[0]);
      actionCard.name = selectedCard.name;
      actionCard.suit = selectedCard.suit;
      actionCard.magic = true;
    } else if (id === DOPPELGANGER) {
      var selectedCard = deck.getCardById(action[0]);
      actionCard.name = selectedCard.name;
      actionCard.suit = selectedCard.suit;
      actionCard.strength = selectedCard.strength;
      // TODO: also duplicate the Penalty
      actionCard.magic = true;
    }
  }

  undoCardAction(id) {
    var actionCard = this.getCardById(id);
    if (id === BOOK_OF_CHANGES) {
      if (actionCard.actionData !== undefined) {
        var target = this.getCardById(actionCard.actionData[0]);
        if (target !== undefined) {
          target.suit = target.previousSuit;
          target.magic = false; // TODO: what if it's Shapeshifter, Mirage, Doppelgänger, Island?
        }
      }
      actionCard.resetAction();
    } else if (id === SHAPESHIFTER || id === MIRAGE || id === DOPPELGANGER) {
      actionCard.resetAction();
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

  resetAction() {
    this.reset();
    this.id = this.card.id;
    this.name = this.card.name;
    this.suit = this.card.suit;
    this.strength = this.card.strength;
    this.actionData = undefined;
    this.magic = false;
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
