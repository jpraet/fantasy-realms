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

  deleteCardById(id) {
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
    this._performCardActions();
    this._clearPenalties();
    this._applyBlanking();
    for (const card of this.nonBlankedCards()) {
      score += card.score(this);
    }
    return score;
  }

  _resetHand() {
    for (const card of this.cards()) {
      this.cardsInHand[card.id] = new CardInHand(card.card, card.actionData);
    }
  }

  _performCardActions() {
    for (const cardAction of ACTION_ORDER) {
      var actionCard = this.getCardById(cardAction);
      if (actionCard !== undefined) {
        actionCard.performCardAction(this);
      }
    }
  }

  _clearPenalties() {
    for (const card of this.cards()) {
      if (card.clearsPenalty !== undefined) {
        for (const target of this.cards()) {
          if (card.clearsPenalty(target)) {
            target.penaltyCleared = true;
          }
        }
      }
    }
  }

  _applyBlanking() {
    for (const card of this.cards()) {
      if (card.blanks !== undefined && !card.penaltyCleared && !this._cardBlanked(card)) {
        for (const target of this.cards()) {
          if (card.blanks(target, this)) {
            target.blanked = true;
          }
        }
      }
    }
    for (const card of this.cards()) {
      if (card.blankedIf !== undefined && !card.penaltyCleared) {
        if (card.blankedIf(this)) {
          card.blanked = true;
        }
      }
    }
  }

  // a card that is blanked by another card cannot blank other cards,
  // except when they blank eachother
  _cardBlanked(card) {
    for (const by of this.nonBlankedCards()) {
      if (by.blanks !== undefined && !by.penaltyCleared) {
        if (by.blanks(card, this) && !card.blanks(by, this)) {
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
    return Object.keys(this.cardsInHand).join() + '+' + actions.join();
  }

  loadFromString(string) {
    var parts = string.split('+');
    var cardIds = parts[0].split(',');
    var cardActions = parts[1].split(',').map(action => action.split(':'));
    this.loadFromArrays(cardIds, cardActions);
  }

  loadFromArrays(cardIds, cardActions) {
    this.clear();
    for (const cardId of cardIds) {
      this.addCard(deck.getCardById(cardId));
    }
    for (const cardAction of cardActions) {
      if (cardAction.length > 1) {
        var cardId = parseInt(cardAction[0]);
        var action = cardAction.slice(1);
        var actionCard = this.getCardById(cardId);
        this.cardsInHand[cardId] = new CardInHand(actionCard.card, action);
      }
    }
  }

  undoCardAction(id) {
    var actionCard = this.getCardById(id);
    this.cardsInHand[id] = new CardInHand(actionCard.card, undefined);
  }

}

var hand = new Hand();

class CardInHand {

  constructor(card, actionData) {
    this.card = card;
    this.actionData = actionData;
    // TODO: is there a better way to copy these properties
    this.id = card.id;
    this.name = card.name;
    this.suit = card.suit;
    this.strength = card.strength;
    this.bonus = card.bonus;
    this.penalty = card.penalty;
    this.bonusScore = card.bonusScore;
    this.penaltyScore = card.penaltyScore;
    this.blanks = card.blanks;
    this.blankedIf = card.blankedIf;
    this.clearsPenalty = card.clearsPenalty;
    this.action = card.action;
    this.relatedSuits = card.relatedSuits;
    this.relatedCards = card.relatedCards;

    this.blanked = false;
    this.penaltyCleared = false;
    this.penaltyPoints = 0;
    this.bonusPoints = 0;
    this.magic = false;
  }

  performCardAction(hand) {
    if (this.actionData !== undefined) {
      if (this.id === BOOK_OF_CHANGES) {
        var target = hand.getCardById(this.actionData[0]);
        if (target === undefined) {
          this.actionData = undefined;
        } else {
          var suit = this.actionData[1];
          target.suit = suit;
          target.magic = true;
        }
      } else if (this.id === SHAPESHIFTER || this.id === MIRAGE) {
        var selectedCard = deck.getCardById(this.actionData[0]);
        this.name = selectedCard.name;
        this.suit = selectedCard.suit;
        this.magic = true;
      } else if (this.id === DOPPELGANGER) {
        var selectedCard = hand.getCardById(this.actionData[0]);
        if (selectedCard === undefined) {
          this.actionData = undefined;
        } else {
          this.name = selectedCard.name;
          this.suit = selectedCard.suit;
          this.strength = selectedCard.strength;
          this.penalty = selectedCard.penalty;
          this.penaltyScore = selectedCard.penaltyScore;
          this.blanks = selectedCard.blanks;
          this.blankedIf = selectedCard.blankedIf
          this.magic = true;
        }
      } else if (this.id === ISLAND) {
        var selectedCard = hand.getCardById(this.actionData[0]);
        if (selectedCard === undefined || !(selectedCard.suit === 'Flood' || selectedCard.suit === 'Flame')) {
          this.actionData = undefined;
        } else {
          this.clearsPenalty = function(card) {
            return card.id === selectedCard.id;
          }
          selectedCard.magic = true;
        }
      }
    }
  }

  score(hand) {
    if (this.blanked) {
      return 0;
    }
    if (this.bonusScore !== undefined) {
      this.bonusPoints = this.bonusScore(hand);
    } else {
      this.bonusPoints = 0;
    }
    if (this.penaltyScore !== undefined && !this.penaltyCleared) {
      this.penaltyPoints = this.penaltyScore(hand);
    } else {
      this.penaltyPoints = 0;
    }
    return this.strength + this.bonusPoints + this.penaltyPoints;
  }

  points() {
    return this.blanked ? 0 : (this.strength + this.bonusPoints + this.penaltyPoints);
  }

}
