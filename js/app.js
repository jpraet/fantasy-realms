$(document).ready(function() {
  showCards();
  getHandFromQueryString();
});

var click = new Audio('sound/click.mp3');
var swoosh = new Audio('sound/swoosh.mp3');
var clear = new Audio('sound/clear.mp3');
var actionId = -1;

function clearHand() {
  clear.play();
  hand.clear();
  showCards();
  updateHandView();
  actionId = -1;
}

function addToHand(id) {
  if (actionId !== -1) {
    click.play();
    hand.performCardAction(actionId, id);
    showCards();
    updateHandView();
    actionId = -1;
  } else if (hand.addCard(deck.getCardById(id))) {
    click.play();
    updateHandView();
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
  if (id === 51) {
    // Shapeshifter
    showCards(deck.getCardById(id).relatedSuits);
  } else if (id === 52) {
    // Mirage
    showCards(deck.getCardById(id).relatedSuits);
  }
}

function showCards(suits) {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({
    suits: deck.getCardsBySuit(suits)
  });
  $('#cards').html(html);
}
