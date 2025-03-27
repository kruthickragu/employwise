import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-300 hover:text-white" />
      </motion.button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
            currentPage === page
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/20'
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-300 hover:text-white" />
      </motion.button>
    </div>
  )
}

export default Pagination