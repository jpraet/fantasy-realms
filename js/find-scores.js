$(document).ready(function() {
  findMaxAndMinScore(7);
});

async function findMaxAndMinScore(c) {
  var set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  var combinations = Combinatorics.bigCombination(set, c);
  var combination;
  var i = 0;
  var percent = Math.floor(combinations.length / 100);
  var maxScore = 0;
  var maxCardNames = '';
  var maxToString = '';
  var minScore = 1000;
  var minCardNames = '';
  var minToString = '';
  console.log('checking ' + combinations.length + ' combinations');
  while (combination = combinations.next()) {
    i++;
    if (i % percent === 0) {
      console.log(Math.round(i / percent) + '% completed');
      console.log('maxScore: ' + maxScore + ' with ' + maxCardNames);
      console.log('minScore: ' + minScore + ' with ' + minCardNames);
      await sleep(50);
    }
    hand.clear();
    for (const card of combination) {
      hand.addCard(deck.getCardById(card));
    }
    var score = hand.score();
    if (score > maxScore) {
      maxScore = score;
      maxCardNames = hand.cardNames().join();
      maxToString = hand.toString();
    }
    if (score < minScore) {
      minScore = score;
      minCardNames = hand.cardNames().join();
      minToString = hand.toString();
    }
  }
  $('#scores').append('<li class="list-group-item list-group-item-success"><b>MAX SCORE:</b> &nbsp;<a href="index.html?hand=' +
    maxToString + '">' + maxCardNames + '</a>&nbsp; scored ' + maxScore + ' points</li>');
  $('#scores').append('<li class="list-group-item list-group-item-danger"><b>MIN SCORE:</b> &nbsp;<a href="index.html?hand=' +
    minToString + '">' + minCardNames + '</a>&nbsp; scored ' + minScore + ' points</li>');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
