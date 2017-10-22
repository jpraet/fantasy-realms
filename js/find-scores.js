$(document).ready(function() {
  findMaxAndMinScore(4);
});

async function findMaxAndMinScore(c) {
  var set = [];
  for (var i = 1; i <= 53; i++) {
    set.push(i);
  }
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
  console.log('checking +/-' + combinations.length + ' combinations');
  while (combination = combinations.next()) {
    i++;
    if (i % percent === 0) {
      console.log(Math.round(i / percent) + '% completed');
      console.log('maxScore: ' + maxScore + ' with ' + maxCardNames);
      console.log('minScore: ' + minScore + ' with ' + minCardNames);
      await sleep(50);
    }
    var baseCombinations = [combination];
    if (combination.includes(NECROMANCER)) {
      var necromancerTargetCards = deck.getCardsBySuit(deck.getCardById(NECROMANCER).relatedSuits);
      for (const suit of Object.keys(necromancerTargetCards)) {
        for (const extraCard of necromancerTargetCards[suit]) {
          if (!combination.includes(extraCard.id)) {
            var handWithExtraCard = combination.slice();
            handWithExtraCard.push(extraCard.id);
            baseCombinations.push(handWithExtraCard);
          }
        }
      }
    }
    for (const baseCombination of baseCombinations) {
      var base = baseCombination.join() + '|';
      hand.clear();
      hand.loadFromString(base);
      var variations = [base];
      var actionVariations = generateActionVariations(hand);
      for (const actionVariation of actionVariations) {
        variations.push(base + actionVariation.join());
      }
      for (const variation of variations) {
        hand.clear();
        hand.loadFromString(variation);
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
    }
  }
  $('#scores').append('<li class="list-group-item list-group-item-success"><b>MAX SCORE:</b> &nbsp;<a href="index.html?hand=' +
    maxToString + '">' + maxCardNames + '</a>&nbsp; scored ' + maxScore + ' points</li>');
  $('#scores').append('<li class="list-group-item list-group-item-danger"><b>MIN SCORE:</b> &nbsp;<a href="index.html?hand=' +
    minToString + '">' + minCardNames + '</a>&nbsp; scored ' + minScore + ' points</li>');
}

function generateActionVariations(hand) {
  var actionVariations = {};
  if (hand.containsId(DOPPELGANGER)) {
    actionVariations[DOPPELGANGER] = [];
    for (const card of hand.cards()) {
      if (card.id !== DOPPELGANGER) {
        actionVariations[DOPPELGANGER].push(DOPPELGANGER + ':' + card.id);
      }
    }
    actionVariations[DOPPELGANGER].push('');
  }
  if (hand.containsId(MIRAGE)) {
    var mirageActions = [];
    var candidates = deck.getCardsBySuit(deck.getCardById(MIRAGE).relatedSuits);
    for (const cards of Object.values(candidates)) {
      for (const card of cards) {
        // TODO: optimize for relatedSuits and relatedCards
        mirageActions.push(MIRAGE + ':' + card.id);
      }
    }
    if (mirageActions.length > 0) {
      mirageActions.push('');
      actionVariations[MIRAGE] = mirageActions;
    }
  }
  if (hand.containsId(SHAPESHIFTER)) {
    var shapeshifterActions = [];
    var candidates = deck.getCardsBySuit(deck.getCardById(SHAPESHIFTER).relatedSuits);
    for (const cards of Object.values(candidates)) {
      for (const card of cards) {
        // TODO: optimize for relatedSuits and relatedCards
        shapeshifterActions.push(SHAPESHIFTER + ':' + card.id);
      }
    }
    if (shapeshifterActions.length > 0) {
      shapeshifterActions.push('');
      actionVariations[SHAPESHIFTER] = shapeshifterActions;
    }
  }
  if (hand.containsId(BOOK_OF_CHANGES)) {
    var bookOfChangesActions = [];
    var suitsOfInterest = new Set();
    for (const card of hand.cards()) {
      for (const suit of card.relatedSuits) {
        suitsOfInterest.add(suit);
      }
    }
    for (const card of hand.cards()) {
      if (card.id !== BOOK_OF_CHANGES) {
        for (const suit of suitsOfInterest) {
          bookOfChangesActions.push(BOOK_OF_CHANGES + ':' + card.id + ':' + suit);
        }
      }
    }
    if (bookOfChangesActions.length > 0) {
      bookOfChangesActions.push('');
      actionVariations[BOOK_OF_CHANGES] = bookOfChangesActions;
    }
  }
  if (hand.containsId(ISLAND)) {
    var islandActions = [];
    for (const card of hand.cards()) {
      if (card.suit === 'Flood' || card.suit === 'Flame' || hand.containsId(BOOK_OF_CHANGES)) {
        islandActions.push(ISLAND + ':' + card.id);
      }
    }
    if (islandActions.length > 0) {
      islandActions.push('');
      actionVariations[ISLAND] = islandActions;
    }
  }
  if (Object.keys(actionVariations).length === 0) {
    return [];
  } else {
    return Combinatorics.cartesianProduct(...Object.values(actionVariations)).toArray();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
