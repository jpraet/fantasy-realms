$(document).ready(function() {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({
    suits: deck.getCardsBySuit()
  });
  $('#cards').html(html);
  getHandFromQueryString();
});

var click = new Audio('sound/click.mp3');
var swoosh = new Audio('sound/swoosh.mp3');
var clear = new Audio('sound/clear.mp3');

function clearHand() {
  clear.play();
  hand.clear();
  history.replaceState(null, null, "index.html");
  updateHandView();
}

function addToHand(id) {
  if (hand.addCard(deck.getCardById(id))) {
    click.play();
    history.replaceState(null, null, "index.html?hand=" + hand.toString());
    updateHandView();
  }
}

function removeFromHand(id) {
  swoosh.play();
  hand.deleteCardById(id);
  if (hand.size() > 0) {
    history.replaceState(null, null, "index.html?hand=" + hand.toString());
  } else {
    history.replaceState(null, null, "index.html");
  }
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
