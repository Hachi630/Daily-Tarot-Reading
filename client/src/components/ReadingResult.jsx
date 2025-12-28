import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function ReadingResult({ reading, onNewReading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          塔罗解读
        </h2>
        
        <div className="prose prose-invert prose-purple max-w-none">
          <div className="text-purple-100 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-yellow-300 mt-6 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-yellow-300 mt-5 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-yellow-400 mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-purple-100" {...props} />,
                strong: ({node, ...props}) => <strong className="text-yellow-300 font-semibold" {...props} />,
                em: ({node, ...props}) => <em className="text-purple-200 italic" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-purple-100" {...props} />,
              }}
            >
              {reading}
            </ReactMarkdown>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewReading}
          className="mt-8 w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:from-purple-500 hover:to-purple-600 transition-all"
        >
          重新占卜
        </motion.button>
      </div>
    </motion.div>
  );
}

