import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionInput from './components/QuestionInput';
import Deck from './components/Deck';
import CardSpread from './components/CardSpread';
import ReadingResult from './components/ReadingResult';
import { drawCards } from './utils/tarotUtils';
import { getReading } from './utils/api';

function App() {
  const [step, setStep] = useState('input_question');
  const [question, setQuestion] = useState('');
  const [spreadType, setSpreadType] = useState('single_card');
  const [selectedCards, setSelectedCards] = useState([]);
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setStep('shuffle');
    setError(null);
  };

  const handleShuffleComplete = () => {
    const count = spreadType === 'single_card' ? 1 : 3;
    const cards = drawCards(count, spreadType);
    setSelectedCards(cards);
    setStep('select_cards');
  };

  const handleReveal = async () => {
    setStep('reveal');
    setIsLoading(true);
    setError(null);

    try {
      const readingText = await getReading(question, spreadType, selectedCards);
      setReading(readingText);
      setStep('reading');
    } catch (err) {
      setError(err.message || '获取解读失败，请重试');
      setStep('select_cards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReading = () => {
    setStep('input_question');
    setQuestion('');
    setSelectedCards([]);
    setReading('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mb-2">
            🔮 神秘塔罗占卜
          </h1>
          <p className="text-purple-200 text-lg">让塔罗牌为你指引方向</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'input_question' && (
            <QuestionInput
              key="input"
              onStart={handleStart}
              question={question}
              setQuestion={setQuestion}
              spreadType={spreadType}
              setSpreadType={setSpreadType}
            />
          )}

          {step === 'shuffle' && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Deck onShuffleComplete={handleShuffleComplete} />
            </motion.div>
          )}

          {step === 'select_cards' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/30 mb-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-yellow-300">
                  你抽到的牌
                </h2>
                <CardSpread cards={selectedCards} spreadType={spreadType} />
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 text-red-200">
                  {error}
                </div>
              )}

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReveal}
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 font-bold rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? '正在解读...' : '获取解读'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'reveal' && isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block text-6xl mb-4"
              >
                🔮
              </motion.div>
              <p className="text-xl text-purple-200">正在解读中...</p>
            </motion.div>
          )}

          {step === 'reading' && reading && (
            <ReadingResult
              key="reading"
              reading={reading}
              onNewReading={handleNewReading}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
