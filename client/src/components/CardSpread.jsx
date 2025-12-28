import { motion } from 'framer-motion';
import Card from './Card';
import { useState } from 'react';

export default function CardSpread({ cards, spreadType }) {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const handleCardFlip = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className={`flex ${spreadType === 'three_card' ? 'justify-center gap-8' : 'justify-center'} flex-wrap`}>
        {cards.map((cardInfo, index) => (
          <div key={index} className="flex flex-col items-center">
            <Card
              card={cardInfo.cardData}
              isReversed={cardInfo.isReversed}
              isFlipped={flippedCards.has(index)}
              onFlip={() => handleCardFlip(index)}
              index={index}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="mt-4 text-center"
            >
              <div className="text-yellow-400 font-semibold text-sm mb-1">
                {cardInfo.position}
              </div>
              <div className="text-purple-200 text-xs">
                {cardInfo.cardData.name_cn}
              </div>
              {cardInfo.isReversed && (
                <div className="text-red-400 text-xs mt-1">逆位</div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      
      {flippedCards.size < cards.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 text-purple-300 text-sm"
        >
          点击卡片查看
        </motion.p>
      )}
    </motion.div>
  );
}

