$(document).ready(function() {
  assertScoreByName(['Blizzard', 'Great Flood', 'Elven Archers'], 35);
  assertScoreByName(['Smoke', 'Dwarvish Infantry', 'War Dirigible'], 50);
  assertScoreByName(['Candle', 'Smoke', 'Dwarvish Infantry', 'War Dirigible'], 44);
  assertScoreByCode('21,24,25,31,32,43,46|', 265);
  assertScoreByCode('6,7,8,9,10,11,26|', 326);
  assertScoreByCode('18,22,31,32,43,46,47|', 342);
  assertScoreByCode('3,17,32,43,46,47,49|49:47:Wizard', 380);
  assertScoreByCode('37,53|53:37', 0);
});

function assertScoreByName(cardNames, expectedScore) {
  hand.clear();
  for (const cardName of cardNames) {
    hand.addCard(deck.getCardByName(cardName));
  }
  assertScore(hand, expectedScore);
}

function assertScoreByCode(code, expectedScore) {
  hand.clear();
  hand.loadFromString(code);
  assertScore(hand, expectedScore);
}

function assertScore(hand, expectedScore) {
  var score = hand.score();
  if (score === expectedScore) {
    $('#tests').append('<li class="list-group-item list-group-item-success"><b>TEST SUCCESS</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST FAILED:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points (expected: ' + expectedScore + ')</li>');
  }
}
