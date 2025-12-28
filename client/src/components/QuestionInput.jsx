import { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuestionInput({ onStart, question, setQuestion, spreadType, setSpreadType }) {
  const [localQuestion, setLocalQuestion] = useState(question || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuestion.trim()) {
      setQuestion(localQuestion.trim());
      onStart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto p-8"
    >
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          向塔罗牌提问
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-purple-200 mb-2">
              你的问题
            </label>
            <textarea
              id="question"
              value={localQuestion}
              onChange={(e) => setLocalQuestion(e.target.value)}
              placeholder="例如：我最近的工作发展如何？"
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-3">
              选择牌阵
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSpreadType('single_card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  spreadType === 'single_card'
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                    : 'border-purple-500/50 bg-purple-900/30 text-purple-200 hover:border-purple-400'
                }`}
              >
                <div className="font-semibold mb-1">单牌占卜</div>
                <div className="text-xs opacity-75">快速解答</div>
              </button>
              <button
                type="button"
                onClick={() => setSpreadType('three_card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  spreadType === 'three_card'
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                    : 'border-purple-500/50 bg-purple-900/30 text-purple-200 hover:border-purple-400'
                }`}
              >
                <div className="font-semibold mb-1">三牌阵</div>
                <div className="text-xs opacity-75">过去·现在·未来</div>
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!localQuestion.trim()}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 font-bold rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            开始占卜
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

