$(document).ready(function() {
  hand.addCard(deck.getCardByName('Mountain'));
  hand.addCard(deck.getCardByName('Bell Tower'));
  console.log(hand.contains('Mountain'));
  console.log(hand.containsSuit('Land'));
  console.log(hand.countSuit('Land'));
  console.log(hand.countSuitExcluding('Land', 1));
});
