$(document).ready(function() {
  showCards();
  getHandFromQueryString();
});

var click = new Audio('sound/click.mp3');
var swoosh = new Audio('sound/swoosh.mp3');
var clear = new Audio('sound/clear.mp3');
var magic = new Audio('sound/magic.mp3');
var actionId = NONE;
var bookOfChangesSelectedCard = NONE;
var bookOfChangesSelectedSuit = undefined;

function clearHand() {
  clear.play();
  hand.clear();
  showCards();
  updateHandView();
  actionId = NONE;
  bookOfChangesSelectedCard = NONE;
  bookOfChangesSelectedSuit = undefined;
}

function addToHand(id) {
  if (actionId === SHAPESHIFTER || actionId === MIRAGE) {
    click.play();
    magic.play();
    var duplicator = hand.getCardById(actionId);
    duplicator.actionData = [id];
    showCards();
    updateHandView();
    actionId = NONE;
  } else if (hand.addCard(deck.getCardById(id))) {
    click.play();
    updateHandView();
    actionId = NONE;
  }
}

function selectFromHand(id) {
  if (actionId === BOOK_OF_CHANGES) {
    if (id !== BOOK_OF_CHANGES) {
      click.play();
      bookOfChangesSelectedCard = id;
      performBookOfChanges();
    }
  } else if (actionId === DOPPELGANGER) {
    if (id !== DOPPELGANGER) {
      actionId = NONE;
      click.play();
      magic.play();
      var doppelGanger = hand.getCardById(DOPPELGANGER);
      doppelGanger.actionData = [id];
      updateHandView();
    }
  } else if (actionId === ISLAND) {
    var selectedCard = hand.getCardById(id);
    var island = hand.getCardById(ISLAND);
    if (selectedCard.suit === 'Flood' || selectedCard.suit === 'Flame') {
      actionId = NONE;
      click.play();
      magic.play();
      island.actionData = [id];
      updateHandView();
    }
  } else {
    removeFromHand(id);
  }
}

function removeFromHand(id) {
  swoosh.play();
  hand.deleteCardById(id);
  updateHandView();
}

function updateHandView() {
  var template = Handlebars.compile($("#hand-template").html());
  var score = hand.score();
  var html = template(hand);
  $('#hand').html(html);
  if (score >= 0) {
    $('#points').text(('000' + score).slice(-3));
  } else {
    $('#points').text('-' + ('000' + Math.abs(score)).slice(-3));
  }
  $('#cardCount').text(hand.size());
  $('#cardLimit').text(hand.limit());
  if (hand.size() > 0) {
    history.replaceState(null, null, "index.html?hand=" + hand.toString());
  } else {
    history.replaceState(null, null, "index.html");
  }
}

function getHandFromQueryString() {
  var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] === 'hand') {
      hand.loadFromString(param[1]);
      updateHandView();
    }
  }
}

function useCard(id) {
  click.play();
  actionId = id;
  if (id === BOOK_OF_CHANGES) {
    bookOfChangesSelectedCard = NONE;
    bookOfChangesSelectedSuit = undefined;
    hand.undoCardAction(id);
    var template = Handlebars.compile($("#suit-selection-template").html());
    var html = template({
      suits: allSuits()
    });
    $('#cards').html(html);
  } else if (id === SHAPESHIFTER || id == MIRAGE) {
    hand.undoCardAction(id);
    var duplicator = hand.getCardById(id);
    showCards(duplicator.card.relatedSuits);
  } else if (id === DOPPELGANGER) {
    hand.undoCardAction(id);
  } else if (id === ISLAND) {
    hand.undoCardAction(id);
  }
  updateHandView();
  $('#card-action-text-' + id).text(deck.getCardById(id).action);
}

function performBookOfChanges() {
  if (bookOfChangesSelectedCard !== NONE && bookOfChangesSelectedSuit !== undefined) {
    magic.play();
    var bookOfChanges = hand.getCardById(BOOK_OF_CHANGES);
    bookOfChanges.actionData = [bookOfChangesSelectedCard, bookOfChangesSelectedSuit];
    showCards();
    updateHandView();
    actionId = NONE;
  }
}

function selectSuit(suit) {
  click.play();
  bookOfChangesSelectedSuit = suit;
  performBookOfChanges();
}

function showCards(suits) {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({
    suits: deck.getCardsBySuit(suits)
  });
  $('#cards').html(html);
}
