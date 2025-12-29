import { motion } from 'framer-motion';
import { getTarotImageUrl } from '../utils/updateTarotImages';

export default function Card({ card, isReversed, isFlipped, onFlip, index }) {
  // 使用工具函数获取图片 URL（支持在线和本地）
  const imagePath = getTarotImageUrl(card.image_url);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateY: isFlipped ? 0 : 180 
      }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative w-48 h-80 cursor-pointer perspective-1000"
      onClick={onFlip}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-xl shadow-2xl border-2 border-yellow-400/50"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #4a148c 100%)',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-6xl text-yellow-400/50 mb-4">🔮</div>
            {card.keywords && card.keywords.length > 0 && (
              <div className="text-center">
                <div className="text-xs text-yellow-300/80 font-semibold mb-2">关键词</div>
                <div className="flex flex-wrap gap-1 justify-center max-w-full">
                  {card.keywords.slice(0, 3).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-yellow-200/70 bg-purple-800/50 px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Front */}
        <div
          className="absolute w-full h-full rounded-xl shadow-2xl border-2 border-yellow-400/50 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: `rotateY(180deg) ${isReversed ? 'rotate(180deg)' : ''}`,
          }}
        >
          <img
            src={imagePath}
            alt={card.name_cn}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%234a148c" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23d4af37" font-size="16"%3E' + card.name_cn + '%3C/text%3E%3C/svg%3E';
            }}
          />
          {isReversed && (
            <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
              逆位
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

