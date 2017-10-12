var cards = [{
    id: 1,
    suit: 'Land',
    name: 'Mountain',
    strength: 9,
    bonus: '+50 with both <span class="weather">Smoke</span> and <span class="flame">Wildfire</span>. <br />CLEARS the Penalty on all <span class="flood">Floods</span>.',
    penalty: null
  },
  {
    id: 2,
    suit: 'Land',
    name: 'Cavern',
    strength: 6,
    bonus: '+25 with <span class="army">Dwarvish Infantry</span> or <span class="beast">Dragon</span>. <br />CLEARS the Penalty on all <span class="weather">Weather</span>.',
    penalty: null
  },
  {
    id: 3,
    suit: 'Land',
    name: 'Bell Tower',
    strength: 8,
    bonus: '+15 with any one <span class="wizard">Wizard</span>.',
    penalty: null
  },
  {
    id: 4,
    suit: 'Land',
    name: 'Forest',
    strength: 7,
    bonus: '+12 for each <span class="beast">Beast</span> and <span class="army">Elven Archers</span>.',
    penalty: null
  },
  {
    id: 5,
    suit: 'Land',
    name: 'Earth Elemental',
    strength: 4,
    bonus: '+15 for each other <span class="land">Land</span>.',
    penalty: null
  },
  {
    id: 6,
    suit: 'Flood',
    name: 'Fountain of Life',
    strength: 1,
    bonus: 'Add the base strength of any one <span class="weapon">Weapon</span>, <span class="flood">Flood</span>, <span class="flame">Flame</span>, <span class="land">Land</span> or <span class="weather">Weather</span> in your hand.',
    penalty: null
  },
  {
    id: 7,
    suit: 'Flood',
    name: 'Swamp',
    strength: 18,
    bonus: null,
    penalty: '-3 for each <span class="army">Army</span> and <span class="flame">Flame</span>.'
  },
  {
    id: 8,
    suit: 'Flood',
    name: 'Great Flood',
    strength: 32,
    bonus: null,
    penalty: 'BLANKS all <span class="army">Armies</span>, all <span class="land">Lands</span> except <span class="land">Mountain</span>, and all <span class="flame">Flames</span> except <span class="flame">Lightning</span>.'
  },
  {
    id: 9,
    suit: 'Flood',
    name: 'Island',
    strength: 14,
    bonus: 'CLEARS the Penalty on any one <span class="flood">Flood</span> or <span class="flame">Flame</span>.',
    penalty: null,
    action: true
  },
  {
    id: 10,
    suit: 'Flood',
    name: 'Water Elemental',
    strength: 4,
    bonus: '+15 for each other <span class="flood">Flood</span>.',
    penalty: null
  },
  {
    id: 11,
    suit: 'Weather',
    name: 'Rainstorm',
    strength: 8,
    bonus: '+10 for each <span class="flood">Flood</span>.',
    penalty: 'BLANKS all <span class="flame">Flames</span> except <span class="flame">Lightning</span>.'
  },
  {
    id: 12,
    suit: 'Weather',
    name: 'Blizzard',
    strength: 30,
    bonus: null,
    penalty: 'BLANKS all <span class="flood">Floods</span>. <br />-5 for each <span class="army">Army</span>, <span class="leader">Leader</span>, <span class="beast">Beast</span>, and <span class="flame">Flame</span>.'
  },
  {
    id: 13,
    suit: 'Weather',
    name: 'Smoke',
    strength: 27,
    bonus: null,
    penalty: 'This card is BLANKED unless with at least one <span class="flame">Flame</span>.'
  },
  {
    id: 14,
    suit: 'Weather',
    name: 'Whirlwind',
    strength: 13,
    bonus: '+40 with <span class="weather">Rainstorm</span> and either <span class="weather">Blizzard</span> or <span class="flood">Great Flood</span>.',
    penalty: null
  },
  {
    id: 15,
    suit: 'Weather',
    name: 'Air Elemental',
    strength: 4,
    bonus: '+15 for each other <span class="weather">Weather</span>.',
    penalty: null
  },
  {
    id: 16,
    suit: 'Flame',
    name: 'Wildfire',
    strength: 40,
    bonus: null,
    penalty: 'BLANKS all cards except <span class="flame">Flames</span>, <span class="wizard">Wizards</span>, <span class="weather">Weather</span>, <span class="weapon">Weapons</span>, <span class="artifact">Artifacts</span>, <span class="land">Mountain</span>, <span class="flood">Great Flood</span>, <span class="flood">Island</span>, <span class="beast">Unicorn</span> and <span class="beast">Dragon</span>.'
  },
  {
    id: 17,
    suit: 'Flame',
    name: 'Candle',
    strength: 2,
    bonus: '+100 with <span class="artifact">Book of Changes</span>, <span class="land">Bell Tower</span>, and any one <span class="wizard">Wizard</span>.',
    penalty: null
  },
  {
    id: 18,
    suit: 'Flame',
    name: 'Forge',
    strength: 9,
    bonus: '+9 for each <span class="weapon">Weapon</span> and <span class="artifact">Artifact</span>.',
    penalty: null
  },
  {
    id: 19,
    suit: 'Flame',
    name: 'Lightning',
    strength: 11,
    bonus: '+30 with <span class="weather">Rainstorm</span>.',
    penalty: null
  },
  {
    id: 20,
    suit: 'Flame',
    name: 'Fire Elemental',
    strength: 4,
    bonus: '+15 for each other <span class="flame">Flame</span>.',
    penalty: null
  },
  {
    id: 21,
    suit: 'Army',
    name: 'Knights',
    strength: 20,
    bonus: null,
    penalty: '-8 unless with at least one <span class="leader">Leader</span>.'
  },
  {
    id: 22,
    suit: 'Army',
    name: 'Elven Archers',
    strength: 10,
    bonus: '+5 if no <span class="weather">Weather</span>.',
    penalty: null
  },
  {
    id: 23,
    suit: 'Army',
    name: 'Light Cavalry',
    strength: 17,
    bonus: null,
    penalty: '-2 for each <span class="land">Land</span>.'
  },
  {
    id: 24,
    suit: 'Army',
    name: 'Dwarvish Infanty',
    strength: 15,
    bonus: null,
    penalty: '-2 for each other <span class="army">Army</span>.'
  },
  {
    id: 25,
    suit: 'Army',
    name: 'Rangers',
    strength: 5,
    bonus: '+10 for each <span class="land">Land</span>. <br />CLEARS the word <span class="army">Army</span> from all Penalties.',
    penalty: null
  },
  {
    id: 26,
    suit: 'Wizard',
    name: 'Collector',
    strength: 7,
    bonus: '+10 if three different cards in same suit, +40 if four different cards in same suit, +100 if five different cards in same suit.',
    penalty: null
  },
  {
    id: 27,
    suit: 'Wizard',
    name: 'Beastmaster',
    strength: 9,
    bonus: '+9 for each <span class="beast">Beast</span>. <br />CLEARS the Penalty on all <span class="beast">Beasts</span>.',
    penalty: null
  },
  {
    id: 28,
    suit: 'Wizard',
    name: 'Necromancer',
    strength: 3,
    bonus: 'At the end of the game, you may take one <span class="army">Army</span>, <span class="leader">Leader</span>, <span class="wizard">Wizard</span>, or <span class="beast">Beast</span> from the discard pile and add it to your hand as an eighth card.',
    penalty: null,
    action: true
  },
  {
    id: 29,
    suit: 'Wizard',
    name: 'Warlock Lord',
    strength: 25,
    bonus: null,
    penalty: '-10 for each <span class="leader">Leader</span> and other <span class="wizard">Wizard</span>.'
  },
  {
    id: 30,
    suit: 'Wizard',
    name: 'Enchantress',
    strength: 5,
    bonus: '+5 for each <span class="land">Land</span>, <span class="weather">Weather</span>, <span class="flood">Flood</span>, and <span class="flame">Flame</span>.',
    penalty: null
  },
  {
    id: 31,
    suit: 'Leader',
    name: 'King',
    strength: 8,
    bonus: '+5 for each <span class="army">Army</span>. <br />OR +20 for each <span class="army">Army</span> if with <span class="leader">Queen</span>.',
    penalty: null
  },
  {
    id: 32,
    suit: 'Leader',
    name: 'Queen',
    strength: 6,
    bonus: '+5 for each <span class="army">Army</span>. <br />OR +20 for each <span class="army">Army</span> if with <span class="leader">King</span>.',
    penalty: null
  },
  {
    id: 33,
    suit: 'Leader',
    name: 'Princess',
    strength: 2,
    bonus: '+8 for each <span class="army">Army</span>, <span class="wizard">Wizard</span>, and other <span class="leader">Leader</span>.',
    penalty: null
  },
  {
    id: 34,
    suit: 'Leader',
    name: 'Warlord',
    strength: 4,
    bonus: 'The sum of the base strength of all <span class="army">Armies</span>.',
    penalty: null
  },
  {
    id: 35,
    suit: 'Leader',
    name: 'Empress',
    strength: 15,
    bonus: '+10 for each <span class="army">Army</span>.',
    penalty: '-5 for each other <span class="leader">Leader</span>.'
  },
  {
    id: 36,
    suit: 'Beast',
    name: 'Unicorn',
    strength: 9,
    bonus: '+30 with <span class="leader">Princess</span>. <br />OR +15 with <span class="leader">Empress</span>, <span class="leader">Queen</span>, or <span class="leader">Enchantress</span>.',
    penalty: null
  },
  {
    id: 37,
    suit: 'Beast',
    name: 'Basilisk',
    strength: 35,
    bonus: null,
    penalty: 'BLANKS all <span class="army">Armies</span>, <span class="leader">Leaders</span>, and other <span class="beast">Beasts</span>.'
  },
  {
    id: 38,
    suit: 'Beast',
    name: 'Warhorse',
    strength: 6,
    bonus: '+14 with any <span class="leader">Leader</span> or <span class="wizard">Wizard</span>.',
    penalty: null
  },
  {
    id: 39,
    suit: 'Beast',
    name: 'Dragon',
    strength: 30,
    bonus: null,
    penalty: '-40 unless with at least one <span class="wizard">Wizard</span>.'
  },
  {
    id: 40,
    suit: 'Beast',
    name: 'Hydra',
    strength: 12,
    bonus: '+28 with <span class="flood">Swamp</span>.',
    penalty: null
  },
  {
    id: 41,
    suit: 'Weapon',
    name: 'Warship',
    strength: 23,
    bonus: 'CLEARS the word <span class="army">Army</span> from all Penalties of all <span class="flood">Floods</span>.',
    penalty: 'BLANKED unless with at least one <span class="flood">Flood</span>.'
  },
  {
    id: 42,
    suit: 'Weapon',
    name: 'Magic Wand',
    strength: 1,
    bonus: '+25 with any one <span class="wizard">Wizard</span>.',
    penalty: null
  },
  {
    id: 43,
    suit: 'Weapon',
    name: 'Sword of Keth',
    strength: 7,
    bonus: '+10 with any one <span class="leader">Leader</span>. <br />OR +40 with both <span class="leader">Leader</span> and <span class="artifact">Shield of Keth</span>.',
    penalty: null
  },
  {
    id: 44,
    suit: 'Weapon',
    name: 'Elven Longbow',
    strength: 3,
    bonus: '+30 with <span class="army">Elven Archers</span>, <span class="leader">Warlord</span> or <span class="wizard">Beastmaster</span>.',
    penalty: null
  },
  {
    id: 45,
    suit: 'Weapon',
    name: 'War Dirigible',
    strength: 35,
    bonus: null,
    penalty: 'BLANKED unless with at least one <span class="army">Army</span>. <br />BLANKED with any <span class="weather">Weather</span>.'
  },
  {
    id: 46,
    suit: 'Artifact',
    name: 'Shield of Keth',
    strength: 4,
    bonus: '+15 with any one <span class="leader">Leader</span>. <br />OR +40 with both <span class="leader">Leader</span> and <span class="weapon">Sword of Keth</span>.',
    penalty: null
  },
  {
    id: 47,
    suit: 'Artifact',
    name: 'Gem of Order',
    strength: 5,
    bonus: '+10 for 3-card run, +30 for 4-card run, +60 for 5-card run, +100 for 6-card run, +150 for 7-card run. <br />(This refers to the base strength numbers.)',
    penalty: null
  },
  {
    id: 48,
    suit: 'Artifact',
    name: 'World Tree',
    strength: 2,
    bonus: '+50 if every non-BLANKED card is a different suit.',
    penalty: null
  },
  {
    id: 49,
    suit: 'Artifact',
    name: 'Book of Changes',
    strength: 3,
    bonus: 'You may change the suit of one other card. Its name, bonuses and penalties remain the same.',
    penalty: null,
    action: true
  },
  {
    id: 50,
    suit: 'Artifact',
    name: 'Protection Rune',
    strength: 1,
    bonus: 'CLEARS the Penalty on all cards.',
    penalty: null
  },
  {
    id: 51,
    suit: 'Wild',
    name: 'Shapeshifter',
    strength: 0,
    bonus: 'May duplicate the name and suit of any one <span class="artifact">Artifact</span>, <span class="leader">Leader</span>, <span class="wizard">Wizard</span>, <span class="weapon">Weapon</span> or <span class="beast">Beast</span> in the game. <br />Does not take the bonus, penalty, or base strength of the card duplicated.',
    penalty: null,
    action: true
  },
  {
    id: 52,
    suit: 'Wild',
    name: 'Mirage',
    strength: 0,
    bonus: 'May duplicate the name and suit of any one <span class="army">Army</span>, <span class="land">Land</span>, <span class="weather">Weather</span>, <span class="flood">Flood</span> or <span class="flame">Flame</span> in the game. <br />Does not take the bonus, penalty, or base strength of the card duplicated.',
    penalty: null,
    action: true
  },
  {
    id: 53,
    suit: 'Wild',
    name: 'Doppelgänger',
    strength: 0,
    bonus: 'May duplicate the name, base strength, suit, and penalty BUT NOT BONUS of any one other card in your hand.',
    penalty: null,
    action: true
  }
];

var cardsBySuit = {};

for (var i = 0; i < cards.length; i++) {
  var card = cards[i];
  if (cardsBySuit[card.suit] === undefined) {
    cardsBySuit[card.suit] = [];
  }
  cardsBySuit[card.suit].push(card);
}

function getCard(id) {
  return cards[id - 1];
}
