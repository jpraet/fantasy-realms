$(document).ready(function() {
  assertScoreByName(['Blizzard', 'Great Flood', 'Elven Archers'], 35);
  assertScoreByName(['Smoke', 'Dwarvish Infantry', 'War Dirigible'], 50);
  assertScoreByName(['Candle', 'Smoke', 'Dwarvish Infantry', 'War Dirigible'], 44);
  assertScoreByCode('21,24,25,31,32,43,46|', 265);
  assertScoreByCode('6,7,8,9,10,11,26|', 326);
  assertScoreByCode('18,22,31,32,43,46,47|', 351, 'Max score without special cards?');
  assertScoreByCode('3,17,32,43,46,47,49|49:47:Wizard', 380, 'Rulebook example');
  assertScoreByCode('37,53|53:37', 0, '2 Basilisks should blank eachother');
  assertScoreByCode('24,53|53:24', 26, '2 Dwarvish Infantries should penalty eachother');
  assertScoreByCode('9,12,16,37|9:16', 95, 'Island can be used even when blanked');
  assertScoreByCode('10,53|53:10', 23, 'Elementals count their Doppelgänger')
});

function assertScoreByName(cardNames, expectedScore, message) {
  hand.clear();
  for (const cardName of cardNames) {
    hand.addCard(deck.getCardByName(cardName));
  }
  assertScore(hand, expectedScore, message);
}

function assertScoreByCode(code, expectedScore, message) {
  hand.clear();
  hand.loadFromString(code);
  assertScore(hand, expectedScore, message);
}

function assertScore(hand, expectedScore, message) {
  var score = hand.score();
  if (score === expectedScore) {
    $('#tests').append('<li class="list-group-item list-group-item-success"><b>TEST SUCCESS</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST FAILED:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points (expected: ' + expectedScore + ')' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  }
}
