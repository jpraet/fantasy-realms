$(document).ready(function() {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({
    suits: cardsBySuit
  });
  $('#cards').html(html);
  getHandFromQueryString();
});

var hand = {};

function addToHand(id) {
  hand[id] = getCard(id);
  history.replaceState(null, null, "index.html?hand=" + Object.keys(hand).join());
  updateHandView();
}

function updateHandView() {
  var template = Handlebars.compile($("#hand-template").html());
  var html = template({
    cards: hand
  });
  $('#cards-in-hand').html(html);
}

function getHandFromQueryString() {
  var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] === 'hand') {
      var cardIds = param[1].split(',');
      for (var j = 0; j < cardIds.length; j++) {
        var cardId = cardIds[j];
        hand[cardId] = getCard(cardId);
      }
      updateHandView();
    }
  }
}
