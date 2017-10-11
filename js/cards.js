var cards = [{
    id: 1,
    suit: 'Land',
    name: 'Mountain',
    strength: 9,
    bonus: 'BONUS: +50 with both Smoke and Wildfire. CLEARS the Penalty on all Floods',
    penalty: null
  },
  {
    id: 2,
    suit: 'Land',
    name: 'Cavern',
    strength: 6,
    bonus: 'BONUS: +25 with Dwarvish Infantry or Dragon. CLEARS the Penalty on all Weather.',
    penalty: null
  },
  {
    id: 3,
    suit: 'Land',
    name: 'Bell Tower',
    strength: 8,
    bonus: 'BONUS: +15 with any one Wizard.',
    penalty: null
  },
  {
    id: 4,
    suit: 'Land',
    name: 'Forest',
    strength: 7,
    bonus: 'BONUS: +12 for each Beast and Elven Archers.',
    penalty: null
  },
  {
    id: 5,
    suit: 'Land',
    name: 'Earth Elemental',
    strength: 4,
    bonus: 'BONUS: +15 for each other Land.',
    penalty: null
  },
  {
    id: 6,
    suit: 'Flood',
    name: 'Fountain of Life',
    strength: 1,
    bonus: 'BONUS: Add the base strength of any one Weapon, Flood, Flame, Land or Weather in your hand.',
    penalty: null
  },
  {
    id: 7,
    suit: 'Flood',
    name: 'Swamp',
    strength: 18,
    bonus: 'PENALTY: -3 for each Army and Flame.',
    penalty: null
  },
  {
    id: 8,
    suit: 'Flood',
    name: 'Great Flood',
    strength: 32,
    bonus: 'PENALTY: BLANKS all Armies, all Lands except Mountain, and all Flames except Lightning.',
    penalty: null
  },
  {
    id: 9,
    suit: 'Flood',
    name: 'Island',
    strength: 14,
    bonus: 'BONUS: CLEARS the Penalty on any one Flood or Flame.',
    penalty: null
  },
  {
    id: 10,
    suit: 'Flood',
    name: 'Water Elemental',
    strength: 4,
    bonus: 'BONUS: +15 for each other Flood.',
    penalty: null
  },
  {
    id: 11,
    suit: 'Weather',
    name: 'Rainstorm',
    strength: 8,
    bonus: 'BONUS: +10 for each Flood.',
    penalty: 'PENALTY: BLANKS all Flames except Lightning.'
  },
  {
    id: 12,
    suit: 'Weather',
    name: 'Blizzard',
    strength: 30,
    bonus: 'PENALTY: BLANKS all Floods. -5 for each Army, Leader, Beast, and Flame.',
    penalty: null
  },
  {
    id: 13,
    suit: 'Weather',
    name: 'Smoke',
    strength: 27,
    bonus: 'PENALTY: This card is BLANKED unless with at least one Flame.',
    penalty: null
  },
  {
    id: 14,
    suit: 'Weather',
    name: 'Whirlwind',
    strength: 13,
    bonus: 'BONUS: +40 with Rainstorm and either Blizzard of Great Flood.',
    penalty: null
  },
  {
    id: 15,
    suit: 'Weather',
    name: 'Air Elemental',
    strength: 4,
    bonus: 'BONUS: +15 for each other Weather.',
    penalty: null
  },
  {
    id: 16,
    suit: 'Flame',
    name: 'Wildfire',
    strength: 40,
    bonus: 'PENALTY: BLANKS all cards except Flames, Wizards, Weather, Weapons, Artifacts, Mountain, Great Flood, Island, Unicorn and Dragon.',
    penalty: null
  },
  {
    id: 17,
    suit: 'Flame',
    name: 'Candle',
    strength: 2,
    bonus: 'BONUS: +100 with Book of Changes, Bell Tower, and any one Wizard.',
    penalty: null
  },
  {
    id: 18,
    suit: 'Flame',
    name: 'Forge',
    strength: 9,
    bonus: 'BONUS: +9 for each Weapon and Artifact.',
    penalty: null
  },
  {
    id: 19,
    suit: 'Flame',
    name: 'Lightning',
    strength: 11,
    bonus: 'BONUS: +30 with Rainstorm.',
    penalty: null
  },
  {
    id: 20,
    suit: 'Flame',
    name: 'Fire Elemental',
    strength: 4,
    bonus: 'BONUS: +15 for each other Flame.',
    penalty: null
  },
  {
    id: 21,
    suit: 'Army',
    name: 'Knights',
    strength: 20,
    bonus: 'PENALTY: -8 unless with at least one Leader.',
    penalty: null
  },
  {
    id: 22,
    suit: 'Army',
    name: 'Elven Archers',
    strength: 10,
    bonus: 'BONUS: +5 if no Weather.',
    penalty: null
  },
  {
    id: 23,
    suit: 'Army',
    name: 'Light Cavalry',
    strength: 17,
    bonus: 'PENALTY: -2 for each Land.',
    penalty: null
  },
  {
    id: 24,
    suit: 'Army',
    name: 'Dwarvish Infanty',
    strength: 15,
    bonus: 'PENALTY: -2 for each other Army.',
    penalty: null
  },
  {
    id: 25,
    suit: 'Army',
    name: 'Rangers',
    strength: 5,
    bonus: 'BONUS: +10 for each Land. CLEARS the word Army from all Penalties.',
    penalty: null
  },
  {
    id: 26,
    suit: 'Wizard',
    name: 'Collector',
    strength: 7,
    bonus: 'BONUS: +10 if three different cards in same suit, +40 if four different cards in same suit, +100 if five different cards in same suit.',
    penalty: null
  },
  {
    id: 27,
    suit: 'Wizard',
    name: 'Beastmaster',
    strength: 9,
    bonus: 'BONUS: +9 for each Beast. CLEARS the Penalty on all Beasts.',
    penalty: null
  },
  {
    id: 28,
    suit: 'Wizard',
    name: 'Necromancer',
    strength: 3,
    bonus: 'BONUS: At the end of the game, you may take one Army, Leader, Wizard, or Beast from the discard pile and add it to your hand as an eighth card.',
    penalty: null
  },
  {
    id: 29,
    suit: 'Wizard',
    name: 'Warlock Lord',
    strength: 25,
    bonus: 'PENALTY: -10 for each Leader and other Wizard.',
    penalty: null
  },
  {
    id: 30,
    suit: 'Wizard',
    name: 'Enchantress',
    strength: 5,
    bonus: 'BONUS: +5 for each Land, Weather, Flood, and Flame.',
    penalty: null
  },
  {
    id: 31,
    suit: 'Leader',
    name: 'King',
    strength: 8,
    bonus: 'BONUS: +5 for each Army. OR +20 for each Army if with Queen.',
    penalty: null
  },
  {
    id: 32,
    suit: 'Leader',
    name: 'Queen',
    strength: 6,
    bonus: 'BONUS: +5 for each Army. OR +20 for each Army if with King.',
    penalty: null
  },
  {
    id: 33,
    suit: 'Leader',
    name: 'Princess',
    strength: 2,
    bonus: 'BONUS: +8 for each Army, Wizard, and other Leader.',
    penalty: null
  },
  {
    id: 34,
    suit: 'Leader',
    name: 'Warlord',
    strength: 4,
    bonus: 'BONUS: The sum of the base strength of all Armies.',
    penalty: null
  },
  {
    id: 35,
    suit: 'Leader',
    name: 'Empress',
    strength: 15,
    bonus: 'BONUS: +10 for each Army.',
    penalty: 'PENALTY: -5 for each other Leader.'
  },
  {
    id: 36,
    suit: 'Beast',
    name: 'Unicorn',
    strength: 9,
    bonus: 'BONUS: +30 with Princess. OR +15 with Empress, Queen, or Enchantress.',
    penalty: null
  },
  {
    id: 37,
    suit: 'Beast',
    name: 'Basilisk',
    strength: 35,
    bonus: 'PENALTY: BLANKS all Armies, Leaders, and other Beasts.',
    penalty: null
  },
  {
    id: 38,
    suit: 'Beast',
    name: 'Warhorse',
    strength: 6,
    bonus: 'BONUS: +14 with any Leader or Wizard.',
    penalty: null
  },
  {
    id: 39,
    suit: 'Beast',
    name: 'Dragon',
    strength: 30,
    bonus: 'PENALTY: -40 unless with at least one Wizard.',
    penalty: null
  },
  {
    id: 40,
    suit: 'Beast',
    name: 'Hydra',
    strength: 12,
    bonus: 'BONUS: +28 with Swamp.',
    penalty: null
  },
  {
    id: 41,
    suit: 'Weapon',
    name: 'Warship',
    strength: 23,
    bonus: 'BONUS: CLEARS the word Army from all Penalties of all Floods.',
    penalty: 'PENALTY: BLANKED unless with at least one Flood.'
  },
  {
    id: 42,
    suit: 'Weapon',
    name: 'Magic Wand',
    strength: 1,
    bonus: 'BONUS: +25 with any one Wizard.',
    penalty: null
  },
  {
    id: 43,
    suit: 'Weapon',
    name: 'Sword of Keth',
    strength: 7,
    bonus: 'BONUS: +10 with any one Leader. OR +40 with both Leader and Shield of Keth.',
    penalty: null
  },
  {
    id: 44,
    suit: 'Weapon',
    name: 'Elven Longbow',
    strength: 3,
    bonus: 'BONUS: +30 with Elven Archers, Warlord or Beastmaster.',
    penalty: null
  },
  {
    id: 45,
    suit: 'Weapon',
    name: 'War Dirigible',
    strength: 35,
    bonus: 'PENALTY: BLANKED unless with at least one Army. BLANKED with any Weather.',
    penalty: null
  },
  {
    id: 46,
    suit: 'Artifact',
    name: 'Shield of Keth',
    strength: 4,
    bonus: 'BONUS: +15 with any one Leader. OR +40 with both Leader and Sword of Keth.',
    penalty: null
  },
  {
    id: 47,
    suit: 'Artifact',
    name: 'Gem of Order',
    strength: 5,
    bonus: 'BONUS: +10 for 3-card run, +30 for 4-card run, +60 for 5-card run, +100 for 6-card run, +150 for 7-card run. (This refers to the base strength numbers.)',
    penalty: null
  },
  {
    id: 48,
    suit: 'Artifact',
    name: 'World Tree',
    strength: 2,
    bonus: 'BONUS: +50 if every non-BLANKED card is a different suit.',
    penalty: null
  },
  {
    id: 49,
    suit: 'Artifact',
    name: 'Book of Changes',
    strength: 3,
    bonus: 'BONUS: You may change the suit of one other card. Its name, bonuses and penalties remain the same.',
    penalty: null
  },
  {
    id: 50,
    suit: 'Artifact',
    name: 'Protection Rune',
    strength: 1,
    bonus: 'BONUS: CLEARS the Penalty on all cards.',
    penalty: null
  },
  {
    id: 51,
    suit: 'Wild',
    name: 'Shapeshifter',
    strength: 0,
    bonus: 'BONUS: May duplicate the name and suit of any one Artifact, Leader, Wizard, Weapon or Beast in the game. Does not take the bonus, penalty, or base strength of the card duplicated/',
    penalty: null
  },
  {
    id: 52,
    suit: 'Wild',
    name: 'Mirage',
    strength: 0,
    bonus: 'BONUS: May duplicate the name and suit of any one Army, Land, Weather, Flood or Flame in the game. Does not take the bonus, penalty, or base strength of the card duplicated/',
    penalty: null
  },
  {
    id: 53,
    suit: 'Wild',
    name: 'Doppelgänger',
    strength: 0,
    bonus: 'BONUS: May duplicate the name, base strength, suit, and penalty BUT NOT BONUS of any one other card in your hand.',
    penalty: null
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
