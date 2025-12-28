import tarotData from '../data/tarotData.json';

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draw cards from the deck with 30% chance of being reversed
 * @param {number} count - Number of cards to draw
 * @param {string} spreadType - 'single_card' or 'three_card'
 * @returns {Array} Array of selected cards with cardData, isReversed, and position
 */
export function drawCards(count, spreadType) {
  const shuffled = shuffleDeck(tarotData);
  const selected = [];
  const positions = spreadType === 'three_card' 
    ? ['Past', 'Present', 'Future'] 
    : ['Result'];

  for (let i = 0; i < count; i++) {
    const cardData = shuffled[i];
    // 30% chance of being reversed
    const isReversed = Math.random() < 0.3;
    const position = positions[i] || 'Result';

    selected.push({
      cardData,
      isReversed,
      position
    });
  }

  return selected;
}

/**
 * Get all tarot cards
 */
export function getAllCards() {
  return tarotData;
}

