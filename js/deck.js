var deck = {
  cards: [{
      id: 1,
      suit: 'Land',
      name: 'Mountain',
      strength: 9,
      bonus: '+50 with both <span class="weather">Smoke</span> and <span class="flame">Wildfire</span>. <br />CLEARS the Penalty on all <span class="flood">Floods</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Smoke') && hand.contains('Wildfire') ? 50 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Flood';
      },
      relatedSuits: ['Flood'],
      relatedCards: ['Smoke', 'Wildfire']
    },
    {
      id: 2,
      suit: 'Land',
      name: 'Cavern',
      strength: 6,
      bonus: '+25 with <span class="army">Dwarvish Infantry</span> or <span class="beast">Dragon</span>. <br />CLEARS the Penalty on all <span class="weather">Weather</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Dwarvish Infantry') || hand.contains('Dragon') ? 25 : 0;
      },
      clearsPenalty: function(card) {
        return card.suit === 'Weather';
      },
      relatedSuits: ['Weather'],
      relatedCards: ['Dwarvish Infantry', 'Dragon']
    },
    {
      id: 3,
      suit: 'Land',
      name: 'Bell Tower',
      strength: 8,
      bonus: '+15 with any one <span class="wizard">Wizard</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Wizard') ? 15 : 0;
      },
      relatedSuits: ['Wizard'],
      relatedCards: []
    },
    {
      id: 4,
      suit: 'Land',
      name: 'Forest',
      strength: 7,
      bonus: '+12 for each <span class="beast">Beast</span> and <span class="army">Elven Archers</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 12 * hand.countSuit('Beast') + (hand.contains('Elven Archers') ? 12 : 0);
      },
      relatedSuits: ['Beast'],
      relatedCards: ['Elven Archers']
    },
    {
      id: 5,
      suit: 'Land',
      name: 'Earth Elemental',
      strength: 4,
      bonus: '+15 for each other <span class="land">Land</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Land', this.id);
      },
      relatedSuits: ['Land'],
      relatedCards: []
    },
    {
      id: 6,
      suit: 'Flood',
      name: 'Fountain of Life',
      strength: 1,
      bonus: 'Add the base strength of any one <span class="weapon">Weapon</span>, <span class="flood">Flood</span>, <span class="flame">Flame</span>, <span class="land">Land</span> or <span class="weather">Weather</span> in your hand.',
      penalty: null,
      bonusScore: function(hand) {
        var max = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Weapon' || card.suit === 'Flood' || card.suit === 'Flame' || card.suit === 'Land' || card.suit === 'Weather') {
            if (card.strength > max) {
              max = card.strength;
            }
          }
        }
        return max;
      },
      relatedSuits: ['Weapon', 'Flood', 'Flame', 'Land', 'Weather'],
      relatedCards: []
    },
    {
      id: 7,
      suit: 'Flood',
      name: 'Swamp',
      strength: 18,
      bonus: null,
      penalty: '-3 for each <span class="army">Army</span> and <span class="flame">Flame</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Flame');
        if (!(hand.containsId(25) || hand.containsId(41))) { // these clear the word 'Army' from the penalty
          penaltyCards += hand.countSuit('Army');
        }
        return -3 * penaltyCards;
      },
      relatedSuits: ['Army', 'Flame'],
      relatedCards: []
    },
    {
      id: 8,
      suit: 'Flood',
      name: 'Great Flood',
      strength: 32,
      bonus: null,
      penalty: 'BLANKS all <span class="army">Armies</span>, all <span class="land">Lands</span> except <span class="land">Mountain</span>, and all <span class="flame">Flames</span> except <span class="flame">Lightning</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Army' && !(hand.containsId(25) || hand.containsId(41))) || // these clear the word 'Army' from the penalty
          (card.suit === 'Land' && card.name !== 'Mountain') ||
          (card.suit === 'Flame' && card.name !== 'Lightning');
      },
      relatedSuits: ['Army', 'Land', 'Flame'],
      relatedCards: ['Mountain', 'Lightning']
    },
    {
      id: 9,
      suit: 'Flood',
      name: 'Island',
      strength: 14,
      bonus: 'CLEARS the Penalty on any one <span class="flood">Flood</span> or <span class="flame">Flame</span>.',
      penalty: null,
      action: 'Pick a Flood or Flame from your hand to clear.',
      relatedSuits: ['Flood', 'Flame'],
      relatedCards: []
    },
    {
      id: 10,
      suit: 'Flood',
      name: 'Water Elemental',
      strength: 4,
      bonus: '+15 for each other <span class="flood">Flood</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Flood', this.id);
      },
      relatedSuits: ['Flood'],
      relatedCards: []
    },
    {
      id: 11,
      suit: 'Weather',
      name: 'Rainstorm',
      strength: 8,
      bonus: '+10 for each <span class="flood">Flood</span>.',
      penalty: 'BLANKS all <span class="flame">Flames</span> except <span class="flame">Lightning</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Flood');
      },
      blanks: function(card, hand) {
        return card.suit === 'Flame' && card.name !== 'Lightning';
      },
      relatedSuits: ['Flood', 'Flame'],
      relatedCards: ['Lightning']
    },
    {
      id: 12,
      suit: 'Weather',
      name: 'Blizzard',
      strength: 30,
      bonus: null,
      penalty: 'BLANKS all <span class="flood">Floods</span>. <br />-5 for each <span class="army">Army</span>, <span class="leader">Leader</span>, <span class="beast">Beast</span>, and <span class="flame">Flame</span>.',
      penaltyScore: function(hand) {
        var penaltyCards = hand.countSuit('Leader') + hand.countSuit('Beast') + hand.countSuit('Flame');
        if (!hand.containsId(25)) { // clears the word 'Army' from the penalty
          penaltyCards += hand.countSuit('Army');
        }
        return -5 * penaltyCards;
      },
      blanks: function(card, hand) {
        return card.suit === 'Flood';
      },
      relatedSuits: ['Leader', 'Beast', 'Flame', 'Army', 'Flood'],
      relatedCards: []
    },
    {
      id: 13,
      suit: 'Weather',
      name: 'Smoke',
      strength: 27,
      bonus: null,
      penalty: 'This card is BLANKED unless with at least one <span class="flame">Flame</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Flame');
      },
      relatedSuits: ['Flame'],
      relatedCards: []
    },
    {
      id: 14,
      suit: 'Weather',
      name: 'Whirlwind',
      strength: 13,
      bonus: '+40 with <span class="weather">Rainstorm</span> and either <span class="weather">Blizzard</span> or <span class="flood">Great Flood</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Rainstorm') && (hand.contains('Blizzard') || hand.contains('Great Flood')) ? 40 : 0;
      },
      relatedSuits: ['Rainstorm'],
      relatedCards: ['Blizzard', 'Great Flood']
    },
    {
      id: 15,
      suit: 'Weather',
      name: 'Air Elemental',
      strength: 4,
      bonus: '+15 for each other <span class="weather">Weather</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Weather', this.id);
      },
      relatedSuits: ['Weather'],
      relatedCards: []
    },
    {
      id: 16,
      suit: 'Flame',
      name: 'Wildfire',
      strength: 40,
      bonus: null,
      penalty: 'BLANKS all cards except <span class="flame">Flames</span>, <span class="wizard">Wizards</span>, <span class="weather">Weather</span>, <span class="weapon">Weapons</span>, <span class="artifact">Artifacts</span>, <span class="land">Mountain</span>, <span class="flood">Great Flood</span>, <span class="flood">Island</span>, <span class="beast">Unicorn</span> and <span class="beast">Dragon</span>.',
      blanks: function(card, hand) {
        return !(card.suit === 'Flame' || card.suit === 'Wizard' || card.suit === 'Weather' ||
          card.suit === 'Weapon' || card.suit === 'Artifact' || card.suit === 'Wild' || card.name === 'Mountain' ||
          card.name === 'Great Flood' || card.name === 'Island' || card.name === 'Unicorn' || card.name === 'Dragon');
      },
      relatedSuits: allSuits(),
      relatedCards: ['Mountain', 'Great Flood', 'Island', 'Unicorn', 'Dragon']
    },
    {
      id: 17,
      suit: 'Flame',
      name: 'Candle',
      strength: 2,
      bonus: '+100 with <span class="artifact">Book of Changes</span>, <span class="land">Bell Tower</span>, and any one <span class="wizard">Wizard</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Book of Changes') && hand.contains('Bell Tower') && hand.containsSuit('Wizard') ? 100 : 0;
      },
      relatedSuits: ['Wizard'],
      relatedCards: ['Book of Changes', 'Bell Tower']
    },
    {
      id: 18,
      suit: 'Flame',
      name: 'Forge',
      strength: 9,
      bonus: '+9 for each <span class="weapon">Weapon</span> and <span class="artifact">Artifact</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * (hand.countSuit('Weapon') + hand.countSuit('Artifact'));
      },
      relatedSuits: ['Weapon', 'Artifact'],
      relatedCards: []
    },
    {
      id: 19,
      suit: 'Flame',
      name: 'Lightning',
      strength: 11,
      bonus: '+30 with <span class="weather">Rainstorm</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Rainstorm') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Rainstorm']
    },
    {
      id: 20,
      suit: 'Flame',
      name: 'Fire Elemental',
      strength: 4,
      bonus: '+15 for each other <span class="flame">Flame</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 15 * hand.countSuitExcluding('Flame', this.id);
      },
      relatedSuits: ['Flame'],
      relatedCards: []
    },
    {
      id: 21,
      suit: 'Army',
      name: 'Knights',
      strength: 20,
      bonus: null,
      penalty: '-8 unless with at least one <span class="leader">Leader</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Leader') ? 0 : -8;
      },
      relatedSuits: ['Leader'],
      relatedCards: []
    },
    {
      id: 22,
      suit: 'Army',
      name: 'Elven Archers',
      strength: 10,
      bonus: '+5 if no <span class="weather">Weather</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Weather') ? 0 : 5;
      },
      relatedSuits: ['Weather'],
      relatedCards: []
    },
    {
      id: 23,
      suit: 'Army',
      name: 'Light Cavalry',
      strength: 17,
      bonus: null,
      penalty: '-2 for each <span class="land">Land</span>.',
      penaltyScore: function(hand) {
        return -2 * hand.countSuit('Land');
      },
      relatedSuits: ['Land'],
      relatedCards: []

    },
    {
      id: 24,
      suit: 'Army',
      name: 'Dwarvish Infantry',
      strength: 15,
      bonus: null,
      penalty: '-2 for each other <span class="army">Army</span>.',
      penaltyScore: function(hand) {
        if (!hand.containsId(25)) { // clears the word 'Army' from the penalty
          return -2 * hand.countSuitExcluding('Army', this.id);
        }
        return 0;
      },
      relatedSuits: ['Army'],
      relatedCards: []
    },
    {
      id: 25,
      suit: 'Army',
      name: 'Rangers',
      strength: 5,
      bonus: '+10 for each <span class="land">Land</span>. <br />CLEARS the word <span class="army">Army</span> from all Penalties.',
      penalty: null,
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Land');
      },
      relatedSuits: ['Land', 'Army'],
      relatedCards: []
    },
    {
      id: 26,
      suit: 'Wizard',
      name: 'Collector',
      strength: 7,
      bonus: '+10 if three different cards in same suit, +40 if four different cards in same suit, +100 if five different cards in same suit.',
      penalty: null,
      bonusScore: function(hand) {
        var bySuit = {};
        for (const card of hand.nonBlankedCards()) {
          var suit = card.suit;
          if (bySuit[suit] === undefined) {
            bySuit[suit] = {};
          }
          bySuit[suit][card.name] = card;
        }
        var maxPerSuit = 0;
        for (const suit of Object.values(bySuit)) {
          var count = Object.keys(suit).length;
          if (count > maxPerSuit) {
            maxPerSuit = count;
          }
        }
        if (maxPerSuit === 3) {
          return 10;
        } else if (maxPerSuit === 4) {
          return 40;
        } else if (maxPerSuit >= 5) {
          return 100;
        } else {
          return 0;
        }
      },
      relatedSuits: allSuits(),
      relatedCards: []
    },
    {
      id: 27,
      suit: 'Wizard',
      name: 'Beastmaster',
      strength: 9,
      bonus: '+9 for each <span class="beast">Beast</span>. <br />CLEARS the Penalty on all <span class="beast">Beasts</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 9 * hand.countSuit('Beast');
      },
      clearsPenalty: function(card) {
        return card.suit === 'Beast';
      },
      relatedSuits: ['Beast'],
      relatedCards: []
    },
    {
      id: 28,
      suit: 'Wizard',
      name: 'Necromancer',
      strength: 3,
      bonus: 'At the end of the game, you may take one <span class="army">Army</span>, <span class="leader">Leader</span>, <span class="wizard">Wizard</span>, or <span class="beast">Beast</span> from the discard pile and add it to your hand as an eighth card.',
      penalty: null,
      relatedSuits: ['Army', 'Leader', 'Wizard', 'Beast'],
      relatedCards: []
    },
    {
      id: 29,
      suit: 'Wizard',
      name: 'Warlock Lord',
      strength: 25,
      bonus: null,
      penalty: '-10 for each <span class="leader">Leader</span> and other <span class="wizard">Wizard</span>.',
      penaltyScore: function(hand) {
        return -10 * (hand.countSuit('Leader') + hand.countSuitExcluding('Wizard', this.id));
      },
      relatedSuits: ['Leader', 'Wizard'],
      relatedCards: []
    },
    {
      id: 30,
      suit: 'Wizard',
      name: 'Enchantress',
      strength: 5,
      bonus: '+5 for each <span class="land">Land</span>, <span class="weather">Weather</span>, <span class="flood">Flood</span>, and <span class="flame">Flame</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 5 * (hand.countSuit('Land') + hand.countSuit('Weather') + hand.countSuit('Flood') + hand.countSuit('Flame'));
      },
      relatedSuits: ['Land', 'Weather', 'Flood', 'Flame'],
      relatedCards: []
    },
    {
      id: 31,
      suit: 'Leader',
      name: 'King',
      strength: 8,
      bonus: '+5 for each <span class="army">Army</span>. <br />OR +20 for each <span class="army">Army</span> if with <span class="leader">Queen</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('Queen') ? 20 : 5) * hand.countSuit('Army');
      },
      relatedSuits: ['Army'],
      relatedCards: ['Queen']
    },
    {
      id: 32,
      suit: 'Leader',
      name: 'Queen',
      strength: 6,
      bonus: '+5 for each <span class="army">Army</span>. <br />OR +20 for each <span class="army">Army</span> if with <span class="leader">King</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return (hand.contains('King') ? 20 : 5) * hand.countSuit('Army');
      },
      relatedSuits: ['Army'],
      relatedCards: ['King']
    },
    {
      id: 33,
      suit: 'Leader',
      name: 'Princess',
      strength: 2,
      bonus: '+8 for each <span class="army">Army</span>, <span class="wizard">Wizard</span>, and other <span class="leader">Leader</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return 8 * (hand.countSuit('Army') + hand.countSuit('Wizard') + hand.countSuitExcluding('Leader', this.id));
      },
      relatedSuits: ['Army', 'Wizard', 'Leader'],
      relatedCards: []
    },
    {
      id: 34,
      suit: 'Leader',
      name: 'Warlord',
      strength: 4,
      bonus: 'The sum of the base strength of all <span class="army">Armies</span>.',
      penalty: null,
      bonusScore: function(hand) {
        var total = 0;
        for (const card of hand.nonBlankedCards()) {
          if (card.suit === 'Army') {
            total += card.strength;
          }
        }
        return total;
      },
      relatedSuits: ['Army'],
      relatedCards: []
    },
    {
      id: 35,
      suit: 'Leader',
      name: 'Empress',
      strength: 15,
      bonus: '+10 for each <span class="army">Army</span>.',
      penalty: '-5 for each other <span class="leader">Leader</span>.',
      bonusScore: function(hand) {
        return 10 * hand.countSuit('Army');
      },
      penaltyScore: function(hand) {
        return 5 * hand.countSuitExcluding('Leader', this.id);
      },
      relatedSuits: ['Army', 'Leader'],
      relatedCards: []
    },
    {
      id: 36,
      suit: 'Beast',
      name: 'Unicorn',
      strength: 9,
      bonus: '+30 with <span class="leader">Princess</span>. <br />OR +15 with <span class="leader">Empress</span>, <span class="leader">Queen</span>, or <span class="leader">Enchantress</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Princess') ? 30 : (hand.contains('Empress') || hand.contains('Queen') || hand.contains('Enchantress')) ? 15 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Princess', 'Empress', 'Queen', 'Enchantress']
    },
    {
      id: 37,
      suit: 'Beast',
      name: 'Basilisk',
      strength: 35,
      bonus: null,
      penalty: 'BLANKS all <span class="army">Armies</span>, <span class="leader">Leaders</span>, and other <span class="beast">Beasts</span>.',
      blanks: function(card, hand) {
        return (card.suit === 'Army' && !hand.containsId(25)) || // clears the word 'Army' from the penalty
          card.suit === 'Leader' ||
          (card.suit === 'Beast' && card.id !== this.id);
      },
      relatedSuits: ['Army', 'Leader', 'Beast'],
      relatedCards: []
    },
    {
      id: 38,
      suit: 'Beast',
      name: 'Warhorse',
      strength: 6,
      bonus: '+14 with any <span class="leader">Leader</span> or <span class="wizard">Wizard</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader') || hand.containsSuit('Wizard') ? 14 : 0;
      },
      relatedSuits: ['Leader', 'Wizard'],
      relatedCards: []
    },
    {
      id: 39,
      suit: 'Beast',
      name: 'Dragon',
      strength: 30,
      bonus: null,
      penalty: '-40 unless with at least one <span class="wizard">Wizard</span>.',
      penaltyScore: function(hand) {
        return hand.containsSuit('Wizard') ? 0 : -40;
      },
      relatedSuits: ['Wizard'],
      relatedCards: []
    },
    {
      id: 40,
      suit: 'Beast',
      name: 'Hydra',
      strength: 12,
      bonus: '+28 with <span class="flood">Swamp</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Swamp') ? 28 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Swamp']
    },
    {
      id: 41,
      suit: 'Weapon',
      name: 'Warship',
      strength: 23,
      bonus: 'CLEARS the word <span class="army">Army</span> from all Penalties of all <span class="flood">Floods</span>.',
      penalty: 'BLANKED unless with at least one <span class="flood">Flood</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Flood');
      },
      relatedSuits: ['Army', 'Flood'],
      relatedCards: []
    },
    {
      id: 42,
      suit: 'Weapon',
      name: 'Magic Wand',
      strength: 1,
      bonus: '+25 with any one <span class="wizard">Wizard</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Wizard') ? 25 : 0;
      },
      relatedSuits: ['Wizard'],
      relatedCards: []
    },
    {
      id: 43,
      suit: 'Weapon',
      name: 'Sword of Keth',
      strength: 7,
      bonus: '+10 with any one <span class="leader">Leader</span>. <br />OR +40 with both <span class="leader">Leader</span> and <span class="artifact">Shield of Keth</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader') ? (hand.contains('Shield of Keth') ? 40 : 10) : 0;
      },
      relatedSuits: ['Leader'],
      relatedCards: ['Shield of Keth']
    },
    {
      id: 44,
      suit: 'Weapon',
      name: 'Elven Longbow',
      strength: 3,
      bonus: '+30 with <span class="army">Elven Archers</span>, <span class="leader">Warlord</span> or <span class="wizard">Beastmaster</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.contains('Elven Archers') || hand.contains('Warlord') || hand.contains('Beastmaster') ? 30 : 0;
      },
      relatedSuits: [],
      relatedCards: ['Elven Archers', 'Warlord', 'Beastmaster']
    },
    {
      id: 45,
      suit: 'Weapon',
      name: 'War Dirigible',
      strength: 35,
      bonus: null,
      penalty: 'BLANKED unless with at least one <span class="army">Army</span>. <br />BLANKED with any <span class="weather">Weather</span>.',
      blankedIf: function(hand) {
        return !hand.containsSuit('Army') || hand.containsSuit('Weather');
      },
      relatedSuits: ['Army', 'Weather'],
      relatedCards: []
    },
    {
      id: 46,
      suit: 'Artifact',
      name: 'Shield of Keth',
      strength: 4,
      bonus: '+15 with any one <span class="leader">Leader</span>. <br />OR +40 with both <span class="leader">Leader</span> and <span class="weapon">Sword of Keth</span>.',
      penalty: null,
      bonusScore: function(hand) {
        return hand.containsSuit('Leader') ? (hand.contains('Sword of Keth') ? 40 : 15) : 0;
      },
      relatedSuits: ['Leader'],
      relatedCards: ['Sword of Keth']
    },
    {
      id: 47,
      suit: 'Artifact',
      name: 'Gem of Order',
      strength: 5,
      bonus: '+10 for 3-card run, +30 for 4-card run, +60 for 5-card run, +100 for 6-card run, +150 for 7-card run. <br />(This refers to the base strength numbers.)',
      penalty: null,
      bonusScore: function(hand) {
        var strengths = hand.nonBlankedCards().map(card => card.strength);
        var maxRun = 0;
        var currentRun = 0;
        for (var i = 0; i <= 40; i++) {
          if (strengths.includes(i)) {
            currentRun++;
            if (currentRun > maxRun) {
              maxRun = currentRun;
            }
          } else {
            currentRun = 0;
          }
        }
        if (maxRun === 3) {
          return 10;
        } else if (maxRun === 4) {
          return 30;
        } else if (maxRun === 5) {
          return 60;
        } else if (maxRun === 6) {
          return 100;
        } else if (maxRun >= 7) {
          return 150;
        } else {
          return 0;
        }
      },
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 48,
      suit: 'Artifact',
      name: 'World Tree',
      strength: 2,
      bonus: '+50 if every non-BLANKED card is a different suit.',
      penalty: null,
      bonusScore: function(hand) {
        var suits = [];
        for (const card of hand.nonBlankedCards()) {
          if (suits.includes(card.suit)) {
            return 0;
          }
          suits.push(card.suit);
        }
        return 50;
      },
      relatedSuits: allSuits(),
      relatedCards: []
    },
    {
      id: 49,
      suit: 'Artifact',
      name: 'Book of Changes',
      strength: 3,
      bonus: 'You may change the suit of one other card. Its name, bonuses and penalties remain the same.',
      penalty: null,
      action: 'Pick a suit and a target card from your hand.',
      relatedSuits: [], // empty because the main reason for relatedSuits is to determine how to use 'Book of Changes'
      relatedCards: []
    },
    {
      id: 50,
      suit: 'Artifact',
      name: 'Protection Rune',
      strength: 1,
      bonus: 'CLEARS the Penalty on all cards.',
      penalty: null,
      clearsPenalty: function(card) {
        return true;
      },
      relatedSuits: [],
      relatedCards: []
    },
    {
      id: 51,
      suit: 'Wild',
      name: 'Shapeshifter',
      strength: 0,
      bonus: '<b>Shapeshifter</b> may duplicate the name and suit of any one <span class="artifact">Artifact</span>, <span class="leader">Leader</span>, <span class="wizard">Wizard</span>, <span class="weapon">Weapon</span> or <span class="beast">Beast</span> in the game. <br />Does not take the bonus, penalty, or base strength of the card duplicated.',
      penalty: null,
      action: 'Pick a target card to duplicate.',
      relatedSuits: ['Artifact', 'Leader', 'Wizard', 'Weapon', 'Beast'],
      relatedCards: []
    },
    {
      id: 52,
      suit: 'Wild',
      name: 'Mirage',
      strength: 0,
      bonus: '<b>Mirage</b> may duplicate the name and suit of any one <span class="army">Army</span>, <span class="land">Land</span>, <span class="weather">Weather</span>, <span class="flood">Flood</span> or <span class="flame">Flame</span> in the game. <br />Does not take the bonus, penalty, or base strength of the card duplicated.',
      penalty: null,
      action: 'Pick a target card to duplicate.',
      relatedSuits: ['Army', 'Land', 'Weather', 'Flood', 'Flame'],
      relatedCards: []
    },
    {
      id: 53,
      suit: 'Wild',
      name: 'Doppelgänger',
      strength: 0,
      bonus: '<b>Doppelgänger</b> may duplicate the name, base strength, suit, and penalty BUT NOT BONUS of any one other card in your hand.',
      penalty: null,
      action: 'Pick a card from your hand to duplicate.',
      relatedSuits: [],
      relatedCards: []
    }
  ],
  getCardByName: function(cardName) {
    for (const card of this.cards) {
      if (card.name === cardName) {
        return card;
      }
    }
  },
  getCardById: function(id) {
    return this.cards[id - 1];
  },
  getCardsBySuit: function(suits) {
    var cardsBySuit = {};
    for (const card of this.cards) {
      if (suits === undefined || suits.includes(card.suit)) {
        if (cardsBySuit[card.suit] === undefined) {
          cardsBySuit[card.suit] = [];
        }
        cardsBySuit[card.suit].push(card);
      }
    }
    return cardsBySuit;
  }
};

function allSuits() {
  return ['Land', 'Flood', 'Weather', 'Flame', 'Army', 'Wizard', 'Leader', 'Beast', 'Weapon', 'Artifact', 'Wild'];
}

var NONE = -1;
var ISLAND = 9;
var NECROMANCER = 28;
var BOOK_OF_CHANGES = 49;
var SHAPESHIFTER = 51;
var MIRAGE = 52;
var DOPPELGANGER = 53;

var ACTION_ORDER = [DOPPELGANGER, MIRAGE, SHAPESHIFTER, BOOK_OF_CHANGES, ISLAND];
