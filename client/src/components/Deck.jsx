import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Deck({ onShuffleComplete }) {
  const [isShuffling, setIsShuffling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuffling(false);
      onShuffleComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onShuffleComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="relative">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: 0, 
              y: 0, 
              rotate: 0,
              scale: 0.9 
            }}
            animate={isShuffling ? {
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
              scale: [0.9, 1, 0.9]
            } : {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 0.9
            }}
            transition={{
              duration: 0.5,
              repeat: isShuffling ? Infinity : 0,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className="absolute w-32 h-48 rounded-lg shadow-xl border-2 border-yellow-400/50"
            style={{
              background: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #4a148c 100%)',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
              zIndex: 10 - i,
              transform: `translate(${i * 2}px, ${i * 2}px)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl text-yellow-400/50">🔮</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 text-xl text-purple-200 font-medium"
      >
        {isShuffling ? '正在洗牌...' : '洗牌完成'}
      </motion.p>
    </motion.div>
  );
}

