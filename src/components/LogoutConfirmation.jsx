import { motion, AnimatePresence } from 'framer-motion'

const LogoutConfirmation = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/30 text-white transition-all"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LogoutConfirmation