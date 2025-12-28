const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getReading(question, spreadType, cards) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reading`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        spread_type: spreadType,
        cards: cards.map(card => ({
          name: card.cardData.name_en,
          isReversed: card.isReversed,
          position: card.position
        }))
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get reading');
    }

    const data = await response.json();
    return data.reading;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

